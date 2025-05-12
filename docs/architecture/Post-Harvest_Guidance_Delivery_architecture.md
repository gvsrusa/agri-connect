# High-Level Architecture: Post-Harvest Guidance Delivery

**Version:** 1.0
**Date:** 2025-05-12

## 1. Overview

This document outlines the high-level architecture for the **Post-Harvest Guidance Delivery** module within the AgriConnect application. It is based on the [Feature Overview Specification](docs/specs/Post-Harvest_Guidance_Delivery_overview.md:1) and leverages the existing project technology stack (Next.js, Supabase, Clerk/NextAuth, Tailwind CSS) and the established [Authentication & User Profile Management Architecture](docs/architecture/Authentication_UserProfile_Management_architecture.md:1).

The primary goal is to provide farmers with accessible, multilingual guidance on post-harvest practices (handling, storage) via the Next.js web application. Content will be retrieved from Supabase, structured to support multiple languages, and filtered based on the user's selected language preference obtained from their profile.

**Key Design Principle:** This module is functionally very similar to the [Crop Advisory Content Delivery Module](docs/architecture/Crop_Advisory_Content_Delivery_architecture.md:1). Therefore, its architecture closely mirrors the Crop Advisory module's design to ensure consistency, promote code reuse, and leverage established patterns for component structure, API design, data flow, database schema, multi-language handling, and caching.

## 2. Technology Stack (Reference)

The module will utilize the existing project technology stack:

*   **Frontend:** Next.js (React)
*   **Backend API:** Next.js API Routes
*   **Database:** Supabase (PostgreSQL)
*   **Authentication:** Clerk/NextAuth (via [`docs/architecture/Authentication_UserProfile_Management_architecture.md`](docs/architecture/Authentication_UserProfile_Management_architecture.md))
*   **Styling:** Tailwind CSS
*   **Internationalization:** Assumed `next-intl` or similar (consistent with project setup)

## 3. Component Breakdown (Frontend - Next.js/React)

Following the pattern of the Crop Advisory module, the frontend components will be structured similarly:

*   **`GuidanceLayout`:** (Server Component) A layout component wrapping guidance pages, potentially handling common data fetching or context setup.
*   **`GuidanceListPage`:** (Server Component) Displays the list of available post-harvest guidance topics, fetched server-side using the user's language preference for localized titles. Likely resides at a route like `/guidance/post-harvest`.
*   **`GuidanceTopicCard`:** (Client or Server Component) Renders a single guidance topic in the list (localized title, icon). Handles navigation to the detail page.
*   **`GuidanceDetailPage`:** (Server Component initially, potentially Client for caching) Displays the detailed content (article/checklist) for a selected guidance topic. Fetches content server-side based on the topic slug and user language. Resides at a route like `/guidance/post-harvest/{topic_slug}`. Client-side logic will handle caching.
*   **`GuidanceContentRenderer`:** (Client or Server Component) Takes the structured content items (fetched for a specific topic and language) and renders them appropriately (e.g., headings, paragraphs, checklists, images).

## 4. API Design (Next.js API Routes)

API endpoints, secured via authentication middleware, will fetch guidance data from Supabase, mirroring the Crop Advisory API structure:

*   **`GET /api/post-harvest/topics`:**
    *   **Action:** Fetches a list of guidance topics with titles and slugs localized to the user's preferred language.
    *   **Auth:** Requires authenticated user session.
    *   **Query Params:** `lang` (e.g., `hi`, `en`) - Specifies the language for topic titles. Derived server-side from user profile or passed explicitly.
    *   **Logic:** Retrieves user language. Queries Supabase, joining `post_harvest_topics` and `post_harvest_topic_translations` filtered by the language code. Selects `slug`, `icon_url`, and the localized `title`.
    *   **Response:** JSON array of topic objects `{ slug: string, title: string, icon_url: string | null }`.
*   **`GET /api/post-harvest/content/{topic_slug}`:**
    *   **Action:** Fetches the structured, localized content items for a specific guidance topic.
    *   **Auth:** Requires authenticated user session.
    *   **Path Params:** `topic_slug` (e.g., `rice-storage-methods`).
    *   **Query Params:** `lang` (e.g., `hi`, `en`) - Specifies the language for the content. Derived server-side from user profile or passed explicitly.
    *   **Logic:** Retrieves user language. Finds `topic_id` from `topic_slug`. Queries Supabase, joining `post_harvest_content_items` and `post_harvest_content_translations` filtered by `topic_id` and `language_code`. Selects `item_type`, `order_index`, localized `text_content`, and `media_url`. Orders by `order_index`. Also fetches the localized topic title.
    *   **Response:** JSON object containing topic title and an array of content items: `{ title: string, content: [{ item_type: string, order_index: number, text_content: string | null, media_url: string | null }] }`.

## 5. Data Flow

The data flow mirrors the Crop Advisory module:

1.  **User Login & Language:** User logs in; language preference is available via Auth/Profile.
2.  **Navigate to Guidance:** User accesses the `/guidance/post-harvest` route.
3.  **Fetch Topic List:** `GuidanceListPage` determines user language and requests `GET /api/post-harvest/topics?lang={userLang}`.
4.  **API Fetches Topics:** API queries Supabase for localized topics.
5.  **Render Topic List:** API returns list; `GuidanceListPage` renders `GuidanceTopicCard`s.
6.  **Select Topic:** User clicks a card, navigating to `/guidance/post-harvest/{topic_slug}`.
7.  **Fetch Topic Content:** `GuidanceDetailPage` requests `GET /api/post-harvest/content/{topic_slug}?lang={userLang}`.
8.  **API Fetches Content:** API queries Supabase for localized, structured content items.
9.  **Render Content:** API returns content; `GuidanceDetailPage` uses `GuidanceContentRenderer`.
10. **Caching (Client-Side):** On successful load, `GuidanceDetailPage` client-side logic stores the fetched content in `localStorage` keyed by `guidance-{topic_slug}-{userLang}`.
11. **Offline View:** If offline, `GuidanceDetailPage` attempts to load from cache; otherwise shows offline message.

## 6. Database Schema (Supabase)

To maintain consistency with the Crop Advisory module and enable robust multi-language support, the following schema (closely mirroring the Crop Advisory schema) is adopted. This refines the initial suggestion in the spec ([`docs/specs/Post-Harvest_Guidance_Delivery_overview.md:27`](docs/specs/Post-Harvest_Guidance_Delivery_overview.md:27)) for better alignment and reusability.

*   `languages` (`code` PK, `name`) - *Existing/Shared Table*
*   `post_harvest_topics` (`id` PK SERIAL, `slug` TEXT UNIQUE NOT NULL, `icon_url` TEXT, `created_at` TIMESTAMPTZ DEFAULT now(), `updated_at` TIMESTAMPTZ)
*   `post_harvest_topic_translations` (`topic_id` INT REFERENCES `post_harvest_topics`(id) ON DELETE CASCADE, `language_code` TEXT REFERENCES `languages`(code), `title` TEXT NOT NULL, PRIMARY KEY (`topic_id`, `language_code`))
*   `post_harvest_content_items` (`id` PK SERIAL, `topic_id` INT REFERENCES `post_harvest_topics`(id) ON DELETE CASCADE, `item_type` TEXT NOT NULL, `order_index` INT NOT NULL, `created_at` TIMESTAMPTZ DEFAULT now(), `updated_at` TIMESTAMPTZ)
*   `post_harvest_content_translations` (`content_item_id` INT REFERENCES `post_harvest_content_items`(id) ON DELETE CASCADE, `language_code` TEXT REFERENCES `languages`(code), `text_content` TEXT, `media_url` TEXT, PRIMARY KEY (`content_item_id`, `language_code`))

**Indexing:** Similar indexing strategies as the Crop Advisory tables should be applied (PKs, FKs, `slug`, composite indexes on `topic_id`/`language_code`, `content_item_id`/`language_code`, `topic_id`/`order_index`).
**RLS:** Row Level Security policies should be implemented consistent with other content tables (e.g., public read, restricted write).

## 7. Multi-Language Content Retrieval Strategy

The strategy directly mirrors the Crop Advisory module:

1.  **Identify Language:** Determine required `lang` code from the authenticated user's profile or explicit query parameter, with a defined fallback (e.g., 'en').
2.  **API Parameter:** Pass `lang` code to API endpoints (`/api/post-harvest/*`).
3.  **Supabase Query:** API handlers use `lang` in `JOIN` conditions between base tables (`post_harvest_topics`, `post_harvest_content_items`) and their translation tables (`..._translations`) filtering `WHERE language_code = {lang}`.
4.  **Data Selection:** `SELECT` necessary base fields and localized fields from translation tables.
5.  **Fallback:** Use `LEFT JOIN` and `COALESCE` in queries to handle missing translations gracefully, potentially falling back to a default language.

## 8. Caching Strategy (Client-Side)

A simple client-side caching mechanism will be implemented for limited offline access, mirroring the Crop Advisory strategy:

*   **Mechanism:** Browser `localStorage`.
*   **Trigger:** Cache data upon successful fetch in `GuidanceDetailPage`.
*   **Cache Key:** `guidance-{topic_slug}-{lang}`.
*   **Data Stored:** JSON response from the content API endpoint (`/api/post-harvest/content/...`).
*   **Retrieval:** Check network status; if offline, load from cache; if online, fetch fresh data and update cache.
*   **Invalidation:** Overwrite on subsequent online views. Time-based or `updated_at` checks are future considerations.

## 9. Dependencies

*   **Authentication & User Profile Module:** ([`docs/architecture/Authentication_UserProfile_Management_architecture.md`](docs/architecture/Authentication_UserProfile_Management_architecture.md)) - For user identity and language preference.
*   **Supabase:** Database and client library (`@supabase/supabase-js`).
*   **Next.js:** Core framework.
*   **React:** UI library.
*   **Internationalization Library:** (e.g., `next-intl`) For UI strings and locale context.
*   **Clerk/NextAuth:** Authentication state.
*   **Tailwind CSS:** Styling.

## 10. Security Considerations

Standard security practices, consistent with the Crop Advisory module, apply:

*   **API Protection:** Secure all `/api/post-harvest/*` routes using authentication middleware.
*   **Data Access (RLS):** Configure Supabase Row Level Security on `post_harvest_*` tables for appropriate read/write access control.
*   **Input Validation:** Sanitize and validate API route parameters (`topic_slug`, `lang`).