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

## 2. Database Related

### 2.1. Simulated Database Error Handling in Tests

*   **Context:** For the Marketplace & Price Discovery feature, API tests for the `/api/listings` route include scenarios for simulated database errors (e.g., connection failures, query errors).
*   **Status:** These tests, located in [`__tests__/features/marketplace-price-discovery/api/listings.api.test.ts`](../__tests__/features/marketplace-price-discovery/api/listings.api.test.ts), have been confirmed to be robust. They effectively mock the Prisma client and verify that the API route's error handling logic (e.g., returning 500 status codes) functions as expected.
*   **Implication:** This provides confidence in the API's resilience to backend database issues, assuming the actual database errors are caught and propagated in a way that the mock simulates. For actual runtime database issues, refer to standard debugging practices (checking connection strings, database logs, Prisma client status).
*   **Relevant Files:**
    *   [`__tests__/features/marketplace-price-discovery/api/listings.api.test.ts`](../__tests__/features/marketplace-price-discovery/api/listings.api.test.ts)
    *   [`docs/architecture/Marketplace_Price_Discovery_architecture.md`](architecture/Marketplace_Price_Discovery_architecture.md) (Section 11.2)