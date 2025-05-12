# Test Plan: Authentication & User Profile Management

**Version:** 1.0
**Date:** 2025-05-12
**Author:** Spec-To-TestPlan Converter AI Mode
**Feature:** Authentication & User Profile Management
**Specification:** [`docs/specs/Authentication_UserProfile_Management_overview.md`](docs/specs/Authentication_UserProfile_Management_overview.md)
**Architecture:** [`docs/architecture/Authentication_UserProfile_Management_architecture.md`](docs/architecture/Authentication_UserProfile_Management_architecture.md)

## 1. Introduction

This document outlines the test plan for the application-specific User Profile Management features within the AgriConnect application. Core authentication (sign-up, login, session management) is handled by Clerk/NextAuth and is considered out of scope for this plan, except for integration points. This plan focuses on testing the creation, viewing, updating, and usage of user profile data (preferred language, farm location) stored in Supabase and linked to the authenticated user's Clerk ID.

The goal is to ensure the feature functions according to the specification ([`docs/specs/Authentication_UserProfile_Management_overview.md`](docs/specs/Authentication_UserProfile_Management_overview.md)), aligns with the architecture ([`docs/architecture/Authentication_UserProfile_Management_architecture.md`](docs/architecture/Authentication_UserProfile_Management_architecture.md)), meets non-functional requirements (privacy, security, performance), and provides a seamless user experience.

## 2. Scope

### 2.1 In Scope

*   Testing the Supabase `user_profiles` table structure and RLS policies.
*   Testing the linkage between Supabase profiles and Clerk/NextAuth user IDs.
*   Testing the user flow for initial profile setup (language, location) after first login.
*   Testing the user flow for viewing existing profile data (language, location).
*   Testing the user flow for editing existing profile data (language, location).
*   Testing the retrieval and application of the `preferred_language` setting for UI localization.
*   Testing the Profile Management UI (`/profile` page, forms, display elements).
*   Testing the backend API endpoints (`GET /api/user/profile`, `PUT /api/user/profile`) or equivalent Server Actions for functionality, security, and error handling.
*   Testing data validation for profile fields (language codes, location format if applicable).
*   Testing privacy controls (ensuring Clerk/NextAuth PII is not exposed or editable via this feature).
*   Testing security controls (authentication checks on APIs, RLS enforcement).

### 2.2 Out of Scope

*   Testing the core Clerk/NextAuth authentication flows (sign-up, login, password reset, MFA, social logins).
*   Testing the management of core identity data within Clerk/NextAuth (e.g., changing login email/phone).
*   Testing user roles and permissions beyond what's stored in the `user_profiles` table.
*   Testing profile picture management (unless added later).
*   Load/Stress testing (unless specifically requested).
*   Testing the underlying Clerk/NextAuth or Supabase services themselves.
*   Testing specific browser compatibility issues beyond the defined test environment.

## 3. Test Strategy

A combination of manual and automated testing will be employed across different levels:

*   **Unit Testing:** Focus on individual functions within API routes/Server Actions (data validation, Supabase interaction logic) and potentially helper functions in frontend components. (Responsibility: Development Team)
*   **Integration Testing:**
    *   Test the interaction between frontend components (`EditProfileForm`) and backend APIs (`/api/user/profile`).
    *   Test the interaction between the application backend and Supabase (data fetching, updates, RLS enforcement).
    *   Test the retrieval of `clerk_user_id` from Clerk/NextAuth and its use in Supabase queries.
    *   Test the integration with the i18n library (`next-intl`) to apply the `preferred_language`.
*   **End-to-End (E2E) Testing:** Simulate complete user flows using tools like Playwright or Cypress.
    *   First-time login -> Initial Profile Setup -> Verify data saved & language applied.
    *   Login -> Navigate to Profile -> View Data -> Edit Data -> Save -> Verify update & language applied.
*   **API Testing:** Directly test the `/api/user/profile` endpoints using tools like Postman or automated scripts to verify authentication, authorization, request/response formats, and error handling.
*   **Security Testing:**
    *   Verify API endpoints reject unauthenticated requests.
    *   Attempt to access/modify other users' profile data via API manipulation to confirm RLS policy enforcement.
    *   Manual review of code for potential vulnerabilities (e.g., improper handling of user input).
*   **Usability Testing:** Manual review of the profile management UI for clarity, ease of use, and adherence to UX guidelines mentioned in the specification.
*   **Localization Testing:** Manually switch between all supported languages via the profile settings and verify that the profile page UI and relevant application text are correctly translated.

## 4. Test Environment

*   **Browsers:** Latest stable versions of Google Chrome, Mozilla Firefox, Apple Safari.
*   **Authentication:** Dedicated Clerk/NextAuth test instance/accounts.
*   **Database:** Dedicated Supabase test project instance with the `user_profiles` table schema and RLS policies applied as defined in the architecture document ([`docs/architecture/Authentication_UserProfile_Management_architecture.md:76`](docs/architecture/Authentication_UserProfile_Management_architecture.md:76)).
*   **Application:** Deployed instance of the AgriConnect application (development or staging environment) connected to the test Clerk and Supabase instances.
*   **Tools:**
    *   Browser Developer Tools
    *   Testing Frameworks (e.g., Jest for unit, Playwright/Cypress for E2E)
    *   API Client (e.g., Postman, Insomnia)

## 5. Test Data Requirements

*   **User Accounts (Clerk/NextAuth):**
    *   `TestUser_New`: A newly created user who has never logged into AgriConnect before (no corresponding Supabase profile).
    *   `TestUser_Existing_EN`: An existing user with a pre-populated Supabase profile (e.g., `preferred_language='en'`, `farm_location='Test Farm A'`).
    *   `TestUser_Existing_HI`: An existing user with a pre-populated Supabase profile (e.g., `preferred_language='hi'`, `farm_location='Test Farm B'`).
    *   `TestUser_Other`: Another existing user account for testing cross-user access attempts.
*   **Profile Data:**
    *   Valid Language Codes: 'en', 'hi', 'ta' (or other supported codes).
    *   Invalid Language Codes: 'xx', '', null, numbers.
    *   Valid Location Data: Simple text strings (e.g., "My Farm, Village", "123 Farm Lane").
    *   Invalid Location Data: Potentially very long strings, special characters (depending on validation rules).
*   **Database State:** Ability to reset the `user_profiles` table or specific user entries to a known state before test runs.

## 6. Test Cases

