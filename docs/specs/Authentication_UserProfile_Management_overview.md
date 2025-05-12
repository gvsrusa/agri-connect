# Feature Overview Specification: Authentication & User Profile Management

**Version:** 1.0
**Date:** 2025-05-12
**Author:** Spec Writer AI Mode

## 1. Introduction

This document outlines the specification for the application-specific User Profile Management features within the AgriConnect application. Authentication itself (sign-up, login, session management) is handled externally by Clerk/NextAuth as mandated ([PRD 46](docs/PRD:46)). This specification focuses on how AgriConnect manages additional user data stored in Supabase after a user is successfully authenticated, linking it to their core identity managed by Clerk/NextAuth.

**Key Goals:**
*   Allow users to manage application-specific profile details (preferred language, farm location).
*   Ensure user profile data is correctly linked to the authenticated user.
*   Utilize stored preferences (like language) to personalize the user experience.
*   Maintain strict user privacy ([PRD 49](docs/PRD:49)).

## 2. User Stories & Acceptance Criteria

**User Story 1:** As a first-time logged-in farmer, I want to set my preferred language and farm location so the app is personalized for me and provides relevant information.

*   **AC 1.1:** Upon first successful login via Clerk/NextAuth, the application checks if the Supabase user profile exists or lacks essential data (language, location).
*   **AC 1.2:** If data is missing, the user is guided through a brief setup flow to select their preferred language from the application's supported languages.
*   **AC 1.3:** The user can input or confirm their farm location during the setup flow.
*   **AC 1.4:** The selected language and location are saved to the user's profile record in the Supabase `user_profiles` table, linked via their Clerk User ID.
*   **AC 1.5:** Subsequent interactions within the application session immediately reflect the chosen language preference.

**User Story 2:** As a registered farmer, I want to view and update my application-specific profile information (preferred language, farm location) so it remains accurate and the app experience is tailored to my needs.

*   **AC 2.1:** An authenticated user can navigate to a dedicated "Profile" section within the application.
*   **AC 2.2:** The profile section displays the user's name (potentially sourced from Clerk/NextAuth) and their current application-specific settings (preferred language, farm location) stored in Supabase.
*   **AC 2.3:** The user can modify their preferred language and farm location via editable fields/controls.
*   **AC 2.4:** Saving the changes updates the corresponding record in the Supabase `user_profiles` table.
*   **AC 2.5:** The application interface respects the updated language preference upon refresh or subsequent navigation.
*   **AC 2.6:** Contact information (e.g., email/phone used for login) is treated as private per [PRD 27](docs/PRD:27) & [PRD 49](docs/PRD:49) and is not displayed or editable within this application-specific profile management interface.

## 3. Functional Requirements

*   **FR 3.1: Data Model:** A Supabase table (e.g., `user_profiles`) will store application-specific data.
    *   `id`: Primary Key (UUID or auto-incrementing integer).
    *   `clerk_user_id`: Foreign Key (Text/Varchar), unique, indexed. Links to the user ID provided by Clerk/NextAuth. This is the primary link between the authentication system and the application database.
    *   `name`: Text/Varchar (Optional, potentially display name synced/retrieved from Clerk).
    *   `farm_location`: Text or Geographic type (e.g., PostGIS Point) to store coordinates or address.
    *   `preferred_language`: Text/Varchar (e.g., 'en', 'hi', 'ta'). Stores the language code selected by the user. Must match supported language codes.
    *   `created_at`: Timestamp.
    *   `updated_at`: Timestamp.
    *   *Note:* Explicit contact details (email, phone) are *not* stored here unless absolutely necessary for an application feature *beyond* authentication, and only with strict privacy controls. Primary contact info resides within Clerk/NextAuth ([PRD 27](docs/PRD:27)).
*   **FR 3.2: Clerk/NextAuth Integration:** The application backend (Next.js API routes or server components) must securely access the authenticated user's ID from the Clerk/NextAuth session/token.
*   **FR 3.3: Profile Data Access:**
    *   On user login or relevant page load, use the Clerk User ID to query the `user_profiles` table in Supabase.
    *   If a profile exists, retrieve the data (especially `preferred_language`).
    *   If no profile exists for a logged-in user (first login scenario), prepare for profile creation.
*   **FR 3.4: Profile Creation/Update:** Provide secure API endpoints or server actions for:
    *   Creating a new record in `user_profiles` linked to a `clerk_user_id`.
    *   Updating an existing record in `user_profiles` (language, location). Only the authenticated user should be able to update their own profile.
*   **FR 3.5: Language Preference Application:** The application's internationalization (i18n) mechanism must read the `preferred_language` from the user's profile (once fetched) and set the application's display language accordingly. This should ideally happen early in the request/render cycle. ([PRD 36](docs/PRD:36))
*   **FR 3.6: Profile UI:** A dedicated UI section must allow users to view their profile data and edit the designated fields (language, location).

## 4. Non-Functional Requirements

*   **NFR 4.1: Privacy:** User profile data, especially location, must be handled securely. Contact information managed by Clerk/NextAuth must not be unnecessarily exposed or duplicated. Adherence to [PRD 49](docs/PRD:49) is paramount. Database access policies must enforce privacy.
*   **NFR 4.2: Security:** All API endpoints or server actions related to profile management must be protected and ensure that users can only access and modify their *own* profile data. Use Clerk/NextAuth middleware/guards for authorization.
*   **NFR 4.3: Performance:** Retrieval of user profile data (especially language preference) should be fast to avoid delaying page loads or personalization. Consider caching strategies if appropriate.
*   **NFR 4.4: Data Integrity:** The link between `clerk_user_id` and the Supabase profile must be maintained accurately.

## 5. Scope

*   **In Scope:**
    *   Defining and managing the Supabase `user_profiles` table structure for application-specific data.
    *   Linking Supabase profiles to Clerk/NextAuth user IDs.
    *   User flow for initial profile setup (language, location) after first login.
    *   User flow for viewing and editing existing profile data (language, location).
    *   Retrieving and applying the `preferred_language` setting.
    *   Basic UI for profile viewing/editing.
*   **Out of Scope:**
    *   The authentication process itself (sign-up, login, password management, multi-factor authentication, social logins – all handled by Clerk/NextAuth).
    *   Management of core authentication identity data stored within Clerk/NextAuth (e.g., changing login email/phone, password).
    *   User roles and permissions (unless directly stored as part of the application-specific profile).
    *   Profile picture management (unless specified as an application-specific requirement later).

## 6. Dependencies

*   **Clerk/NextAuth:** Provides authentication state and the unique `clerk_user_id`. The application relies on its SDKs/APIs to get this information.
*   **Supabase:** Provides the PostgreSQL database for storing the `user_profiles` table and the client libraries for interacting with it.
*   **Next.js:** The application framework. Profile management logic will likely reside in API routes, server components, or server actions.
*   **Internationalization Library (e.g., `next-intl`, `react-i18next`):** Required to consume the `preferred_language` setting and render the UI in the correct language.

## 7. High-Level UI/UX Considerations

*   Provide a clear entry point to the "Profile" section (e.g., user menu dropdown).
*   The profile page should be simple and intuitive.
*   Clearly distinguish between information sourced from Clerk/NextAuth (like name, potentially non-editable) and application-specific, editable data (language, location).
*   Use standard form controls (dropdowns for language, text input or map interface for location).
*   Provide feedback on successful updates (e.g., toast notification).
*   Ensure the entire profile interface adheres to the selected `preferred_language`.
*   Strictly avoid displaying or allowing edits to private contact information governed by Clerk/NextAuth and privacy rules ([PRD 49](docs/PRD:49)).