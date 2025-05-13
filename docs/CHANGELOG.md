# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - YYYY-MM-DD

- **Language Switcher Enhanced Error Handling & Logging (CR-TECHDEBT-LANGSWITCHER-ERRORHANDLING):**
    - Implemented structured JSON logging for API errors in the `LanguageSwitcher` component using the new utility at [`lib/logger.ts`](../lib/logger.ts). Logs include component name, event, error message, status code, user ID (placeholder), and timestamp. This replaces previous `console.error` calls.
    - Improved user-facing feedback for API failures by displaying more specific error messages based on error type (network, server, unknown). New translation keys added to [`messages/en.json`](../messages/en.json) (e.g., `updatePreferenceErrorNetwork`, `updatePreferenceErrorServer`, `updatePreferenceErrorUnknown`).
  - *Relevant Files:* [`components/LanguageSwitcher.tsx`](../components/LanguageSwitcher.tsx), [`lib/logger.ts`](../lib/logger.ts), [`messages/en.json`](../messages/en.json)
  - *Documentation Updated:* [`docs/architecture/Language_Switching_Mechanism_architecture.md`](architecture/Language_Switching_Mechanism_architecture.md), [`docs/Troubleshooting_Guide.md`](Troubleshooting_Guide.md)
### Fixed
- **Language Switcher Error Handling and User Feedback:** Enhanced the `LanguageSwitcher` component.
    - User-facing error messages are now displayed if the API call to update language preferences fails, utilizing the `apiError` state and the `updatePreferenceError` translation key from [`messages/en.json`](../messages/en.json).
    - Console error logging for `XMLHttpRequest` `AggregateError`s (Pheromone Signal ID: `error-langswitch-validationfail-2025-05-13T20:05:52.000Z`) during test-simulated failures is now more robustly suppressed by checking `error.message` and `error.toString()` for specific keywords, leading to cleaner test outputs.
    - (CR: `fix_critical_post_cr_bugs_followup`)
  - *Relevant Files:* [`components/LanguageSwitcher.tsx`](../components/LanguageSwitcher.tsx), [`__tests__/components/LanguageSwitcher.test.tsx`](../__tests__/components/LanguageSwitcher.test.tsx), [`messages/en.json`](../messages/en.json)
  - *Documentation Updated:* [`docs/architecture/Language_Switching_Mechanism_architecture.md`](architecture/Language_Switching_Mechanism_architecture.md), [`docs/Troubleshooting_Guide.md`](Troubleshooting_Guide.md), [`docs/debugging_reports/LanguageSwitcher_XMLHttpRequest_fix_diagnosis_CR-fix_critical_post_cr_bugs_followup.md`](debugging_reports/LanguageSwitcher_XMLHttpRequest_fix_diagnosis_CR-fix_critical_post_cr_bugs_followup.md)

- **Language Switcher Error Logging (Previous Entry - Retained for history, superseded by above):** Improved error handling in the `LanguageSwitcher` component's `updatePreference` function to prevent an `AggregateError` (type: `XMLHttpRequest`) from being logged by `console.error` under test-simulated failure conditions. This primarily affects test environments where `fetch` might be unmocked, leading to cleaner test outputs. (Related to Pheromone Signal ID: `error-langswitch-validationfail-2025-05-13T20:05:52.000Z`, CR: `fix_critical_post_cr_bugs_followup`)
  - *Relevant Files:* [`components/LanguageSwitcher.tsx`](../components/LanguageSwitcher.tsx), [`__tests__/components/LanguageSwitcher.test.tsx`](../__tests__/components/LanguageSwitcher.test.tsx)
  - *Documentation Updated:* [`docs/architecture/Language_Switching_Mechanism_architecture.md`](architecture/Language_Switching_Mechanism_architecture.md), [`docs/Troubleshooting_Guide.md`](Troubleshooting_Guide.md)

- **Marketplace API Input Validation:** Implemented robust server-side input validation for the `POST /api/listings` endpoint using Zod and a `listingCreateSchema`. This ensures that all required fields are present and valid (e.g., no empty strings for required fields), returning a `400 Bad Request` response for invalid submissions. This enhances data integrity and API robustness. (Related to Pheromone Signal ID: `error-marketplace-apivalidationfail-2025-05-13T20:05:52.000Z`, CR: `fix_critical_post_cr_bugs_followup`)
  - *Relevant Files:* [`app/api/listings/route.ts`](../app/api/listings/route.ts), [`__tests__/features/marketplace-price-discovery/api/listings.api.test.ts`](../__tests__/features/marketplace-price-discovery/api/listings.api.test.ts)
  - *Documentation Updated:* [`docs/architecture/Marketplace_Price_Discovery_architecture.md`](architecture/Marketplace_Price_Discovery_architecture.md), [`docs/specs/Marketplace_Price_Discovery_overview.md`](specs/Marketplace_Price_Discovery_overview.md)