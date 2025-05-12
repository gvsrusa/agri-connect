# Feature Overview Specification: Language Switching Mechanism

**1. Introduction**

This document outlines the specification for the Language Switching Mechanism feature in the AgriConnect application. This feature will allow users to select their preferred language for the application interface and content, enhancing accessibility and user experience for a diverse user base across India.

**2. User Stories**

*   **US01:** As a first-time visitor, I want to be prompted to select my preferred language or have it intelligently detected (e.g., from browser settings) so that I can use the application in a language I understand from the start.
*   **US02:** As a registered user, I want to be able to easily change my preferred language from the application settings so that my preference is saved for future sessions.
*   **US03:** As any user, I want the application interface (menus, buttons, labels, messages) to update immediately to my selected language so that I can continue navigating and using the application seamlessly.
*   **US04:** As a registered user, I want my language preference to be stored in my user profile so that it is consistently applied across different devices and sessions.
*   **US05:** As a user, I want to see an easily discoverable and intuitive language switcher (e.g., a dropdown in the header or footer) so I can change languages whenever needed.

**3. Acceptance Criteria**

*   **AC01:** Upon first visit, the application either prompts the user to select a language or defaults to a language based on browser settings/geo-location, with an option to change.
*   **AC02:** A language switcher UI element (e.g., dropdown) is clearly visible and accessible on all relevant pages (e.g., in the header or footer).
*   **AC03:** Selecting a language from the switcher immediately changes all UI text elements (labels, buttons, menus, static content) to the selected language without requiring a page reload if possible, or with a smooth transition.
*   **AC04:** The selected language preference persists throughout the user's current session (e.g., using cookies or local storage).
*   **AC05:** For logged-in users, the selected language preference is successfully saved to their Supabase user profile.
*   **AC06:** Upon subsequent logins, the application loads in the user's saved preferred language.
*   **AC07:** The application supports at least the initial set of languages: Hindi, Marathi, English, Telugu, Tamil, Kannada, Malayalam, and Punjabi.
*   **AC08:** The language switching mechanism integrates with a Next.js internationalization library (e.g., `next-intl` or `next-i18next`).
*   **AC09:** All localization strings for UI elements are correctly loaded and displayed for each supported language.

**4. Functional Requirements**

    **4.1. User Flow**

        **4.1.1. First-Time Visitor:**
            1. User visits AgriConnect for the first time.
            2. Application attempts to detect language from browser settings (e.g., `navigator.language`).
            3. If detection is successful and supported, the UI loads in that language. An unobtrusive notification allows changing the language.
            4. If detection is unsuccessful or the language is not supported, the application defaults to English and prominently displays a language selection prompt (e.g., a modal or a highly visible banner with a language dropdown).
            5. User selects a language from the prompt or the global language switcher.
            6. The UI immediately updates to the selected language.
            7. The selected language is stored locally (e.g., in a cookie or local storage) for the session.

        **4.1.2. Logged-In User / Returning Visitor (with preference set):**
            1. User visits AgriConnect.
            2. Application checks for a locally stored language preference.
            3. If logged in, application checks for language preference in the Supabase user profile. Profile preference overrides local if different.
            4. UI loads in the determined preferred language.
            5. User can change the language at any time using the global language switcher (e.g., dropdown in header/footer).
            6. Upon selection, the UI updates immediately.
            7. The new preference is stored locally for the session.
            8. If the user is logged in, the new preference is asynchronously updated in their Supabase user profile.

    **4.2. Language Switching Mechanism**

        **4.2.1. Language Persistence (Session):**
            *   The currently selected language will be stored in the browser's local storage or a cookie. This ensures that the language preference is maintained for the duration of the user's session, even for non-logged-in users or before a logged-in user's profile is updated.
            *   The key for storing the language could be `agriConnect-lang`.

        **4.2.2. Language Persistence (User Profile - Supabase):**
            *   For logged-in users, the language preference will be stored in a dedicated field (e.g., `preferred_language`) within their user profile table in Supabase. This is consistent with [`docs/architecture/Authentication_UserProfile_Management_architecture.md`](docs/architecture/Authentication_UserProfile_Management_architecture.md).
            *   When a logged-in user changes their language, an API call will be made to update this field in their Supabase profile. This update should ideally be asynchronous to avoid blocking UI interaction.

        **4.2.3. Language Application (Next.js):**
            *   The application will utilize a Next.js-compatible internationalization (i18n) library, such as `next-intl` or `next-i18next`.
            *   This library will manage loading and serving language-specific string resources (JSON files or similar).
            *   Next.js middleware or route handling will be used to detect the language preference (from URL path, cookie, or user profile) and set the appropriate locale for rendering pages and components.
            *   Components will use hooks or HOCs provided by the i18n library to access translated strings.

    **4.3. Initial Language Detection (First-Time Visitor)**

        1.  **Browser Settings:** The primary method will be to check the `Accept-Language` HTTP header or `navigator.language` / `navigator.languages` JavaScript properties. The application will attempt to match the browser's preferred language(s) against the list of supported languages.
        2.  **Default Language:** If the browser's language is not supported or cannot be reliably detected, the application will default to a predefined language (e.g., English).
        3.  **Explicit Choice:** Regardless of detection or default, a clear and immediate option to select/change the language will be provided to the first-time visitor.

**5. Non-Functional Requirements**

*   **NFR01 (Performance):** Language switching should be near-instantaneous, with minimal perceived lag. Loading language resources should not significantly impact initial page load times.
*   **NFR02 (Scalability):** The system should be able to easily accommodate adding new languages in the future with minimal code changes (primarily adding new translation files).
*   **NFR03 (Maintainability):** Localization strings should be managed in a structured and easily updatable format (e.g., JSON files per language).
*   **NFR04 (Usability):** The language switcher must be intuitive and easily discoverable for all users, regardless of technical proficiency.
*   **NFR05 (Consistency):** Once a language is selected, it must be consistently applied across all parts of the application UI.

**6. Scope**

    **6.1. In Scope:**
        *   Development of a UI component for language selection (e.g., dropdown).
        *   Integration of an i18n library (e.g., `next-intl` or `next-i18next`) with Next.js.
        *   Mechanism for detecting browser language for first-time visitors.
        *   Storing language preference in local storage/cookie for session persistence.
        *   Storing and retrieving language preference from the Supabase user profile for logged-in users.
        *   Translation of all static UI text elements (menus, buttons, labels, form fields, static informational text).
        *   Initial set of supported languages: Hindi, Marathi, English, Telugu, Tamil, Kannada, Malayalam, Punjabi.
        *   Updating the UI immediately upon language change.

    **6.2. Out of Scope (for this initial version):**
        *   Translation of dynamic user-generated content (e.g., marketplace listings, forum posts by users) unless explicitly stated otherwise for specific content types.
        *   Translation of complex content like PDF documents or embedded videos.
        *   Real-time, on-the-fly translation of content not already available in pre-translated strings.
        *   Language-specific URL routing (e.g., `/en/home`, `/hi/home`) unless deemed essential by the chosen i18n library's standard implementation. (To be decided during implementation based on library choice).
        *   Localization of date, time, and number formats (can be considered a follow-up enhancement if not easily supported by the chosen i18n library).
        *   Right-to-left (RTL) language support (e.g., Urdu, Arabic) unless specifically requested as part of the initial languages.

**7. Dependencies**

*   **D01 (Authentication & User Profile):** Relies on the authentication system (Clerk/NextAuth) and Supabase user profile management for storing and retrieving logged-in user language preferences. See [`docs/architecture/Authentication_UserProfile_Management_architecture.md`](docs/architecture/Authentication_UserProfile_Management_architecture.md).
*   **D02 (UI Components):** Requires a global UI layout (header/footer) where the language switcher can be placed.
*   **D03 (Localization Strings):** Requires the creation and maintenance of translation files (e.g., JSON) for all supported languages containing UI labels, button texts, messages, etc. (PRD Info 35).
*   **D04 (Next.js Framework):** The implementation will be within the Next.js framework.
*   **D05 (i18n Library):** Choice and integration of a suitable internationalization library (e.g., `next-intl`, `next-i18next`).

**8. UI/UX Considerations**

*   **Discoverability:** The language switcher must be easily found. Common placements include the top header or the page footer. An icon (e.g., globe icon) alongside text ("Language" or current language name) can improve recognition.
*   **Clarity:** The list of languages should be presented clearly, preferably in their native script alongside the English name (e.g., "हिन्दी (Hindi)", "English").
*   **Feedback:** Upon changing the language, the UI should update promptly. Visual feedback, though subtle, might be considered if the change involves a full page refresh.
*   **Accessibility:** The language switcher should be keyboard navigable and compatible with screen readers.
*   **Initial Prompt:** For first-time users, the language selection prompt should be clear, concise, and not overly intrusive, allowing them to quickly make a choice or dismiss it if the default is acceptable.

**9. API Design Notes (High-Level)**

*   **Endpoint:** `PUT /api/user/profile/language` (or similar, integrated with existing user profile update mechanisms).
*   **Request Body:**
    ```json
    {
      "languageCode": "hi" // e.g., ISO 639-1 code
    }
    ```
*   **Response:**
    *   Success (200 OK):
        ```json
        {
          "message": "Language preference updated successfully."
        }
        ```
    *   Error (e.g., 401 Unauthorized, 400 Bad Request for invalid language code, 500 Server Error).
*   This API will be called when a logged-in user changes their language preference via the UI switcher. The frontend will optimistically update the UI and then make this call.