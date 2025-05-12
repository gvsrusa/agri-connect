# Test Plan: Marketplace & Price Discovery

## 1. Introduction

### 1.1 Purpose
This document outlines the test plan for the "Marketplace & Price Discovery" feature of the AgriConnect application. The goal is to ensure the feature meets the specified requirements for functionality, usability, performance, and localization, as detailed in the Feature Overview Specification ([`docs/specs/Marketplace_Price_Discovery_overview.md`](docs/specs/Marketplace_Price_Discovery_overview.md)) and High-Level Architecture ([`docs/architecture/Marketplace_Price_Discovery_architecture.md`](docs/architecture/Marketplace_Price_Discovery_architecture.md)). This plan guides the testing activities, including scope, strategy, test cases, and required resources, supporting a Test-Driven Development (TDD) approach.

### 1.2 Feature Overview
The Marketplace & Price Discovery feature allows registered farmers to:
*   List their produce (crop type, quantity, price) for others to see.
*   Browse produce listings from other farmers.
*   Check current market prices for specific crops in nearby locations.
*   Use the feature in their preferred language.

The feature is built using Next.js, React, Tailwind CSS, Supabase (database), and Clerk (authentication), with a strong emphasis on simplicity and accessibility for low-literacy/low-tech users.

## 2. Scope

### 2.1 In Scope
Based on [`docs/specs/Marketplace_Price_Discovery_overview.md:68`](docs/specs/Marketplace_Price_Discovery_overview.md:68):
*   User Authentication checks (leveraging Clerk).
*   Creation of produce listings via a simple web form.
*   Storage and retrieval of listings from Supabase.
*   Displaying produce listings in a marketplace view.
*   Interface for selecting crop and market location to check prices.
*   Retrieval and display of market price data (assuming source/mechanism exists).
*   Full UI and data localization support (English, Hindi, Marathi initially).
*   User language preference persistence and application.
*   Basic form validation (client and server-side).
*   Responsiveness across mobile and desktop viewports.
*   Adherence to simplicity and low-bandwidth NFRs.
*   API endpoints testing (`/api/listings`, `/api/market-prices`, `/api/crops`, `/api/markets`).
*   Database interactions (via API routes) with Supabase tables (`ProduceListing`, `MarketPriceData`, `CropType`, `MarketLocation`, `UserProfile`).
*   Supabase Row Level Security (RLS) policy verification (basic checks).

### 2.2 Out of Scope
Based on [`docs/specs/Marketplace_Price_Discovery_overview.md:78`](docs/specs/Marketplace_Price_Discovery_overview.md:78):
*   End-to-end transaction/payment processing.
*   Direct user-to-user communication features.
*   Complex inventory management.
*   Advanced marketplace analytics/reporting.
*   User reviews or ratings.
*   Delivery/logistics coordination.
*   Bidding/auction mechanisms.
*   Testing the external Market Price Data Source itself (focus is on integration and display).
*   Exhaustive testing of Clerk authentication flows (covered by separate auth tests).
*   Load testing beyond basic performance checks.

## 3. Test Strategy

### 3.1 Testing Levels
A multi-layered testing approach will be employed:

*   **Unit Testing:** Focus on individual React components (`ProduceListingCard`, `CreateListingForm`, `PriceSearchForm`, `PriceDisplay`, etc.) and utility functions. Verify rendering, props handling, state changes, event handlers, and correct use of localization functions/hooks. Mock dependencies like API calls and global state.
*   **Integration Testing:** Test the interaction between frontend components, Next.js API routes, and mocked backend services (Supabase client, Clerk session). Verify data flow, API request/response handling, authentication checks within API routes, data transformation, and localization logic at the API level.
*   **End-to-End (E2E) Testing:** Simulate real user scenarios using a browser automation tool. Verify key user flows across different languages, including listing produce, browsing the marketplace, and checking prices. Validate UI elements, data display, and responsiveness.

### 3.2 Testing Approach
*   **Test-Driven Development (TDD):** Tests (primarily unit and integration) will be written *before* the corresponding feature code, guiding the implementation.
*   **Automation:** All unit and integration tests, and the majority of E2E tests, will be automated.
*   **Manual Testing:** Exploratory testing will be performed manually to catch usability issues, visual glitches, and edge cases not covered by automation, especially focusing on the low-literacy/low-tech user experience. Accessibility checks will also be performed manually or with assistive tools.
*   **Localization Testing:** Specific focus on verifying UI text, data display (crop names, market names, units, prices), and layout integrity across all supported languages (EN, HI, MR).
*   **Cross-Browser/Device Testing:** E2E tests will be run on major browsers (Chrome, Firefox) and simulated mobile viewports. Manual checks on representative physical devices if available.

### 3.3 Tools & Frameworks
*   **Unit/Integration Testing:** Jest, React Testing Library (RTL), MSW (Mock Service Worker) for API mocking.
*   **E2E Testing:** Playwright (preferred) or Cypress.
*   **Code Coverage:** Jest's built-in coverage reporting.
*   **CI/CD:** Tests will be integrated into the CI/CD pipeline (e.g., GitHub Actions) to run automatically on commits/pull requests.

## 4. Test Cases

*(Note: This section provides high-level test areas and example cases. Detailed test cases will be managed in the codebase alongside the tests themselves or in a separate test case management tool if adopted.)*

### 4.1 Unit Tests (Examples)

*   **`CreateListingForm` Component:**
    *   Verify form renders with correct labels in the selected language.
    *   Verify input fields accept valid data.
    *   Verify validation messages appear for invalid input (e.g., missing fields, potentially invalid formats if defined).
    *   Verify `onSubmit` handler is called with correct data on valid submission.
    *   Verify crop type dropdown is populated correctly (mocked data).
    *   Verify localization hook (`useTranslation`) is used correctly for labels/messages.
*   **`ProduceListingCard` Component:**
    *   Verify component renders correctly with sample listing data (props).
    *   Verify localized crop name, quantity, price, and date are displayed.
    *   Verify seller location (general) is displayed if provided.
*   **`PriceSearchForm` Component:**
    *   Verify form renders with localized labels.
    *   Verify crop type and market location selectors are populated (mocked data).
    *   Verify `onSubmit` handler is called with selected IDs.
*   **`PriceDisplay` Component:**
    *   Verify component renders correctly with sample price data.
    *   Verify localized crop name, market name, price, unit, and date are displayed.
    *   Verify "no data available" message is shown when appropriate.
*   **Localization Utilities:**
    *   Test functions responsible for fetching/formatting localized data (if any exist outside components/API).

### 4.2 Integration Tests (Examples)

*   **API Route: `POST /api/listings`:**
    *   Test successful listing creation with valid data and authenticated user (mock Clerk session, mock Supabase client `insert`).
    *   Test failure when user is unauthenticated (401/403).
    *   Test failure with invalid input data (e.g., missing `cropTypeId`) (400).
    *   Test failure if Supabase insert fails (500).
    *   Verify `seller_user_id` from session is correctly passed to Supabase.
*   **API Route: `GET /api/listings`:**
    *   Test successful retrieval of listings for authenticated user (mock Supabase client `select`).
    *   Test failure when user is unauthenticated.
    *   Test correct JOIN with `CropType` and retrieval of localized crop name based on user's `preferred_language` (mock session).
    *   Test pagination parameters (`page`, `limit`) if implemented.
    *   Test filtering (`cropTypeId`) if implemented.
*   **API Route: `GET /api/market-prices`:**
    *   Test successful retrieval of price data with valid `cropId`, `marketId`, and authenticated user.
    *   Test failure when user is unauthenticated.
    *   Test failure with missing/invalid query parameters.
    *   Test correct JOINs and retrieval of localized names/units based on user's language.
    *   Test scenario where no price data is found for the combination.
*   **API Routes: `GET /api/crops`, `GET /api/markets`:**
    *   Test successful retrieval of localized lists based on `lang` query parameter.
    *   Test failure when user is unauthenticated.
*   **Component <> API Interaction:**
    *   Test `CreateListingPage` successfully calls `POST /api/listings` (using MSW) and handles success/error responses.
    *   Test `MarketplacePage` successfully calls `GET /api/listings` (using MSW) and renders listings.
    *   Test `PriceDiscoveryPage` successfully calls `GET /api/market-prices` (using MSW) and displays results.

### 4.3 End-to-End Tests (Examples)

*   **E2E-1 (List Produce - Happy Path - English):**
    1.  Login as a test user (English preference).
    2.  Navigate to Marketplace.
    3.  Click "List Your Crop".
    4.  Fill form with valid data (Select Crop, Enter Quantity, Enter Price).
    5.  Submit form.
    6.  Verify success message appears in English.
    7.  Verify the new listing appears in the Marketplace view with correct English details.
    8.  Verify data is correctly stored in Supabase (manual check or helper script).
*   **E2E-2 (List Produce - Happy Path - Hindi):**
    1.  Login as a test user (Hindi preference).
    2.  Switch language to Hindi if not default.
    3.  Navigate to Marketplace (verify labels are in Hindi).
    4.  Click "List Your Crop" (verify button text in Hindi).
    5.  Fill form (verify labels/dropdowns in Hindi).
    6.  Submit form.
    7.  Verify success message appears in Hindi.
    8.  Verify the new listing appears in the Marketplace view with correct Hindi details (e.g., crop name).
*   **E2E-3 (List Produce - Validation Error):**
    1.  Login as a test user.
    2.  Navigate to "List Your Crop".
    3.  Attempt to submit the form with missing required fields.
    4.  Verify appropriate validation error messages appear in the user's selected language.
*   **E2E-4 (Browse Marketplace):**
    1.  Login as a test user (ensure some listings exist).
    2.  Navigate to Marketplace.
    3.  Verify listings are displayed with correct details (localized crop name, quantity, price).
    4.  Switch language.
    5.  Verify listings update with newly selected language's localized data (e.g., crop names).
*   **E2E-5 (Check Market Price - Happy Path):**
    1.  Login as a test user (ensure market price data exists).
    2.  Navigate to "Market Prices".
    3.  Select a crop and market location (verify selectors use localized names).
    4.  Click "Get Price".
    5.  Verify the correct price information is displayed in the user's selected language (including labels, crop/market names, units).
*   **E2E-6 (Check Market Price - No Data):**
    1.  Login as a test user.
    2.  Navigate to "Market Prices".
    3.  Select a crop/market combination known to have no data.
    4.  Click "Get Price".
    5.  Verify a "no data available" message is displayed in the user's selected language.
*   **E2E-7 (Responsiveness):**
    1.  Execute key flows (List, Browse, Check Price) on different viewport sizes (desktop, tablet, mobile).
    2.  Verify layout adjusts correctly and all elements are usable.
*   **E2E-8 (Language Persistence):**
    1. Login as a test user.
    2. Set language preference (e.g., Marathi).
    3. Navigate between Marketplace and Price Discovery pages.
    4. Log out and log back in.
    5. Verify the language preference (Marathi) is retained throughout the session and after re-login.

## 5. Test Data Requirements

*   **User Accounts (Clerk):** Multiple test accounts with different `preferred_language` settings ('en', 'hi', 'mr').
*   **Crop Types (Supabase `CropType` table):** Sample crops with names and units translated into all supported languages.
    *   Examples: Wheat (गेहूँ, गहू), Rice (चावल, तांदूळ), Onion (प्याज, कांदा) with units like quintal (क्विंटल, क्विंटल).
*   **Market Locations (Supabase `MarketLocation` table):** Sample markets with names translated.
    *   Examples: Mumbai APMC (मुंबई एपीएमसी, मुंबई एपीएमसी), Delhi Azadpur Mandi (दिल्ली आजादपुर मंडी, दिल्ली आझादपूर मंडी).
*   **Produce Listings (Supabase `ProduceListing` table):** Pre-populate with diverse listings (different crops, quantities, prices, sellers) for browsing tests. Include active/inactive listings if applicable later.
*   **Market Prices (Supabase `MarketPriceData` table):** Sample price data for various crop/market combinations and dates. Include scenarios with and without available data.
*   **Input Data:**
    *   Valid data for listing forms (various crops, quantities, prices).
    *   Invalid data (missing fields, potentially incorrect formats - although MVP uses text fields).
    *   Boundary value data (if numeric inputs had strict ranges).
    *   Data with special characters (if applicable, though less likely for MVP fields).

## 6. Test Environment

*   **Browsers:** Latest stable versions of Chrome, Firefox.
*   **Devices:** Desktop (standard resolution), Simulated Mobile (e.g., Chrome DevTools). Optional: Physical Android/iOS devices for manual checks.
*   **Backend:**
    *   Local development environment using Next.js dev server.
    *   Dedicated Supabase project for testing (or schema isolation in dev project).
    *   Clerk development instance with test user accounts.
*   **Tools:** Node.js, npm/yarn, Jest, RTL, Playwright/Cypress, Git.
*   **Network:** Simulate low-bandwidth conditions using browser developer tools for performance checks.
*   **Data Source:** Access to populated Supabase tables or mock data generation scripts. A mock/stub for the external market price data source might be needed for consistent testing if the real source is unavailable or unreliable during development.

## 7. Non-Functional Testing

*   **Usability/Accessibility:**
    *   Manual exploratory testing focusing on simplicity, clarity of icons/labels, ease of navigation for low-literacy users.
    *   Check for sufficient color contrast, keyboard navigation, and screen reader compatibility (basic checks).
*   **Performance:**
    *   Monitor page load times (LCP, FCP) using browser dev tools under simulated low-bandwidth conditions.
    *   Check API response times for `GET /api/listings` and `GET /api/market-prices`. Aim for acceptable responsiveness.
*   **Responsiveness:**
    *   Verify UI layout and functionality across different screen sizes (E2E tests and manual checks). Ensure no content overlap or broken elements.
*   **Security:**
    *   Verify input validation prevents unexpected data entry (manual and automated checks).
    *   Verify authentication is enforced on all relevant API routes (integration tests).
    *   Verify Supabase RLS policies prevent unauthorized data access (manual checks via Supabase UI/SQL, basic integration tests checking expected failures).
    *   Verify sensitive user data (e.g., contact info) is not displayed in public listings.

## 8. Requirements Traceability

*(This section maps test areas/cases back to requirements)*

| Requirement ID (from Spec) | Description                       | Test Level(s)        | Example Test Case(s) / Area                                     |
| :------------------------- | :-------------------------------- | :------------------- | :-------------------------------------------------------------- |
| US1 / AC1.1-1.3 / FR2.1-2.3 | List Produce                      | Unit, Integration, E2E | `CreateListingForm` tests, `POST /api/listings` tests, E2E-1, E2E-2, E2E-3 |
| US2 / AC2.1 / FR3.1-3.3     | Browse Marketplace                | Unit, Integration, E2E | `ProduceListingCard` tests, `GET /api/listings` tests, E2E-4      |
| US3 / AC3.1-3.2 / FR4.1-4.4 | Check Market Prices               | Unit, Integration, E2E | `PriceSearchForm`/`PriceDisplay` tests, `GET /api/market-prices` tests, E2E-5, E2E-6 |
| US4 / AC4.1 / FR5.1-5.4     | Language Switching & Support      | Unit, Integration, E2E | Localization hook usage, API localization logic, E2E-2, E2E-4, E2E-5, E2E-8 |
| FR1.1 / D1                | Authentication (via Clerk)        | Integration, E2E     | API route auth checks, Login steps in E2E tests                 |
| FR2.2 / D2                | Listing Storage (Supabase)        | Integration          | `POST /api/listings` tests (mocked Supabase)                    |
| FR4.3 / D3                | Price Data Retrieval (Source TBD) | Integration, E2E     | `GET /api/market-prices` tests, E2E-5, E2E-6                    |
| FR5.4 / D4                | Localization Infrastructure       | Unit, Integration    | `next-i18next` usage tests, API localization tests              |
| NFR1 (Simplicity)         | Usability                         | Manual, E2E          | Exploratory testing, E2E flow verification                    |
| NFR2 (Low Bandwidth)      | Performance                       | Manual               | DevTools network throttling checks                              |
| NFR3 (Responsiveness)     | Responsiveness                    | E2E, Manual          | E2E-7, Viewport checks                                          |
| NFR4 (Privacy)            | Security                          | E2E, Manual          | Verify no private data in listings, RLS checks                  |
| NFR5 (Data Integrity)     | Database Interaction              | Integration          | API tests verifying data handling (mocked DB)                   |
| NFR6 (Clean UI)           | UI/UX                             | E2E, Manual          | Visual checks across languages/viewports                        |
| NFR7 (Input Min.)         | Usability                         | Manual               | Review form complexity                                          |
| Arch: 3 (Components)      | Frontend Components               | Unit                 | Individual component tests                                      |
| Arch: 4 (API Design)      | API Routes                        | Integration          | API route tests (`/api/*`)                                      |
| Arch: 5 (Data Flow)       | Data Flow Verification            | Integration, E2E     | Component<>API tests, Full E2E scenarios                        |
| Arch: 6 (DB Schema/RLS)   | Database Interactions & Security  | Integration, Manual  | API tests (mocked DB), RLS policy verification                  |
| Arch: 7 (Multi-Lang)      | Localization Implementation       | Unit, Integration, E2E | Tests covering `next-i18next` and data localization             |
| Arch: 10 (Security)       | Security Measures                 | Integration, E2E     | Input validation, Auth checks, Privacy checks                   |

## 9. Entry/Exit Criteria

### 9.1 Entry Criteria
*   Feature specification ([`docs/specs/Marketplace_Price_Discovery_overview.md`](docs/specs/Marketplace_Price_Discovery_overview.md)) and architecture ([`docs/architecture/Marketplace_Price_Discovery_architecture.md`](docs/architecture/Marketplace_Price_Discovery_architecture.md)) are stable and approved.
*   Development environment (including Supabase, Clerk test setup) is ready.
*   Test tools (Jest, RTL, Playwright/Cypress) are configured in the project.
*   Required test data (or generation scripts) is available.
*   CI/CD pipeline is set up for automated test execution.

### 9.2 Exit Criteria
*   All planned unit, integration, and E2E tests are executed and passing.
*   Code coverage targets (e.g., >80% for unit/integration) are met.
*   All high-priority defects identified during testing are resolved and verified.
*   Manual exploratory testing is completed, and any critical usability/accessibility issues are addressed.
*   Requirements traceability confirms coverage of all in-scope requirements.
*   Test plan results are documented and reviewed.

## 10. Risks and Mitigation

| Risk                                       | Likelihood | Impact | Mitigation Strategy                                                                                                |
| :----------------------------------------- | :--------- | :----- | :----------------------------------------------------------------------------------------------------------------- |
| External Price Data Source unavailable/unreliable | Medium     | High   | Develop using a mock/stubbed price data source. Build resilience in the UI for missing data. Define clear error handling. |
| Localization errors (mistranslations, layout breaks) | Medium     | Medium | Use `next-i18next`. Thorough E2E testing across languages. Manual review by language speakers if possible. Responsive design practices. |
| Usability issues for low-literacy users    | Medium     | High   | Early and frequent manual testing focusing on simplicity. Use clear icons. Potentially involve target users in feedback sessions if feasible. |
| Performance issues on low bandwidth        | Low        | Medium | Optimize API responses and frontend assets. Test under simulated low-bandwidth conditions.                               |
| Supabase RLS misconfiguration              | Low        | High   | Careful implementation and review of RLS policies. Integration tests verifying access control. Manual checks in Supabase UI. |
| Inconsistent test data                     | Medium     | Medium | Use data generation scripts or well-defined seed data. Ensure test data covers required scenarios (languages, crops, markets). |