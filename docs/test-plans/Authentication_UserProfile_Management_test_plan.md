# Test Plan: Authentication & User Profile Management

**Version:** 1.0
**Date:** 2025-05-12
**Author:** Spec-To-TestPlan Converter AI Mode

## 1. Introduction

This document outlines the test plan for the **Authentication & User Profile Management** feature of the AgriConnect application. The primary goal of this feature is to allow users to manage application-specific profile details (preferred language, farm location) stored in Supabase, linked securely to their core identity managed by Clerk/NextAuth.

This plan details the scope, strategy, resources, and test cases required to ensure the feature meets the requirements outlined in the following documents:

*   Feature Overview Specification: [`docs/specs/Authentication_UserProfile_Management_overview.md`](../specs/Authentication_UserProfile_Management_overview.md)
*   High-Level Architecture: [`docs/architecture/Authentication_UserProfile_Management_architecture.md`](../architecture/Authentication_UserProfile_Management_architecture.md)
*   Master Project Plan: [`docs/Master_Project_Plan.md`](../Master_Project_Plan.md) (for overall context)

## 2. Scope

### 2.1. In Scope

*   Verification of the Supabase `user_profiles` table structure and Row Level Security (RLS) policies.
*   Testing the link between Supabase profiles and Clerk/NextAuth user IDs (`clerk_user_id`).
*   Testing the user flow for initial profile setup (language, location) after first login ([Spec User Story 1](docs/specs/Authentication_UserProfile_Management_overview.md:19)).
*   Testing the user flow for viewing and editing existing profile data (language, location) ([Spec User Story 2](docs/specs/Authentication_UserProfile_Management_overview.md:27)).
*   Verification that the application correctly retrieves and applies the `preferred_language` setting for internationalization ([Spec FR 3.5](docs/specs/Authentication_UserProfile_Management_overview.md:55), [Arch 8](docs/architecture/Authentication_UserProfile_Management_architecture.md:109)).
*   Testing the Profile Management UI/UX elements ([Spec 7](docs/specs/Authentication_UserProfile_Management_overview.md:87), [Arch 3](docs/architecture/Authentication_UserProfile_Management_architecture.md:21)).
*   Testing the backend API endpoints (`GET`, `PUT/POST /api/user/profile`) for functionality, security, and error handling ([Arch 4](docs/architecture/Authentication_UserProfile_Management_architecture.md:30)).
*   Security testing to ensure users can only access/modify their own data ([Spec NFR 4.1, 4.2](docs/specs/Authentication_UserProfile_Management_overview.md:60), [Arch 10](docs/architecture/Authentication_UserProfile_Management_architecture.md:152)).
*   Negative testing scenarios (invalid inputs, unauthorized access).
*   Basic performance checks for profile data retrieval.

### 2.2. Out of Scope

*   Testing the core authentication process provided by Clerk/NextAuth (sign-up, login, password management, MFA, social logins).
*   Testing the management of core identity data stored within Clerk/NextAuth (e.g., changing login email/phone, password).
*   Testing user roles and permissions beyond the scope of the `user_profiles` table.
*   Testing profile picture management (unless added later).
*   Exhaustive performance/load testing (covered separately if required).
*   Testing specific browser compatibility beyond the project's defined supported browsers.

## 3. Test Strategy

A combination of manual and automated testing will be employed.

*   **Manual Testing:** Focus on UI/UX flows, initial setup experience, visual verification of language changes, and exploratory testing for edge cases.
*   **Automated Testing:**
    *   **Unit Tests:** For individual components (`EditProfileForm`, utility functions for data fetching/formatting).
    *   **Integration Tests:** For testing the interaction between frontend components, API routes/server actions, and the Supabase database (including RLS checks). Focus on API endpoint functionality and data integrity.
    *   **End-to-End (E2E) Tests:** Simulate user flows like initial setup and profile update using tools like Playwright or Cypress.
*   **API Testing:** Direct testing of the `/api/user/profile` endpoints using tools like Postman or automated scripts to verify functionality, authentication, authorization, and error handling.
*   **Security Testing:** Focused manual and automated tests to verify RLS policies, endpoint protection, and prevention of unauthorized data access.
*   **Database Testing:** Manual inspection and automated checks (if feasible) to verify schema, data integrity, and RLS policy enforcement in Supabase.

## 4. Test Environment & Tools

*   **Browsers:** Latest stable versions of Chrome, Firefox, Safari (as defined in [`docs/Master_Project_Plan.md`](../Master_Project_Plan.md)).
*   **Authentication:** Clerk/NextAuth development instance with test user accounts.
*   **Database:** Supabase development/staging project instance.
*   **Frontend/Backend:** Local development environment or deployed staging environment.
*   **Tools:**
    *   Browser Developer Tools
    *   Testing Frameworks (Jest, React Testing Library)
    *   E2E Testing Tools (Playwright/Cypress)
    *   API Client (Postman, Insomnia, or curl)
    *   Supabase Studio/SQL Client (for database verification)

## 5. Test Data Requirements

*   **Clerk/NextAuth Users:**
    *   Multiple test user accounts.
    *   At least one user intended for "first login" scenario (no corresponding Supabase profile).
    *   At least one user with an existing Supabase profile.
*   **Supabase `user_profiles` Data:**
    *   Records linked to existing Clerk users.
    *   Records with varying `preferred_language` values (e.g., 'en', 'es').
    *   Records with different `farm_location` data (valid text).
    *   Simulated state where a Clerk user exists but the Supabase profile is missing or incomplete (e.g., `preferred_language` is NULL before initial setup).
*   **Input Data:**
    *   Valid language codes (e.g., 'en', 'es').
    *   Invalid/unsupported language codes.
    *   Valid location strings.
    *   Potentially invalid/malformed location strings (if validation is implemented).
    *   Empty/null inputs for required fields (where applicable).

## 6. Test Cases

*(Note: Each test case should include Preconditions, Steps, Expected Results, and Actual Results columns in a formal test execution document/tool. References to Spec AC/FR/NFR and Arch sections are included.)*

### 6.1. Functional Tests - Initial Profile Setup (First Login)

| Test Case ID | Description                                                                 | Spec Ref        | Arch Ref | Priority | Type     |
| :----------- | :-------------------------------------------------------------------------- | :-------------- | :------- | :------- | :------- |
| TC-PROF-001  | Verify user is guided to setup flow on first login if profile is incomplete | AC 1.1, AC 1.2  | 5.3      | High     | Manual/E2E |
| TC-PROF-002  | Verify user can select a preferred language during initial setup            | AC 1.2          | 3, 5.3   | High     | Manual/E2E |
| TC-PROF-003  | Verify user can input farm location during initial setup                    | AC 1.3          | 3, 5.3   | High     | Manual/E2E |
| TC-PROF-004  | Verify selected language and location are saved to Supabase `user_profiles` | AC 1.4, FR 3.4  | 4, 5.3, 6| High     | API/DB   |
| TC-PROF-005  | Verify Supabase profile is correctly linked via `clerk_user_id`             | FR 3.1, FR 3.3  | 6, 7     | High     | DB       |
| TC-PROF-006  | Verify application UI reflects the chosen language immediately after setup  | AC 1.5, FR 3.5  | 8        | High     | Manual/E2E |
| TC-PROF-007  | Verify profile creation API call (`POST` or `PUT` upsert) succeeds          | FR 3.4          | 4        | High     | API      |

### 6.2. Functional Tests - Profile Viewing & Editing

| Test Case ID | Description                                                                    | Spec Ref        | Arch Ref | Priority | Type     |
| :----------- | :----------------------------------------------------------------------------- | :-------------- | :------- | :------- | :------- |
| TC-PROF-010  | Verify authenticated user can navigate to the "Profile" section                | AC 2.1          | 3, 7     | High     | Manual/E2E |
| TC-PROF-011  | Verify profile section displays current language and location from Supabase    | AC 2.2, FR 3.3  | 3, 4, 5.1| High     | Manual/E2E |
| TC-PROF-012  | Verify user name (if sourced from Clerk) is displayed (potentially read-only)  | AC 2.2          | 3, 7     | Medium   | Manual/E2E |
| TC-PROF-013  | Verify private contact info (email/phone from Clerk) is NOT displayed          | AC 2.6, NFR 4.1 | 7, 10    | High     | Manual/E2E |
| TC-PROF-014  | Verify user can modify preferred language via UI control                       | AC 2.3          | 3        | High     | Manual/E2E |
| TC-PROF-015  | Verify user can modify farm location via UI control                            | AC 2.3          | 3        | High     | Manual/E2E |
| TC-PROF-016  | Verify saving changes updates the correct record in Supabase `user_profiles`   | AC 2.4, FR 3.4  | 4, 5.2, 6| High     | API/DB   |
| TC-PROF-017  | Verify `updated_at` timestamp is updated in Supabase on successful edit        | FR 3.1          | 6        | Medium   | DB       |
| TC-PROF-018  | Verify application UI reflects updated language after saving and refresh/nav   | AC 2.5, FR 3.5  | 8        | High     | Manual/E2E |
| TC-PROF-019  | Verify profile update API call (`PUT`/`PATCH`) succeeds with valid data        | FR 3.4          | 4        | High     | API      |
| TC-PROF-020  | Verify profile fetch API call (`GET`) returns correct data for logged-in user  | FR 3.3          | 4        | High     | API      |
| TC-PROF-021  | Verify profile fetch API call (`GET`) returns 404 for user with no profile     | FR 3.3          | 4        | High     | API      |

### 6.3. UI/UX Tests

| Test Case ID | Description                                                               | Spec Ref | Arch Ref | Priority | Type   |
| :----------- | :------------------------------------------------------------------------ | :------- | :------- | :------- | :----- |
| TC-UI-001    | Verify clear navigation path to Profile section (e.g., user menu)         | 7        | 7        | Medium   | Manual |
| TC-UI-002    | Verify profile page layout is intuitive and fields are clearly labelled   | 7        | 3, 7     | Medium   | Manual |
| TC-UI-003    | Verify language dropdown contains all supported languages                 | 7        | 3        | Medium   | Manual |
| TC-UI-004    | Verify location input field is appropriate (text input)                   | 7        | 3        | Medium   | Manual |
| TC-UI-005    | Verify visual feedback (e.g., toast notification) is shown on save success| 7        | 7        | Medium   | Manual |
| TC-UI-006    | Verify visual feedback is shown on save failure                           | 7        | 7        | Medium   | Manual |
| TC-UI-007    | Verify entire profile page UI respects the selected `preferred_language`    | 7, FR 3.5| 8        | High     | Manual |
| TC-UI-008    | Verify form fields are disabled/enabled appropriately during save         | -        | 3        | Low      | Manual |

### 6.4. Security Tests

| Test Case ID | Description                                                                         | Spec Ref        | Arch Ref | Priority | Type     |
| :----------- | :---------------------------------------------------------------------------------- | :-------------- | :------- | :------- | :------- |
| TC-SEC-001   | Verify `GET /api/user/profile` fails (401/403) for unauthenticated requests         | NFR 4.2         | 4, 10    | Critical | API      |
| TC-SEC-002   | Verify `PUT /api/user/profile` fails (401/403) for unauthenticated requests         | NFR 4.2         | 4, 10    | Critical | API      |
| TC-SEC-003   | Verify User A cannot `GET` User B's profile via API                                 | NFR 4.1, NFR 4.2| 4, 6, 10 | Critical | API/DB   |
| TC-SEC-004   | Verify User A cannot `PUT` updates to User B's profile via API                      | NFR 4.1, NFR 4.2| 4, 6, 10 | Critical | API/DB   |
| TC-SEC-005   | Verify Supabase RLS policy prevents `SELECT` of other users' data                   | NFR 4.1, NFR 4.2| 6, 10    | Critical | DB       |
| TC-SEC-006   | Verify Supabase RLS policy prevents `UPDATE` of other users' data                   | NFR 4.1, NFR 4.2| 6, 10    | Critical | DB       |
| TC-SEC-007   | Verify Supabase RLS policy prevents `INSERT` with incorrect `clerk_user_id`         | NFR 4.1, NFR 4.2| 6, 10    | Critical | DB       |
| TC-SEC-008   | Verify server-side validation rejects invalid language codes in API `PUT` request   | -               | 10       | High     | API      |
| TC-SEC-009   | Verify server-side validation handles potentially malicious input in location field | -               | 10       | High     | API      |
| TC-SEC-010   | Verify sensitive Clerk/NextAuth tokens/details are not exposed in API responses     | NFR 4.1         | 10       | High     | API      |

### 6.5. Negative Tests & Edge Cases

| Test Case ID | Description                                                                     | Spec Ref | Arch Ref | Priority | Type     |
| :----------- | :------------------------------------------------------------------------------ | :------- | :------- | :------- | :------- |
| TC-NEG-001   | Attempt to save profile with invalid language code                              | -        | 4, 10    | Medium   | Manual/API |
| TC-NEG-002   | Attempt to save profile with empty required field (if applicable)               | -        | 4, 10    | Medium   | Manual/API |
| TC-NEG-003   | Simulate network error during profile save; verify UI handles failure gracefully| -        | 7        | Medium   | Manual/E2E |
| TC-NEG-004   | Simulate API returning 500 error during save; verify UI handles failure         | -        | 7        | Medium   | Manual/E2E |
| TC-EDGE-001  | User logs in, profile created/updated, session expires, logs back in - verify data persists | - | - | Medium | Manual/E2E |
| TC-EDGE-002  | Make rapid consecutive updates to the profile - verify final state is correct   | -        | -        | Low      | Manual/API |
| TC-EDGE-003  | Access profile page immediately after login (potential race condition for fetch)| FR 3.3   | 5.1      | Medium   | Manual/E2E |
| TC-EDGE-004  | User exists in Clerk but Supabase profile row is manually deleted - verify behavior (e.g., triggers setup) | FR 3.3 | 5.1, 5.3 | Medium | Manual/DB |

## 7. Requirements Traceability

Traceability is maintained by linking test cases directly to User Story Acceptance Criteria (AC), Functional Requirements (FR), Non-Functional Requirements (NFR) from the specification ([`docs/specs/Authentication_UserProfile_Management_overview.md`](../specs/Authentication_UserProfile_Management_overview.md)), and relevant sections of the architecture document ([`docs/architecture/Authentication_UserProfile_Management_architecture.md`](../architecture/Authentication_UserProfile_Management_architecture.md)) as indicated in the test case tables above. This ensures comprehensive test coverage considerations for all specified requirements.

## 8. Acceptance Criteria

The feature will be considered accepted when:

*   All "High" and "Critical" priority test cases pass.
*   All Acceptance Criteria (AC 1.1-1.5, AC 2.1-2.6) from the Feature Overview Specification are met, as verified by the corresponding test cases.
*   No major UI/UX defects are present.
*   No security vulnerabilities identified in Section 6.4 are present.
*   The application correctly reflects the user's preferred language based on their profile setting.
*   The test plan supports acceptance test planning by providing clear test cases linked to requirements.
