# High-Level Architecture: Crop Advisory Content Delivery

**Version:** 1.0
**Date:** 2025-05-12

## 1. Overview

This document outlines the high-level architecture for the "Crop Advisory Content Delivery" module within the AgriConnect application. It builds upon the [Feature Overview Specification](docs/specs/Crop_Advisory_Content_Delivery_overview.md:1) and leverages the existing project technology stack and authentication mechanisms ([`docs/architecture/Authentication_UserProfile_Management_architecture.md`](docs/architecture/Authentication_UserProfile_Management_architecture.md)).

The primary goal is to provide farmers with accessible, multilingual crop advisory information (pests, diseases, climate impacts) via the Next.js web application, retrieving structured content from Supabase based on the user's selected language preference. Key considerations include simplicity for low-literacy users, efficient multi-language data handling, and limited offline caching.

## 2. Technology Stack (Reference)

*   **Frontend:** Next.js (React)
*   **Backend API:** Next.js API Routes
*   **Database:** Supabase (PostgreSQL)
*   **Authentication:** Clerk/NextAuth (via [`docs/architecture/Authentication_UserProfile_Management_architecture.md`](docs/architecture/Authentication_UserProfile_Management_architecture.md))
*   **Styling:** Tailwind CSS
*   **Internationalization:** Assumed `next-intl` or similar (as per Auth architecture)

## 3. Component Breakdown (Frontend - Next.js/React)

The following components will form the user interface for this module:

*   **`AdvisoryLayout`:** (Server Component) A layout component wrapping advisory pages, potentially handling fetching of common data or setting context.
*   **`AdvisoryListPage`:** (Server Component) Displays the list of available advisory topics fetched server-side for initial load performance. Uses the user's language preference to fetch localized topic titles. Likely resides at a route like `/advisories`.
*   **`AdvisoryTopicCard`:** (Client or Server Component) Renders a single topic in the list, displaying the localized title, optional short description, and icon. Handles navigation to the detail page. If client-side filtering/searching is added later, this might become a Client Component.
*   **`AdvisoryDetailPage`:** (Server Component initially, potentially Client for caching) Displays the detailed content for a selected advisory topic. Fetches content server-side based on the topic slug and user language. Resides at a route like `/advisories/{topic_slug}`. Client-side logic will be needed to implement caching.
*   **`AdvisoryContentRenderer`:** (Client or Server Component) Takes the structured content items (fetched for a specific topic and language) and renders them appropriately based on `item_type` (heading, paragraph, image, list).

## 4. API Design (Next.js API Routes)

Secure API endpoints are needed to fetch advisory data from Supabase. These routes must integrate with the authentication system to retrieve the user's language preference implicitly or explicitly.

*   **`GET /api/advisory/topics`:**
    *   **Action:** Fetches a list of advisory topics with titles and slugs localized to the user's preferred language.
    *   **Auth:** Requires authenticated user session (to determine language preference implicitly server-side or via a passed `lang` query param).
    *   **Query Params:** `lang` (e.g., `hi`, `en`) - Specifies the language for topic titles. This should be derived server-side from the user's profile if possible, or passed explicitly by the client.
    *   **Logic:** Retrieves the user's language preference (e.g., via Auth context). Queries Supabase, joining `advisory_topics` and `advisory_topic_translations` filtered by the language code. Selects `slug`, `icon_url`, and the localized `title`.
    *   **Response:** JSON array of topic objects `{ slug: string, title: string, icon_url: string | null }`.
*   **`GET /api/advisory/content/{topic_slug}`:**
    *   **Action:** Fetches the structured, localized content items for a specific advisory topic.
    *   **Auth:** Requires authenticated user session.
    *   **Path Params:** `topic_slug` (e.g., `pest-management-rice`).
    *   **Query Params:** `lang` (e.g., `hi`, `en`) - Specifies the language for the content. Derived server-side from user profile or passed explicitly.
    *   **Logic:** Retrieves user language. Finds `topic_id` from `topic_slug`. Queries Supabase, joining `advisory_content_items` and `advisory_content_translations` filtered by `topic_id` and `language_code`. Selects `item_type`, `order_index`, localized `text_content`, and `media_url`. Orders by `order_index`. Also fetches the localized topic title.
    *   **Response:** JSON object containing topic title and an array of content items: `{ title: string, content: [{ item_type: string, order_index: number, text_content: string | null, media_url: string | null }] }`.

## 5. Data Flow

1.  **User Login & Language:** User logs in; language preference is available via the Auth/Profile module ([`docs/architecture/Authentication_UserProfile_Management_architecture.md`](docs/architecture/Authentication_UserProfile_Management_architecture.md)).
2.  **Navigate to Advisories:** User accesses the `/advisories` route.
3.  **Fetch Topic List:** The `AdvisoryListPage` (Server Component) determines the user's language and makes a server-side request (or internal API call) to `GET /api/advisory/topics?lang={userLang}`.
4.  **API Fetches Topics:** The API route handler queries Supabase, joining `advisory_topics` with `advisory_topic_translations` on `language_code = {userLang}`.
5.  **Render Topic List:** The API returns the localized topic list; `AdvisoryListPage` renders `AdvisoryTopicCard` components.
6.  **Select Topic:** User clicks an `AdvisoryTopicCard`. Navigation occurs to `/advisories/{topic_slug}`.
7.  **Fetch Topic Content:** The `AdvisoryDetailPage` (Server Component) extracts `topic_slug` and user language, makes a server-side request to `GET /api/advisory/content/{topic_slug}?lang={userLang}`.
8.  **API Fetches Content:** The API route handler queries Supabase, joining `advisory_content_items` with `advisory_content_translations` for the given `topic_slug` and `language_code = {userLang}`, ordered by `order_index`.
9.  **Render Content:** The API returns the localized title and structured content array. `AdvisoryDetailPage` passes this to `AdvisoryContentRenderer` for display.
10. **Caching (Client-Side):** Upon successful content load in `AdvisoryDetailPage`, client-side JavaScript stores the fetched content (title, content array) in browser storage (e.g., `localStorage`), keyed by `{topic_slug}-{userLang}`.
11. **Offline View:** If the user revisits `/advisories/{topic_slug}` while offline, client-side logic in `AdvisoryDetailPage` attempts to retrieve data from the cache using the key. If found, it renders the cached content; otherwise, it displays an offline message.

## 6. Database Schema (Supabase - Refined)

The schema proposed in the specification ([`docs/specs/Crop_Advisory_Content_Delivery_overview.md:92`](docs/specs/Crop_Advisory_Content_Delivery_overview.md:92)) is suitable. Key tables:

*   `languages` (`code` PK, `name`)
*   `advisory_topics` (`id` PK, `slug` UNIQUE NOT NULL, `icon_url`, timestamps)
*   `advisory_topic_translations` (`topic_id` FK, `language_code` FK, `title` NOT NULL, `short_description`, PK(`topic_id`, `language_code`))
*   `advisory_content_items` (`id` PK, `topic_id` FK, `item_type` NOT NULL, `order_index` NOT NULL, timestamps)
*   `advisory_content_translations` (`content_item_id` FK, `language_code` FK, `text_content`, `media_url`, PK(`content_item_id`, `language_code`))

**Indexing Recommendations:**

*   `advisory_topics`: Index on `slug` (already UNIQUE, so implicitly indexed).
*   `advisory_topic_translations`: Composite index on (`topic_id`, `language_code`) (covered by PK). Consider index on `language_code` if querying all topics for a language is common without specifying topic.
*   `advisory_content_items`: Index on `topic_id`. Consider composite index on (`topic_id`, `order_index`).
*   `advisory_content_translations`: Composite index on (`content_item_id`, `language_code`) (covered by PK). Consider index on `language_code`.

**Row Level Security (RLS):** RLS should be enabled for these tables if non-public access is required (e.g., draft advisories). For public read access, RLS might allow `SELECT` for all roles, while `INSERT/UPDATE/DELETE` would be restricted to specific admin/content manager roles.

## 7. Multi-Language Content Retrieval Strategy

1.  **Identify Language:** The required language code (`lang`) is determined server-side by accessing the authenticated user's profile data (fetched from `user_profiles` table via the mechanism in [`docs/architecture/Authentication_UserProfile_Management_architecture.md`](docs/architecture/Authentication_UserProfile_Management_architecture.md)) or from an explicit `lang` query parameter passed by the client. A fallback language (e.g., 'en') should be defined if the user preference is missing or invalid.
2.  **API Parameter:** The determined `lang` code is passed as a query parameter to the relevant API endpoints (`/api/advisory/topics`, `/api/advisory/content/{slug}`).
3.  **Supabase Query:** The API route handlers use the `lang` parameter in their Supabase queries. They perform `JOIN` operations between the base tables (`advisory_topics`, `advisory_content_items`) and their corresponding translation tables (`advisory_topic_translations`, `advisory_content_translations`) filtering the join condition with `WHERE language_code = {lang}`.
4.  **Data Selection:** The `SELECT` statement retrieves the necessary fields from the base table (e.g., `slug`, `icon_url`, `item_type`, `order_index`) and the localized fields from the translation table (e.g., `title`, `text_content`, `media_url`).
5.  **Fallback:** If a specific translation is missing for the requested `lang`, the query should ideally attempt to fetch a default language version (e.g., 'en') or return null/empty for that specific field, allowing the frontend to handle the missing translation gracefully (e.g., display default text or an indicator). This requires careful query design (e.g., using `LEFT JOIN` and `COALESCE`).

## 8. Caching Strategy (Client-Side)

*   **Goal:** Provide limited offline access to previously viewed advisory content ([`docs/specs/Crop_Advisory_Content_Delivery_overview.md:50`](docs/specs/Crop_Advisory_Content_Delivery_overview.md:50)).
*   **Mechanism:** Use browser `localStorage` or `sessionStorage` for simplicity initially. `IndexedDB` could be considered if content size becomes large or more complex querying is needed. A Service Worker offers more robust offline capabilities but adds complexity and is deferred unless PWA functionality becomes a priority.
*   **Trigger:** Cache the data (topic title, content items array) when the `GET /api/advisory/content/{topic_slug}?lang={userLang}` API call successfully returns data within the `AdvisoryDetailPage`.
*   **Cache Key:** Use a composite key incorporating both the topic identifier and the language, e.g., `advisory-{topic_slug}-{lang}`.
*   **Data Stored:** Store the JSON response from the content API endpoint.
*   **Retrieval:** On loading `AdvisoryDetailPage`, check network status. If offline, attempt to load data from storage using the appropriate key. If online, fetch fresh data but still cache it.
*   **Invalidation:** Keep it simple initially. Data is overwritten when the same topic/language is viewed again online. Time-based expiration (e.g., remove items older than 7 days) can be added. Checking the `updated_at` timestamp from the API against a stored timestamp could trigger re-fetching even if cached, but adds complexity.

## 9. Dependencies

*   **Authentication & User Profile Module:** ([`docs/architecture/Authentication_UserProfile_Management_architecture.md`](docs/architecture/Authentication_UserProfile_Management_architecture.md)) - Critical for obtaining the user's `clerk_user_id` and `preferred_language`.
*   **Supabase:** PostgreSQL database and `@supabase/supabase-js` client library.
*   **Next.js:** Core framework for frontend and API routes.
*   **React:** UI library.
*   **Internationalization Library:** (e.g., `next-intl`) For handling UI string localization and potentially managing locale context.
*   **Clerk/NextAuth:** For authentication state and user identity.
*   **Tailwind CSS:** For styling.

## 10. Security Considerations

*   **API Protection:** All API routes (`/api/advisory/*`) must be protected, ensuring only authenticated users can access them, leveraging Clerk/NextAuth middleware or helpers.
*   **Data Access:** If advisory content is not intended to be public, Supabase RLS policies must be configured on the advisory tables to restrict access appropriately (e.g., based on user roles). For public content, read access can be open, but write access must be restricted.
*   **Input Validation:** Sanitize and validate parameters like `topic_slug` and `lang` in API routes.