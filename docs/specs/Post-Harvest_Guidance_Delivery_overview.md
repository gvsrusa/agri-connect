# Feature Overview Specification: Post-Harvest Guidance Delivery

**Version:** 1.0
**Date:** 2025-05-12

## 1. Introduction & Goal

This document outlines the specification for the **Post-Harvest Guidance Delivery** feature within the AgriConnect application. The primary goal is to provide farmers with accessible, language-specific guidance on post-harvest handling and storage practices to minimize crop losses, mirroring the functionality and structure of the existing Crop Advisory feature where applicable.

## 2. User Stories

*   **US1:** As a farmer, I want to easily find and read guidance articles or checklists about storing my specific harvested crops, so that I can reduce spoilage and maximize my yield's value.
*   **US2:** As a farmer with low literacy, I want the post-harvest guidance presented with minimal text, clear icons, and in my preferred local language, so that I can understand and apply the recommended practices effectively.

## 3. Acceptance Criteria

*   **AC1.1 (for US1):** Users can navigate to a dedicated "Post-Harvest Guidance" section within the application.
*   **AC1.2 (for US1):** Guidance content (articles/checklists) is available and categorized logically (e.g., by crop type or practice).
*   **AC1.3 (for US1 & US2):** Content is displayed in the user's selected language (based on their profile settings).
*   **AC2.1 (for US2):** Guidance content presentation prioritizes visual elements (icons, simple images, checklists) over dense text.
*   **AC2.2 (for US2):** The interface for accessing and viewing guidance is intuitive and requires minimal steps.

## 4. Functional Requirements

### 4.1. Content Structure & Data Model (Supabase)

*   **Leverage Crop Advisory Structure:** The data model should closely follow the structure established for Crop Advisory content to ensure consistency and potentially reuse backend logic/components.
*   **Tables:**
    *   `post_harvest_topics` (or similar): Stores guidance categories (e.g., "Rice Storage", "Vegetable Handling"). Columns: `id`, `topic_key` (for linking), potentially `icon_url`.
    *   `post_harvest_content` (or similar): Stores the actual guidance articles/checklists. Columns: `id`, `topic_id` (FK to `post_harvest_topics`), `language_code` (e.g., 'en', 'hi', 'ta'), `title`, `content` (Markdown or structured format suitable for checklists/simple articles), `version`, `created_at`, `updated_at`.
*   **Multi-Language Support:** The `post_harvest_content` table uses `language_code` to store different language versions of the same guidance item, linked by `topic_id`.

### 4.2. User Flow

1.  User logs into AgriConnect.
2.  User navigates to the "Guidance" or "Learn" section (exact navigation TBD).
3.  User selects "Post-Harvest Guidance".
4.  User sees a list of available guidance topics/categories.
5.  User selects a topic.
6.  The application retrieves and displays the relevant guidance content (article/checklist) in the user's selected language.

### 4.3. Content Display

*   **Format:** Content should be presented as simple articles or step-by-step checklists.
*   **Language:** Content must be displayed in the language specified in the user's profile settings. The system must fetch the corresponding `language_code` version from `post_harvest_content`.
*   **Visuals:** Incorporate intuitive icons and potentially simple illustrations to aid understanding, especially for low-literacy users. Use clear headings and short paragraphs/list items.
*   **Responsiveness:** Display must be optimized for various screen sizes.

### 4.4. Multi-Language Handling

*   The backend API endpoint responsible for fetching guidance content must accept the user's preferred language code as a parameter.
*   The query to Supabase should filter the `post_harvest_content` table based on both the selected `topic_id` and the user's `language_code`.
*   A fallback mechanism (e.g., default to English or Hindi) should be considered if content is not available in the user's selected language (though the goal is full translation). UI localization strings (labels, buttons) are handled separately via standard localization practices (PRD Ref: 35).

## 5. Non-Functional Requirements

*   **Accessibility:** Design must adhere to accessibility guidelines, focusing on simplicity, clear visual hierarchy, sufficient contrast, and minimal reliance on complex text (PRD Ref: 48).
*   **Offline Caching:** Implement basic client-side caching (e.g., using browser storage or PWA capabilities) to allow users to view previously accessed guidance content when offline. Cache should store content in the language it was viewed in (PRD Ref: 37). Cache validity and size limits need consideration.
*   **Data Storage:** All guidance content and structure will be stored in the project's Supabase PostgreSQL database (PRD Ref: 36).
*   **Performance:** Content loading should be reasonably fast, especially on mobile networks.

## 6. Scope

### 6.1. In Scope

*   Creating the necessary Supabase tables for storing multi-language post-harvest guidance.
*   Developing the UI components to display guidance topics and content (articles/checklists).
*   Implementing the logic to fetch and display content based on user's selected language.
*   Basic client-side caching for offline viewing of previously accessed content.
*   Ensuring the UI is simple, intuitive, and accessible.

### 6.2. Out of Scope

*   Content creation/management interface for administrators.
*   User-generated content or comments on guidance.
*   Advanced offline synchronization or downloading features.
*   Integration with external content sources.
*   Real-time updates or notifications about new guidance.

## 7. Dependencies

*   **Authentication System (Clerk/NextAuth):** Required to identify the user and retrieve their profile settings (especially language preference).
*   **User Profile Management:** A mechanism must exist to store and retrieve the user's preferred language.
*   **Crop Advisory Feature:** Potential reuse of data models, backend logic, or UI components. [`docs/architecture/Crop_Advisory_Content_Delivery_architecture.md`](docs/architecture/Crop_Advisory_Content_Delivery_architecture.md) should be reviewed.
*   **Localization Infrastructure:** Existing system for managing UI strings in multiple languages.

## 8. UI/UX Considerations

*   **Simplicity:** Prioritize a clean, uncluttered interface. Avoid jargon.
*   **Navigation:** Ensure easy discovery of the Post-Harvest Guidance section and clear navigation between topics and content.
*   **Visual Aids:** Use icons consistently and effectively to represent topics and actions. Checklists should be visually distinct and easy to follow.
*   **Readability:** Use legible fonts, appropriate font sizes, and sufficient white space.

## 9. API Design Notes (High-Level)

*   **`/api/post-harvest/topics`:** GET endpoint to retrieve a list of available guidance topics (potentially with icons).
*   **`/api/post-harvest/content?topicId={id}&lang={code}`:** GET endpoint to retrieve specific guidance content for a given topic ID and language code.