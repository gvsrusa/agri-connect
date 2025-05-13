# Troubleshooting Guide

This guide provides information on known issues, their causes, and resolutions encountered during the development and testing of the AgriConnect application.

## 1. Testing Environment Issues

### 1.1. `TypeError: Only absolute URLs are supported` in JSDOM `fetch`

*   **Context:** This error occurs when using `fetch` with relative URLs (e.g., `/api/some-endpoint`) within components being tested in a JSDOM environment (typically via Jest).
*   **Component Example:** [`components/LanguageSwitcher.tsx`](../components/LanguageSwitcher.tsx) making a `PUT` request to `/api/user-profile`.
*   **Cause:** The `fetch` implementation in JSDOM, as used in the testing setup, requires absolute URLs. It does not automatically resolve relative paths against a base URL like `http://localhost`.
*   **Resolution:**
    *   Modify the `fetch` call within the component to construct an absolute URL. This can be done by prepending `window.location.origin` to the relative path:
        ```typescript
        // Example in a component
        const response = await fetch(`${window.location.origin}/api/user-profile`, { /* ...options */ });
        ```
    *   Ensure corresponding unit tests (e.g., in [`__tests__/components/LanguageSwitcher.test.tsx`](../__tests__/components/LanguageSwitcher.test.tsx)) are updated to mock or expect the call with the absolute URL.
*   **Relevant Files:**
    *   [`components/LanguageSwitcher.tsx`](../components/LanguageSwitcher.tsx)
    *   [`__tests__/components/LanguageSwitcher.test.tsx`](../__tests__/components/LanguageSwitcher.test.tsx)
    *   [`docs/architecture/Language_Switching_Mechanism_architecture.md`](architecture/Language_Switching_Mechanism_architecture.md) (Section 10.1)

### 1.2. `TypeError: Response.json is not a function` in API Tests (Jest)

*   **Context:** This error was observed in API tests for the `/api/listings` route, specifically when Jest tests (e.g., [`__tests__/features/marketplace-price-discovery/api/listings.api.test.ts`](../__tests__/features/marketplace-price-discovery/api/listings.api.test.ts)) attempted to call `.json()` on the response object returned by the API route handler.
*   **Cause:** The issue was traced to interactions with `jest-fetch-mock` or the general Jest environment's handling of `NextResponse` objects from `next/server`.
*   **Resolution:**
    *   **Disable `jest-fetch-mock`:** In [`jest.setup.js`](../jest.setup.js), `jest-fetch-mock` was disabled by calling `fetchMock.disableMocks()`. This resolved the immediate `TypeError`.
    *   **Improve API Error Handling:** Error handling in the `POST` handler of [`app/api/listings/route.ts`](../app/api/listings/route.ts) was enhanced to more gracefully manage invalid JSON request bodies, ensuring a proper `NextResponse` with a 400 status code is returned.
*   **Recommendation:** Developers writing API tests should be cautious about potential conflicts with mocking libraries like `jest-fetch-mock` when dealing with `NextResponse` objects. Ensure robust error handling in API routes to always return valid `NextResponse` instances.
*   **Relevant Files:**
    *   [`app/api/listings/route.ts`](../app/api/listings/route.ts)
    *   [`__tests__/features/marketplace-price-discovery/api/listings.api.test.ts`](../__tests__/features/marketplace-price-discovery/api/listings.api.test.ts)
    *   [`jest.setup.js`](../jest.setup.js)
    *   [`docs/architecture/Marketplace_Price_Discovery_architecture.md`](architecture/Marketplace_Price_Discovery_architecture.md) (Section 11.1)

### 1.3. `[Error: AggregateError] { type: 'XMLHttpRequest' }` in `LanguageSwitcher` Tests

*   **Context:** This error was observed in tests for [`components/LanguageSwitcher.tsx`](../components/LanguageSwitcher.tsx) (e.g., in [`__tests__/components/LanguageSwitcher.test.tsx`](../__tests__/components/LanguageSwitcher.test.tsx)) when `fetch` calls to `/api/user-profile` were not mocked.
*   **Cause:** The JSDOM test environment attempts a real network request if `fetch` is not mocked. If the endpoint (e.g., `http://localhost/api/user-profile`) is not available during test execution, the `fetch` operation fails, leading to an `AggregateError` wrapping an `XMLHttpRequest` issue. This indicates a problem at the network request level.
*   **Resolution & Recent Improvements (CR `fix_critical_post_cr_bugs_followup`):**
    *   **Primary Resolution:** Mock `global.fetch` in the relevant tests to prevent actual network requests. The mock should simulate the expected API response (success or failure) as needed for the test case. This is the standard approach to avoid such errors during unit testing.
    *   Example of mocking `fetch` to resolve successfully:
        ```typescript
        // In your test file (e.g., __tests__/components/LanguageSwitcher.test.tsx)
        global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ message: 'Preference updated' }),
          })
        ) as jest.Mock;
        ```
    *   **Enhanced Error Handling, Logging, and User Feedback (CR `CR-TECHDEBT-LANGSWITCHER-ERRORHANDLING` & `fix_critical_post_cr_bugs_followup`):**
        *   **Improved User-Facing API Failure Feedback:** The [`LanguageSwitcher`](../components/LanguageSwitcher.tsx) component now displays more specific error messages to the user based on the type of API failure (e.g., network error, server error, unknown error). These messages use new translation keys from [`messages/en.json`](../messages/en.json) (e.g., `updatePreferenceErrorNetwork`, `updatePreferenceErrorServer`, `updatePreferenceErrorUnknown`).
        *   **Structured Error Logging:** API errors in the `LanguageSwitcher` are now logged using a structured JSON format via the new utility at [`lib/logger.ts`](../lib/logger.ts). This replaces previous `console.error` calls for these errors and includes details like component name, event, error message, status code, user ID (placeholder), and timestamp. This provides richer, more queryable error information.
    *   These changes are detailed in the comprehension report: [`docs/comprehension_reports/LanguageSwitcher_error_handling_analysis_CR-TECHDEBT-LANGSWITCHER-ERRORHANDLING.md`](comprehension_reports/LanguageSwitcher_error_handling_analysis_CR-TECHDEBT-LANGSWITCHER-ERRORHANDLING.md). Historical context for previous error handling iterations can be found in earlier reports like [`docs/comprehension_reports/LanguageSwitcher_XMLHttpRequest_error_analysis_CR-fix_critical_post_cr_bugs_followup.md`](comprehension_reports/LanguageSwitcher_XMLHttpRequest_error_analysis_CR-fix_critical_post_cr_bugs_followup.md).
*   **Relevant Files:**
    *   [`components/LanguageSwitcher.tsx`](../components/LanguageSwitcher.tsx)
    *   [`lib/logger.ts`](../lib/logger.ts)
    *   [`__tests__/components/LanguageSwitcher.test.tsx`](../__tests__/components/LanguageSwitcher.test.tsx)
    *   [`messages/en.json`](../messages/en.json)
    *   [`docs/comprehension_reports/LanguageSwitcher_error_handling_analysis_CR-TECHDEBT-LANGSWITCHER-ERRORHANDLING.md`](comprehension_reports/LanguageSwitcher_error_handling_analysis_CR-TECHDEBT-LANGSWITCHER-ERRORHANDLING.md)
    *   [`docs/debugging_reports/LanguageSwitcher_XMLHttpRequest_fix_diagnosis_CR-fix_critical_post_cr_bugs_followup.md`](debugging_reports/LanguageSwitcher_XMLHttpRequest_fix_diagnosis_CR-fix_critical_post_cr_bugs_followup.md) (for historical context)

## 2. Database Related

### 2.1. Simulated Database Error Handling in Tests

*   **Context:** For the Marketplace & Price Discovery feature, API tests for the `/api/listings` route include scenarios for simulated database errors (e.g., connection failures, query errors).
*   **Status:** These tests, located in [`__tests__/features/marketplace-price-discovery/api/listings.api.test.ts`](../__tests__/features/marketplace-price-discovery/api/listings.api.test.ts), have been confirmed to be robust. They effectively mock the Prisma client and verify that the API route's error handling logic (e.g., returning 500 status codes) functions as expected.
*   **Implication:** This provides confidence in the API's resilience to backend database issues, assuming the actual database errors are caught and propagated in a way that the mock simulates. For actual runtime database issues, refer to standard debugging practices (checking connection strings, database logs, Prisma client status).
*   **Relevant Files:**
    *   [`__tests__/features/marketplace-price-discovery/api/listings.api.test.ts`](../__tests__/features/marketplace-price-discovery/api/listings.api.test.ts)
    *   [`docs/architecture/Marketplace_Price_Discovery_architecture.md`](architecture/Marketplace_Price_Discovery_architecture.md) (Section 11.2)