# High-Level Architecture: Language Switching Mechanism

**Version:** 1.0
**Date:** 2025-05-12

## 1. Overview

This document outlines the high-level architecture for the Language Switching Mechanism in the AgriConnect application. It enables users to select their preferred language for the UI and persists this preference. This architecture builds upon the [Feature Overview Specification](docs/specs/Language_Switching_Mechanism_overview.md:1) and integrates with the existing [Authentication & User Profile Management Architecture](docs/architecture/Authentication_UserProfile_Management_architecture.md:1).

The core goals are to provide an intuitive language selection interface, integrate seamlessly with Next.js using a robust internationalization (i18n) library, persist preferences appropriately for guest and logged-in users, and establish a clear logic for determining the active locale.

## 2. Technology Stack & Key Choices

*   **Frontend:** Next.js (React)
*   **i18n Library:** **`next-intl`** (Recommended based on its strong integration with Next.js App Router and prior mention in [`docs/architecture/Authentication_UserProfile_Management_architecture.md:19`](docs/architecture/Authentication_UserProfile_Management_architecture.md:19)).
*   **Routing Strategy:** **Path-based locale routing** (e.g., `/en/dashboard`, `/hi/dashboard`). This is the standard and recommended approach for `next-intl` with the App Router, providing clear URL-based locale identification.
*   **Persistence:** Cookie (`NEXT_LOCALE`) and Supabase `user_profiles` table.
*   **API:** Existing Next.js API Routes / Server Actions defined in Auth architecture.
*   **Authentication:** Clerk/NextAuth (as per project mandate).
*   **Database:** Supabase (as per project mandate).

## 3. Architectural Approach

The architecture leverages `next-intl` for managing translations and locale handling within the Next.js App Router environment.

1.  **Middleware:** `next-intl` middleware will be used to detect the user's desired locale based on a defined priority order (URL path, user profile, cookie, headers).
2.  **Path-based Routing:** Locales will be included in the URL path (e.g., `/en`, `/hi`). Navigation between languages will involve changing the locale segment in the path.
3.  **Global Provider:** A `NextIntlClientProvider` will wrap the application layout, providing translation messages and locale context to client components.
4.  **Server Components:** Server components will access locale information and load messages server-side using `next-intl`'s server functions.
5.  **Client Components:** Client components will use `next-intl` hooks (e.g., `useTranslations`, `useLocale`) to access translations and the current locale.

## 4. Component Breakdown (Frontend - Next.js/React)

*   **`LanguageSelector` (Client Component):**
    *   **Responsibility:** Displays the list of available languages (fetched dynamically or configured statically) and allows the user to select one. Likely implemented as a dropdown menu, placed in a shared layout component (e.g., Header or Footer).
    *   **Interaction:** On selection, it constructs the new path with the selected locale and uses standard `next/navigation` utilities (e.g., `router.push()` from `next/navigation`). The `next-intl` middleware subsequently processes this path-based locale, and `next-intl`'s mechanisms are responsible for cookie updates. If the user is logged in, it also triggers an asynchronous API call to update the user's profile.
*   **Shared Layout Component (Server Component - e.g., `RootLayout`):**
    *   **Responsibility:** Integrates the `NextIntlClientProvider`, fetching the appropriate locale and messages server-side based on the middleware's detection. Includes the `LanguageSelector` component.

## 5. Internationalization (i18n) Library Integration (`next-intl`)

*   **Configuration:** Set up `next-intl` according to its documentation, defining supported locales (e.g., `['en', 'hi', 'mr', 'te', 'ta', 'kn', 'ml', 'pa']`) and the default locale ('en').
*   **Middleware (`middleware.ts`):** Implement `next-intl` middleware to handle locale detection from the request (path, cookie, headers) and redirect/rewrite requests to include the locale prefix. This middleware is crucial for determining the active locale.
*   **Translation Files:** Store translations in structured JSON files per locale (e.g., `messages/en.json`, `messages/hi.json`).
*   **Provider Setup (`layout.tsx`):** Fetch locale and messages server-side using `getLocale` and `getMessages` from `next-intl/server` and configure `NextIntlClientProvider` as shown in [`docs/architecture/Authentication_UserProfile_Management_architecture.md:115`](docs/architecture/Authentication_UserProfile_Management_architecture.md:115).
*   **Usage in Components:** Use `useTranslations` hook in Client Components and `getTranslator` in Server Components to access translated strings.

## 6. Locale Determination Logic (Priority Order - Implemented in Middleware)

The active locale for a request will be determined in the following order:

1.  **URL Path:** Check if a supported locale prefix exists in the URL path (e.g., `/hi/some-page`). This takes highest priority.
2.  **Logged-in User Profile (Server-Side Check):** If no locale in path, and the user is authenticated (checked via Clerk/NextAuth helpers), attempt to fetch the `preferred_language` from the Supabase `user_profiles` table ([`docs/architecture/Authentication_UserProfile_Management_architecture.md:83`](docs/architecture/Authentication_UserProfile_Management_architecture.md:83)). This requires careful integration within the middleware or initial server-side rendering logic.
3.  **Locale Cookie:** Check for a valid locale value in the `NEXT_LOCALE` cookie (or the cookie configured by `next-intl`).
4.  **`Accept-Language` Header:** Parse the browser's `Accept-Language` header and match against supported locales.
5.  **Default Locale:** Fallback to the default locale (e.g., 'en') if none of the above yield a supported locale.

The middleware will then redirect or rewrite the URL to include the determined locale prefix.

## 7. Language Persistence Strategy

*   **Guest Users / Session Persistence:** The selected language locale will be persisted primarily via the **`NEXT_LOCALE` cookie**, automatically managed by `next-intl`'s middleware and navigation functions when the locale path changes. This ensures consistency within the session.
*   **Logged-in Users:**
    1.  **Cookie:** The `NEXT_LOCALE` cookie is still set for immediate session consistency.
    2.  **Supabase Profile:** When a logged-in user changes the language via the `LanguageSelector`, an asynchronous `PUT` request is made to the existing `/api/user/profile` endpoint (defined in [`docs/architecture/Authentication_UserProfile_Management_architecture.md:39`](docs/architecture/Authentication_UserProfile_Management_architecture.md:39)) to update the `preferred_language` field in their `user_profiles` record. The request body should include `{ "preferred_language": "new_locale_code" }`.
    3.  **Loading Preference:** On subsequent visits/logins, the Locale Determination Logic (Step 2) will prioritize fetching this preference from the profile.

## 8. Data Flow (Language Change)

1.  **User Action:** User clicks on a language (e.g., "हिन्दी") in the `LanguageSelector` component.
2.  **Client-Side:**
    *   The `LanguageSelector` component's event handler is triggered.
    *   It constructs the new path with the selected locale (e.g., `/${newLocale}/${currentPathWithoutLocale}`) and uses standard `next/navigation` utilities (e.g., `router.push(newPath)` from `next/navigation`) to navigate. The `next-intl` middleware subsequently processes this path-based locale, and `next-intl`'s mechanisms are responsible for cookie updates based on the path.
    *   *(If Logged In)*: Concurrently, it makes an asynchronous `PUT` request to `/api/user/profile` with the payload `{ "preferred_language": "hi" }`, using the user's authentication token (handled by Clerk/NextAuth).
3.  **API Call (If Logged In):**
    *   The `/api/user/profile` endpoint receives the request.
    *   It authenticates the user (via Clerk/NextAuth).
    *   It validates the payload.
    *   It updates the `preferred_language` field in the user's Supabase `user_profiles` record using the user's `clerk_user_id`.
    *   It returns a success/error response. (The frontend might show a subtle notification on success/failure).
4.  **Navigation & Rendering:**
    *   The browser navigates to the new URL (e.g., `/hi/current-page`).
    *   The request hits the Next.js server.
    *   The `next-intl` middleware intercepts the request, identifies the 'hi' locale from the path.
    *   Next.js renders the page:
        *   Server Components fetch translations for 'hi' using `getTranslator`.
        *   The `RootLayout` fetches 'hi' messages and configures `NextIntlClientProvider` with `locale='hi'`.
        *   Client Components render using the 'hi' locale context and translations provided by the `NextIntlClientProvider` and `useTranslations` hook.
5.  **Result:** The user sees the page rendered in Hindi.

## 9. Dependencies

*   **`next-intl`:** Core i18n library.
*   **`next`:** Version supporting App Router and Middleware.
*   **`react`, `react-dom`**
*   **`@clerk/nextjs`:** For authentication state and user ID retrieval.
*   **`@supabase/supabase-js`:** For interacting with the user profile database (within the API route).
*   **Authentication & User Profile Module:** Relies on the existence and functionality of the user profile API ([`PUT /api/user/profile`](docs/architecture/Authentication_UserProfile_Management_architecture.md:39)) and the `preferred_language` field in the `user_profiles` table ([`docs/architecture/Authentication_UserProfile_Management_architecture.md:83`](docs/architecture/Authentication_UserProfile_Management_architecture.md:83)).
*   **Shared UI Components:** Requires a global layout (Header/Footer) to place the `LanguageSelector`.

## 10. Testing Considerations & Jest Configuration

A `SyntaxError` related to ESM module processing by Jest for `next-intl` was encountered. This was resolved through the following modifications to the Jest setup:

*   **`jest.config.mjs`:**
    *   The `transformIgnorePatterns` array was updated to correctly process `next-intl` and other `next` related packages. Specifically, `"/node_modules/(?!next-intl|@next|next)/"` ensures that `next-intl` and `next` packages are transformed.
    *   The `testEnvironment` was set to `'jsdom'` to provide a browser-like environment for tests, which can be beneficial for components interacting with browser APIs, although not strictly required for this specific `next-intl` issue, it's a common good practice for React component testing.
*   **Component Refactoring for Testability:**
    *   The [`LanguageSwitcher.tsx`](components/LanguageSwitcher.tsx:1) component and its corresponding test file [`__tests__/components/LanguageSwitcher.test.tsx`](__tests__/components/LanguageSwitcher.test.tsx:1) were refactored.
    *   Due to complexities in mocking or setting up `next-intl`'s navigation context for Jest, the component was modified to use standard `next/navigation` hooks (`useRouter`, `usePathname`) for navigation. This simplified testing as standard Next.js navigation is more straightforward to mock or handle in Jest environments. The `next-intl` middleware remains responsible for handling the path-based locale changes triggered by these standard navigation actions.

These changes ensure that components using `next-intl` can be reliably tested with Jest, and that the `LanguageSwitcher` component itself is testable using standard Next.js testing practices.

### 10.1. JSDOM `fetch` Behavior and Absolute URLs

During testing of the [`LanguageSwitcher.tsx`](../../components/LanguageSwitcher.tsx:1) component, specifically its API call to update user preferences, a `TypeError: Only absolute URLs are supported` was encountered. This issue arose because the `fetch` call within the component used a relative URL (`/api/user-profile`), and the JSDOM test environment's `fetch` implementation required an absolute URL.

**Resolution:**
*   The `fetch` call in [`components/LanguageSwitcher.tsx`](../../components/LanguageSwitcher.tsx:1) was modified to construct an absolute URL by prepending `window.location.origin`.
*   The corresponding unit test in [`__tests__/components/LanguageSwitcher.test.tsx`](../../__tests__/components/LanguageSwitcher.test.tsx:1) was updated to mock or expect this absolute URL.

This adjustment ensures that API calls made via `fetch` within components behave correctly in the JSDOM testing environment. Developers should be mindful of this behavior when writing tests for components that make `fetch` requests.
## 10. Scalability & Maintainability

*   **Adding Languages:** Adding support for new languages primarily involves:
    1.  Adding the new locale code to the `next-intl` configuration.
    2.  Creating the corresponding translation file (e.g., `messages/newlang.json`).
    3.  Updating the `LanguageSelector` component to list the new language.
*   **Maintainability:** Centralized translation files (`messages/*.json`) make updates straightforward. Using `next-intl` provides a structured approach aligned with Next.js best practices.

## 11. Security Considerations

*   API calls to update user profiles are protected by the Authentication & User Profile module's security measures (Clerk/NextAuth authentication, RLS in Supabase).
*   No new security concerns are introduced specifically by the language switching mechanism itself, beyond ensuring the i18n library is kept up-to-date.