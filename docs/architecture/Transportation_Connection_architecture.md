# High-Level Architecture: Transportation Connection Module

**Version:** 1.0
**Date:** 2025-05-12

**1. Introduction**

This document outlines the high-level architecture for the "Transportation Connection" module within the AgriConnect application. This module facilitates connections between farmers needing transport for their produce and available transporters. It allows farmers to post transport requests and browse listings of transporters and requests, prioritizing user privacy and multi-language support as defined in the PRD and the feature specification ([`docs/specs/Transportation_Connection_overview.md`](docs/specs/Transportation_Connection_overview.md)).

**2. Architectural Goals**

*   Define key frontend components for user interaction.
*   Outline necessary backend API endpoints for data operations.
*   Describe the data flow between frontend, backend, and database.
*   Specify the database schema, including relationships and indexing.
*   Detail the strategy for multi-language support.
*   Define a robust privacy mechanism for sensitive contact information.
*   Identify module dependencies.

**3. Technology Stack**

*   **Frontend:** Next.js (React)
*   **Backend:** Next.js API Routes
*   **Database:** Supabase (PostgreSQL)
*   **Authentication:** Clerk / NextAuth (via [`docs/architecture/Authentication_UserProfile_Management_architecture.md`](docs/architecture/Authentication_UserProfile_Management_architecture.md))
*   **Styling:** Tailwind CSS
*   **Localization:** `next-i18next` (or similar library)

**4. Component Breakdown (Frontend - Next.js/React)**

The frontend will be structured using Next.js pages and reusable React components:

*   **Pages:**
    *   [`pages/transport/request/new.tsx`](pages/transport/request/new.tsx): Page hosting the form for creating new transport requests. Requires authentication.
    *   [`pages/transport/transporters/index.tsx`](pages/transport/transporters/index.tsx): Page displaying the list of available transporters. Requires authentication.
    *   [`pages/transport/requests/index.tsx`](pages/transport/requests/index.tsx): Page displaying the list of active transport requests. Requires authentication.
*   **Components:**
    *   [`components/transport/TransportRequestForm.tsx`](components/transport/TransportRequestForm.tsx): Handles input fields, validation, and submission logic for creating transport requests. Uses localized labels.
    *   [`components/transport/TransporterList.tsx`](components/transport/TransporterList.tsx): Fetches and displays a list of transporters, handling pagination.
    *   [`components/transport/TransporterCard.tsx`](components/transport/TransporterCard.tsx): Renders individual transporter information (Name, Capacity, Service Areas). Crucially, it will *not* display direct contact info but will show the `contact_info_type` and potentially a "Request Connection" button based on privacy rules. Uses localized labels.
    *   [`components/transport/TransportRequestList.tsx`](components/transport/TransportRequestList.tsx): Fetches and displays a list of transport requests, handling pagination.
    *   [`components/transport/TransportRequestCard.tsx`](components/transport/TransportRequestCard.tsx): Renders individual transport request details (Produce Type, Date, Location Description). Uses localized labels.

**5. API Design (Next.js API Routes)**

Authenticated API endpoints will handle data operations:

*   **`POST /api/transport/requests`**
    *   **Description:** Creates a new transport request.
    *   **Authentication:** Required (User must be logged in).
    *   **Request Body:** `{ produce_type: string, quantity_description?: string, pickup_location_description: string, preferred_transport_date: Date, contact_preference?: string }`
    *   **Response:** `201 Created` with the created request object or `200 OK` with success status.
    *   **Logic:** Validates input, retrieves `user_id` from the authenticated session, inserts data into the `transport_requests` table.
*   **`GET /api/transporters`**
    *   **Description:** Fetches a list of active transporters.
    *   **Authentication:** Required.
    *   **Query Parameters:** `page` (number, for pagination), `limit` (number, for pagination), `serviceArea` (string, optional filter).
    *   **Response:** `200 OK` with `{ data: Transporter[], total: number }`. The `Transporter` objects will *exclude* sensitive contact details (`contact_details_encrypted`). Includes `id`, `name`, `capacity_description`, `service_areas`, `contact_info_type`.
    *   **Logic:** Queries the `transporters` table, applying filters and pagination. Selects only non-sensitive fields allowed by RLS.
*   **`GET /api/transport/requests`**
    *   **Description:** Fetches a list of active transport requests.
    *   **Authentication:** Required.
    *   **Query Parameters:** `page` (number), `limit` (number), `location` (string, optional filter), `date` (Date string, optional filter).
    *   **Response:** `200 OK` with `{ data: TransportRequest[], total: number }`.
    *   **Logic:** Queries the `transport_requests` table, applying filters and pagination.
*   **`POST /api/transport/transporters/{id}/request-contact`** (Platform Mediated Contact Flow)
    *   **Description:** Allows an authenticated farmer to signal interest in connecting with a specific transporter.
    *   **Authentication:** Required.
    *   **Path Parameter:** `id` (UUID of the transporter).
    *   **Request Body:** `{ transport_request_id?: UUID }` (Optional: link interest to a specific request).
    *   **Response:** `200 OK` or `202 Accepted`.
    *   **Logic:** Records the interest, potentially triggers a notification (email, SMS, in-app) to the transporter via a secure backend process (e.g., Supabase Edge Function) which *may* access encrypted contact details using a service role key. Does *not* return contact info to the farmer.

**6. Data Flow**

*   **Creating Request:**
    1.  Farmer interacts with `TransportRequestForm` (React Component) in their browser.
    2.  On submit, the component sends a `POST` request to `/api/transport/requests` (Next.js API Route) with form data and auth token.
    3.  The API route validates data, gets `user_id` from the session.
    4.  The API route executes an `INSERT` query against the Supabase `transport_requests` table.
    5.  Supabase saves the data.
    6.  API route returns success to the frontend component.
    7.  Component displays a confirmation message.
*   **Browsing Transporters:**
    1.  User navigates to the transporter list page.
    2.  `TransporterList` component sends a `GET` request to `/api/transporters` (Next.js API Route) with auth token and pagination params.
    3.  The API route executes a `SELECT` query against the Supabase `transporters` table (respecting RLS policies).
    4.  Supabase returns only permitted columns (excluding encrypted contact details).
    5.  API route returns the list to the frontend component.
    6.  Component renders `TransporterCard` components with the received data.

**7. Database Schema (Supabase PostgreSQL)**

*   **Table: `transporters`**
    *   `id`: UUID (Primary Key)
    *   `created_at`: TIMESTAMPTZ (default `now()`)
    *   `name`: TEXT (Not Null)
    *   `capacity_description`: TEXT
    *   `service_areas`: TEXT[] (GIN index recommended)
    *   `contact_info_type`: TEXT (Enum: 'platform_mediated', 'none', default 'none') - Determines contact flow.
    *   `contact_details_encrypted`: TEXT (Nullable) - **Strictly for platform backend use (mediation). Encrypted via pgsodium.** Not directly queryable by user roles via RLS.
    *   `is_active`: BOOLEAN (default true, index recommended)
    *   `notes`: TEXT (Nullable)
*   **Table: `transport_requests`**
    *   `id`: UUID (Primary Key)
    *   `created_at`: TIMESTAMPTZ (default `now()`)
    *   `user_id`: UUID (Not Null, Foreign Key to `profiles.id` or `auth.users.id`, index recommended) - Links to the farmer.
    *   `produce_type`: TEXT (Not Null)
    *   `quantity_description`: TEXT (Nullable)
    *   `pickup_location_description`: TEXT (Not Null)
    *   `preferred_transport_date`: DATE (Not Null, index recommended)
    *   `status`: TEXT (Enum: 'open', 'closed', 'cancelled', default 'open', index recommended)
    *   `contact_preference`: TEXT (Nullable)
    *   `is_active`: BOOLEAN (default true, index recommended)
*   **Relationships:** `transport_requests.user_id` references the user profile table.
*   **Row Level Security (RLS):** See Section 9 (Privacy Implementation).

**8. Multi-Language Strategy**

*   **Library:** Utilize `next-i18next` or a similar library integrated with Next.js.
*   **Translation Files:** Store translations in JSON files per language (e.g., `public/locales/en/transport.json`, `public/locales/hi/transport.json`). Keys will correspond to UI elements (labels, buttons, placeholders, messages).
*   **Implementation:**
    *   Wrap relevant pages/components using `serverSideTranslations` (in `getServerSideProps`) or client-side hooks provided by the library.
    *   The user's language preference (obtained from the Auth/User Profile module) determines which translation file is loaded.
    *   Components will use the `t` function provided by the library to render localized text.

**9. Privacy Implementation (Transporter Contact Info)**

Protecting transporter contact information is critical (PRD 49). The strategy relies on API-level filtering and Supabase Row Level Security (RLS):

1.  **No Direct Exposure:** The `contact_details_encrypted` column in the `transporters` table will *never* be returned by the public-facing `GET /api/transporters` endpoint.
2.  **Supabase RLS Policies:**
    *   **Policy Name:** `Allow authenticated read access to non-sensitive transporter columns`
    *   **Table:** `transporters`
    *   **Command:** `SELECT`
    *   **Role:** `authenticated`
    *   **USING:** `true` (Allow access to rows)
    *   **WITH CHECK:** (Not applicable for SELECT)
    *   **Columns:** Explicitly list allowed columns: `id`, `created_at`, `name`, `capacity_description`, `service_areas`, `contact_info_type`, `is_active`, `notes`. **Crucially, `contact_details_encrypted` is omitted.**
    *   **Policy Name:** `Allow service role full access` (For backend processes like mediation)
    *   **Table:** `transporters`
    *   **Command:** `ALL`
    *   **Role:** `service_role`
    *   **USING:** `true`
    *   **WITH CHECK:** `true`
3.  **Platform Mediated Contact Flow:**
    *   The `TransporterCard` component displays a "Request Connection" button if `contact_info_type` is `platform_mediated`.
    *   Clicking this button calls `POST /api/transport/transporters/{id}/request-contact`.
    *   This API endpoint *does not* access or return contact details. It logs the interest and triggers a secure backend process (e.g., Supabase Function running with `service_role` privileges).
    *   The backend process can then access the (decrypted) contact details if necessary to send a notification to the transporter about the farmer's interest.
4.  **Encryption:** The `contact_details_encrypted` field, if used for mediation, should be encrypted using `pgsodium` functions within Supabase, leveraging Supabase secrets for key management.

**10. Dependencies**

*   **Internal:**
    *   Authentication & User Profile Module ([`docs/architecture/Authentication_UserProfile_Management_architecture.md`](docs/architecture/Authentication_UserProfile_Management_architecture.md)): For user identity, authentication status, and language preference.
*   **External:**
    *   Next.js Framework
    *   React
    *   Supabase (Client library, Database, Auth, potentially Edge Functions)
    *   `next-i18next` (or chosen localization library)
    *   Tailwind CSS

**11. Scalability & Performance**

*   **Database:** Proper indexing on frequently queried columns (`user_id`, `is_active`, `status`, `preferred_transport_date`, `service_areas`) is essential.
*   **API:** Implement pagination for all list endpoints (`GET /api/transporters`, `GET /api/transport/requests`) to handle large datasets.
*   **Frontend:** Use efficient data fetching strategies (e.g., `react-query`, `swr`) with caching. Consider server-side rendering (SSR) or static site generation (SSG) with incremental static regeneration (ISR) for list pages where appropriate.

**12. Security Considerations**

*   **Authentication:** All API endpoints modifying or accessing potentially sensitive data must enforce authentication.
*   **Authorization:** Use Supabase RLS to enforce data access rules at the database level, preventing unauthorized access even if API logic has flaws.
*   **Input Validation:** Sanitize and validate all user input on both the frontend and backend (API routes) to prevent injection attacks (XSS, SQLi).
*   **Encryption:** Sensitive data like `contact_details_encrypted` must be encrypted at rest using strong algorithms (pgsodium). Access to decryption keys must be tightly controlled (service role only).
*   **Rate Limiting:** Consider implementing rate limiting on API endpoints, especially form submissions and contact requests, to prevent abuse.

**13. Future Considerations**

*   Transporter registration/profile management.
*   Advanced filtering/sorting options.
*   Map integration for locations.
*   Real-time notifications (e.g., using Supabase Realtime).
*   Status updates for requests (e.g., 'connected', 'fulfilled').