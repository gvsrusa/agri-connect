# High-Level Architecture: Authentication & User Profile Management

**Version:** 1.0
**Date:** 2025-05-12

## 1. Overview

This document outlines the high-level architecture for the application-specific User Profile Management module within the AgriConnect application. It builds upon the [Feature Overview Specification](docs/specs/Authentication_UserProfile_Management_overview.md:1) and assumes core authentication (login, signup, session management) is handled by the mandated Clerk/NextAuth service ([PRD 46](docs/PRD:46)).

The primary goal is to manage user data specific to AgriConnect (like preferred language and farm location) stored in Supabase, securely linking it to the user's identity managed by Clerk/NextAuth, while adhering to privacy requirements ([PRD 49](docs/PRD:49)).

## 2. Technology Stack

*   **Frontend:** Next.js (React)
*   **Backend API:** Next.js API Routes (or Server Actions)
*   **Authentication:** Clerk/NextAuth (External Provider - Mandated)
*   **Database:** Supabase (PostgreSQL - Mandated)
*   **Styling:** Tailwind CSS
*   **Internationalization:** `next-intl` (Recommended, or similar like `next-i18next`)

## 3. Component Breakdown (Frontend - Next.js/React)

While Clerk/NextAuth provides its own UI components for core authentication flows, the following application-specific components are required for profile management:

*   **`UserProfilePage`:** (Client or Server Component) The main container page accessible via a route like `/profile`. Fetches and displays user profile data.
*   **`ViewProfileSection`:** (Client or Server Component) Renders the non-editable (e.g., name potentially sourced from Clerk) and editable profile fields (language, location) fetched from Supabase.
*   **`EditProfileForm`:** (Client Component) Contains form inputs (e.g., dropdown for language, text input for location) for modifying profile data. Handles client-side validation and triggers API calls on submission.
*   **`InitialProfileSetupWizard`:** (Client Component / Flow - Optional) A guided flow presented to users upon their first login if essential profile information (language, location) is missing, as per [AC 1.2](docs/specs/Authentication_UserProfile_Management_overview.md:22). May reuse `EditProfileForm`.

## 4. API Design (Next.js API Routes / Server Actions)

Secure endpoints are required to manage the `user_profiles` data in Supabase. These must be protected using Clerk/NextAuth middleware/helpers to ensure only authenticated users can access them.

*   **`GET /api/user/profile`:**
    *   **Action:** Fetches the profile data for the *currently authenticated* user.
    *   **Auth:** Requires authenticated user session (verified via Clerk/NextAuth).
    *   **Logic:** Uses Clerk/NextAuth server helpers (e.g., `auth()` from `@clerk/nextjs/server`) to get the `userId`. Queries Supabase `user_profiles` table: `SELECT * FROM user_profiles WHERE clerk_user_id = userId`.
    *   **Response:** User profile data (JSON) or 404 if not found.
*   **`PUT /api/user/profile` (or `PATCH`):**
    *   **Action:** Updates the profile data for the *currently authenticated* user. Can also handle creation (`POST` or upsert logic if needed for initial setup).
    *   **Auth:** Requires authenticated user session.
    *   **Logic:** Uses Clerk/NextAuth server helpers to get `userId`. Validates request body payload (language code, location format). Executes `UPDATE user_profiles SET preferred_language = $1, farm_location = $2, updated_at = now() WHERE clerk_user_id = userId` in Supabase. RLS policies provide the core security guarantee.
    *   **Response:** Success (200/204) or error (400 Bad Request, 401 Unauthorized, 403 Forbidden, 500 Internal Server Error).

*(Note: Next.js Server Actions could be used as an alternative to API Routes, especially if invoked directly from Server Components).*

## 5. Data Flow

### 5.1. Profile Viewing

1.  User navigates to the profile page (e.g., `/profile`).
2.  The Next.js Page/Layout (Server Component preferred for initial load) uses Clerk/NextAuth server helpers (`auth()`) to obtain the authenticated `userId`.
3.  Server-side logic uses the Supabase client library (`@supabase/supabase-js`) to fetch the user's profile: `SELECT * FROM user_profiles WHERE clerk_user_id = userId`.
4.  The fetched data (or indication of absence) is passed as props to the frontend components (`UserProfilePage`, `ViewProfileSection`) for rendering.

### 5.2. Profile Editing

1.  User interacts with the `EditProfileForm` component on the profile page.
2.  User modifies data (e.g., selects a new language) and submits the form.
3.  Client-side logic in `EditProfileForm` sends a `PUT` (or `PATCH`) request to the `/api/user/profile` endpoint with the updated data payload.
4.  The API Route handler executes:
    *   Verifies authentication using Clerk/NextAuth middleware/helpers integrated with Next.js.
    *   Retrieves the `userId` of the authenticated user.
    *   Validates the incoming data payload.
    *   Uses the Supabase client to execute the `UPDATE` statement against the `user_profiles` table, using the `userId` in the `WHERE` clause.
    *   Sends an appropriate success or error HTTP response.
5.  The frontend (`EditProfileForm`) receives the response and updates the UI accordingly (e.g., displays a success notification, potentially refreshes displayed data).

### 5.3 Initial Setup Flow

*   Triggered conditionally after a user's first successful login if a call to `GET /api/user/profile` indicates no profile exists or required fields like `preferred_language` are null.
*   Presents the `InitialProfileSetupWizard` or `EditProfileForm`.
*   Submission likely uses `POST` or `PUT /api/user/profile` to create the initial record linked to the `clerk_user_id`.

## 6. Database Schema (`user_profiles` - Supabase PostgreSQL)

The schema defined in the specification ([`docs/specs/Authentication_UserProfile_Management_overview.md:38`](docs/specs/Authentication_UserProfile_Management_overview.md:38)) is confirmed and refined for Supabase best practices:

*   `id`: `UUID` (Primary Key, default `gen_random_uuid()`)
*   `clerk_user_id`: `TEXT` (Unique, Not Null, Indexed) - Stores the immutable user ID provided by Clerk/NextAuth. This is the critical link.
*   `name`: `TEXT` (Nullable) - Optional display name, potentially synced or fetched from Clerk if needed, but stored here per spec for application use.
*   `farm_location`: `TEXT` (Nullable) - Stores address or simple location description. Consider using `extensions.postgis` and `geography(Point)` type later if precise geospatial queries become necessary.
*   `preferred_language`: `TEXT` (Not Null) - Stores the IETF language tag selected by the user (e.g., 'en', 'hi', 'ta'). Must correspond to supported languages in the i18n setup.
*   `created_at`: `TIMESTAMPTZ` (Default `now()`, Not Null)
*   `updated_at`: `TIMESTAMPTZ` (Default `now()`, Not Null)

**Row Level Security (RLS) is mandatory for data privacy and security:**

*   **Enable RLS:** `ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;`
*   **SELECT Policy:** `CREATE POLICY "Allow individual user select access" ON public.user_profiles FOR SELECT USING (auth.uid()::text = clerk_user_id);`
*   **INSERT Policy:** `CREATE POLICY "Allow individual user insert access" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid()::text = clerk_user_id);`
*   **UPDATE Policy:** `CREATE POLICY "Allow individual user update access" ON public.user_profiles FOR UPDATE USING (auth.uid()::text = clerk_user_id);`
*   **DELETE Policy:** (Consider if needed - generally restrict) `CREATE POLICY "Allow individual user delete access" ON public.user_profiles FOR DELETE USING (auth.uid()::text = clerk_user_id);`

These policies leverage Supabase's built-in `auth.uid()` function, which reflects the authenticated user making the request (assuming correct integration with Clerk/NextAuth JWTs), ensuring users can only operate on their own profile row.

## 7. Integration Strategy (Clerk/NextAuth & Supabase)

*   **Authentication Context:** Clerk/NextAuth is the source of truth for user identity. Its SDK (`@clerk/nextjs`) provides authentication state and user details (`userId`, `user` object) via:
    *   Client-side: React hooks (`useUser`, `useAuth`).
    *   Server-side: Helpers (`auth()`, `currentUser()`) for use in API Routes, Server Components, Server Actions, and Middleware.
*   **Linking ID:** The `userId` obtained from Clerk/NextAuth server-side helpers is the value used to query/mutate the `clerk_user_id` column in the Supabase `user_profiles` table.
*   **Backend Operations (API Routes / Server Actions):**
    1.  Protect the route/action using Clerk/NextAuth middleware or helper functions.
    2.  Securely obtain the `userId` of the authenticated caller.
    3.  Initialize the Supabase client (`@supabase/supabase-js`). For backend operations, this typically uses the Supabase `service_role` key for elevated privileges, but relies entirely on RLS policies (based on `auth.uid()`) for enforcing user-specific data access. Ensure the Supabase JWT secret is configured correctly to validate Clerk-issued JWTs if using that integration pattern.
    4.  Pass the `userId` into the `WHERE clerk_user_id = ...` clause of Supabase SQL queries or JS client methods.

## 8. Language Preference Handling

1.  **Retrieval:** On session initialization or page load requiring localized content (e.g., in a root Server Component layout or Next.js Middleware), fetch the user's profile from Supabase using their `clerk_user_id` obtained via `auth()`.
2.  **Extraction:** Extract the `preferred_language` value from the profile data. Implement a fallback mechanism (e.g., default language 'en') if the profile doesn't exist or the field is unexpectedly null.
3.  **Application (using `next-intl` example):**
    *   Fetch the appropriate translation message file based on the determined locale (`preferred_language` or fallback).
    *   Wrap the application or relevant parts in the `NextIntlClientProvider`, passing the `locale` and `messages`. Example in `layout.tsx`:
        ```typescript
        import { NextIntlClientProvider } from 'next-intl';
        import { getMessages, getLocale } from 'next-intl/server'; // Assuming helper functions

        export default async function RootLayout({ children }) {
          const locale = await getLocale(); // Fetches based on user pref / headers etc.
          const messages = await getMessages(locale);

          return (
            <html lang={locale}>
              <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                  {/* ClerkProvider likely wraps here too */}
                  {children}
                </NextIntlClientProvider>
              </body>
            </html>
          );
        }
        ```
    *   The `getLocale` helper would contain the logic to fetch the user profile and determine the language preference.
4.  **Update:** When a user successfully updates their `preferred_language` via the `PUT /api/user/profile` endpoint:
    *   The database record is updated.
    *   The frontend should trigger a refresh or navigation that causes the `getLocale` logic to re-run, fetching the new preference and reloading the UI with the correct language via the `NextIntlClientProvider`.

## 9. Dependencies

Key libraries and SDKs required:

*   `@clerk/nextjs` (or `next-auth` and its adapter if chosen)
*   `@supabase/supabase-js`
*   `next` (Core framework)
*   `react`, `react-dom`
*   `tailwindcss` (and its dependencies like `postcss`, `autoprefixer`)
*   `next-intl` (or chosen i18n library like `react-i18next`, `next-i18next`)

## 10. Security & Privacy Considerations

*   **Authentication:** Reliant on Clerk/NextAuth's security mechanisms.
*   **Authorization:** API endpoints and Server Actions MUST be protected to ensure only authenticated users can access them, using Clerk/NextAuth primitives.
*   **Data Access Control:** Supabase Row Level Security (RLS) policies are the critical enforcement layer preventing users from accessing or modifying other users' data. Correct configuration is paramount.
*   **Privacy:** Strictly adhere to [PRD 49](docs/PRD:49) and [Spec FR 3.1 Note](docs/specs/Authentication_UserProfile_Management_overview.md:46). Avoid storing sensitive PII like email/phone (managed by Clerk) in the `user_profiles` table. Ensure `farm_location` data handling respects privacy.
*   **Input Validation:** Server-side validation of all data received from the client (in API routes/server actions) is essential to prevent invalid data storage and potential injection vulnerabilities.
*   **Secret Management:** Securely manage Supabase API keys (especially the `service_role` key) and Clerk/NextAuth API keys/secrets using environment variables and appropriate platform secret management.