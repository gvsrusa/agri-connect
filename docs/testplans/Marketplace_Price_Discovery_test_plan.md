# Test Plan: Marketplace & Price Discovery

## 1. Introduction

This document outlines the test plan for the **Marketplace & Price Discovery** feature of the AgriConnect application. The purpose of this plan is to detail the scope, approach, resources, and schedule of intended testing activities. The goal is to ensure the feature meets the requirements outlined in the [Feature Overview Specification](docs/specs/Marketplace_Price_Discovery_overview.md) and provides a reliable, usable, and localized experience for farmers.

## 2. Scope

### 2.1. In Scope

*   **User Authentication:** Verification that only registered and logged-in users can access marketplace and price discovery features (Leveraging existing Auth tests).
*   **Produce Listing:**
    *   Creating new produce listings via the web form (US1, AC1.1, FR2.1).
    *   Input validation for crop type, quantity, and price (FR2.1).
    *   Saving listings to the Supabase database associated with the correct user (AC1.2, FR2.2).
    *   Displaying confirmation messages upon successful listing (AC1.3, FR2.3).
*   **Marketplace Browsing:**
    *   Viewing the list of active produce listings (US2, AC2.1, FR3.1).
    *   Correct display of listing details (crop type, quantity, price, seller location - general) (AC2.1, FR3.2).
*   **Market Price Discovery:**
    *   Accessing the price discovery section (US3, FR4.1).
    *   Selecting/searching for crops and market locations (AC3.1, FR4.2).
    *   Displaying the latest market price for the selected crop/location combination (AC3.2, FR4.3).
*   **Multi-Language Support:**
    *   Ability to switch languages via the UI (US4, FR5.2).
    *   Persistence of language preference in the user profile (AC4.1, FR5.3).
    *   Correct display of UI elements (labels, buttons, messages) in the selected language (FR2.1, FR2.3, FR3.3, FR4.4, FR5.1, FR5.4).
    *   Correct display of localized data (crop names, market names, units) where applicable (FR3.3, FR4.4, FR4.5, FR4.6).
*   **Usability & Accessibility:**
    *   Simplicity and intuitiveness of the UI for low-literacy/low-tech users (NFR1).
    *   Clarity of icons and minimal text usage (NFR1).
    *   Ease of navigation.
*   **Responsiveness:** Verification of proper display and functionality across different screen sizes (mobile, tablet, desktop) (NFR3).
*   **Performance:** Basic checks for responsiveness on simulated low-bandwidth connections (NFR2).
*   **Data Integrity:** Verification that data is saved and retrieved accurately from Supabase (NFR5).
*   **Privacy:** Ensuring no sensitive user contact details are displayed in public listings (NFR4).

### 2.2. Out of Scope

*   Full transaction or payment processing (PRD 51).
*   Direct user-to-user communication features.
*   Editing or deleting existing produce listings (unless added later).
*   Advanced filtering or sorting beyond basic crop type (unless added later, FR3.4).
*   Complex inventory management.
*   Advanced analytics or reporting.
*   User reviews or ratings.
*   Delivery or logistics coordination.
*   Bidding or auction mechanisms.
*   Testing the underlying authentication system (Clerk/NextAuth) itself (assumed tested separately, D1).
*   Testing the external market price data source API directly (focus is on integration and display, D3).

## 3. Test Strategy

### 3.1. Testing Levels

*   **Unit Testing:** Developers will write unit tests for individual components and functions (e.g., form validation logic, data transformation functions, UI components like LanguageSwitcher).
*   **Integration Testing:** Testing the interaction between components, such as the frontend UI, API calls to the backend (Next.js API routes or direct Supabase calls), and the database (Supabase). Testing integration with the localization system (`next-intl`) and authentication (Clerk/NextAuth).
*   **End-to-End (E2E) Testing:** Simulating complete user flows using automated testing frameworks (e.g., Playwright, Cypress) covering:
    *   Listing a new crop.
    *   Browsing the marketplace.
    *   Checking market prices.
    *   Switching languages and verifying UI/data updates.

### 3.2. Testing Types

*   **Functional Testing:** Verifying that all features work according to the specified requirements (User Stories, Acceptance Criteria, Functional Requirements). This includes positive and negative testing.
*   **Usability Testing:** Evaluating the ease of use, intuitiveness, and accessibility of the UI, particularly for the target audience (low-literacy, low-tech). This will involve manual exploratory testing focusing on NFR1, NFR6, NFR7.
*   **Localization Testing:** Ensuring all UI text and relevant data are correctly translated and displayed in supported languages (English, Hindi, Marathi initially). Checking for layout issues caused by varying text lengths (NFR6). Verifying FR5.1-FR5.4.
*   **Compatibility Testing (Responsiveness):** Testing the application on different browsers (Chrome, Firefox, Safari - latest versions) and screen sizes (simulated mobile, tablet, desktop) as per NFR3.
*   **Performance Testing (Basic):** Manual checks using browser developer tools to simulate slow network conditions (e.g., 3G Fast/Slow) and observe loading times and responsiveness, addressing NFR2. No formal load testing is planned for MVP.
*   **Security Testing (Basic):** Verifying that only authenticated users can access features and that sensitive data (like contact info) is not exposed inappropriately in listings. Focus on privacy requirements (NFR4).
*   **Regression Testing:** Re-running relevant test cases (automated and manual) after bug fixes or feature enhancements to ensure no new issues have been introduced.

## 4. Test Environment

*   **Frontend:** Web Browsers (Latest versions of Chrome, Firefox, Safari) on Desktop (macOS, Windows) and Mobile (iOS, Android - simulated via DevTools and potentially real devices).
*   **Backend:** Next.js development server (`npm run dev`), Supabase project (Development/Staging instance).
*   **Authentication:** Clerk/NextAuth development/staging environment.
*   **Database:** Supabase PostgreSQL (Development/Staging instance).
*   **Price Data:** Mocked data source or access to the actual (potentially staging) price data API/source (as per D3).
*   **Network:** Standard broadband and simulated low-bandwidth conditions (e.g., 3G Fast/Slow via browser DevTools).

## 5. Test Data Requirements

*   **User Accounts:** Multiple test user accounts via Clerk/NextAuth, configured with different `preferred_language` in their Supabase `UserProfile` (e.g., 'en', 'hi', 'mr'). At least one account per supported language.
*   **Crop Types:** Pre-populated `CropType` table in Supabase with sample crops and their localized names/units (e.g., Wheat/गेहूँ/गहू, Rice/चावल/तांदूळ). Include `crop_type_id`, `name_en`, `name_hi`, `name_mr`, `default_unit_en`, `default_unit_hi`, `default_unit_mr`.
*   **Market Locations:** Pre-populated `MarketLocation` table in Supabase with sample locations and their localized names (e.g., Mumbai APMC/मुंबई एपीएमसी/मुंबई एपीएमसी, Delhi Azadpur Mandi/दिल्ली आजादपुर मंडी/दिल्ली आझादपूर मंडी). Include `market_location_id`, `name_en`, `name_hi`, `name_mr`, `district`, `state`.
*   **Market Price Data:** Pre-populated `MarketPriceData` table (or mock API responses) with sample prices for various `crop_type_id`/`market_location_id` combinations and `date_recorded`. Include scenarios with missing data for specific combinations.
*   **Produce Listings:** Test data will be generated during testing (creating new listings). Some initial listings created by different test users might be helpful for browsing tests.
*   **Invalid Data:** Data sets for negative testing (e.g., empty quantity, non-numeric price, price with incorrect currency symbol, excessively long description).

## 6. Test Cases

*(Note: This is a representative sample. A full test suite will require more detailed cases, including edge cases, boundary values, and specific checks for each supported language.)*

