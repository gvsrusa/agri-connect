# High-Level Architecture: Marketplace & Price Discovery Module

## 1. Overview

This document outlines the high-level architecture for the Marketplace & Price Discovery module within the AgriConnect application. It adheres to the project's constraints, including the Next.js/Supabase/Clerk/Tailwind stack, simplicity, low-bandwidth optimization, and multi-language support, focusing on the MVP scope (no direct transactions).

## 2. Architectural Goals Addressed

This design addresses the key architectural goals: component breakdown, conceptual API design, data flow, database schema refinement, multi-language integration, and dependency identification.

## 3. Frontend Components (Next.js/React)

The frontend will be structured using modular React components within the Next.js framework. Key components include:

*   **`MarketplacePage`**: The main container component responsible for fetching and displaying produce listings. It orchestrates the display of `ProduceListingCard` components.
*   **`ProduceListingCard`**: A presentational component displaying details of a single produce listing (crop type, quantity, price, potentially seller location). Receives data as props.
*   **`CreateListingPage` / `CreateListingForm`**: A page containing the form (`CreateListingForm`) for users to input details (crop type, quantity, price) for a new listing. Handles form state, validation, and submission.
*   **`PriceDiscoveryPage`**: The main container component for the market price checking feature. Hosts the `PriceSearchForm` and `PriceDisplay`.
*   **`PriceSearchForm`**: Contains input elements (e.g., dropdowns, search fields) for selecting crop type and market location. Triggers the price fetching process.
*   **`PriceDisplay`**: Displays the fetched market price information for the selected crop and market.
*   **`LanguageSwitcher`**: (Likely a shared/global component) Allows users to change their preferred language, updating application-wide state.
*   **State Management**: React Context API or a lightweight state manager (like Zustand or Jotai) will manage global state, particularly the user's selected language preference fetched from their profile.

## 4. API Design (Conceptual - Next.js API Routes)

Leveraging Next.js API routes for backend logic:

*   **`POST /api/listings`**:
    *   **Purpose**: Creates a new produce listing.
    *   **Auth**: Required (uses Clerk/NextAuth session).
    *   **Request Body**: `{ cropTypeId: string, quantity: string, pricePerUnit: string, description?: string }` (See note on validation below)
    *   **Validation**: Robust input validation is implemented using Zod via a `listingCreateSchema`. This ensures that all required fields are present and conform to expected data types and constraints (e.g., non-empty strings).
    *   **Response**:
        *   Success: `201 Created` with the created listing data.
        *   Error:
            *   `400 Bad Request`: If input validation fails (e.g., missing required fields, invalid data types). The response body will contain details about the validation errors.
            *   `401 Unauthorized`: If the user is not authenticated.
            *   `500 Internal Server Error`: For unexpected server-side issues.
*   **`GET /api/listings`**:
    *   **Purpose**: Fetches active produce listings.
    *   **Auth**: Required.
    *   **Query Params**: Optional pagination (`page`, `limit`), filtering (`cropTypeId`).
    *   **Response**: `{ listings: ProduceListing[], totalPages: number }` (Listings include localized crop names).
*   **`GET /api/market-prices`**:
    *   **Purpose**: Fetches the latest market price for a specific crop and market.
    *   **Auth**: Required.
    *   **Query Params**: `cropId={cropId}`, `marketId={marketId}`.
    *   **Response**: `{ priceData: MarketPriceData }` (Includes localized names/units).
*   **`GET /api/crops`**:
    *   **Purpose**: Fetches the list of available crop types for selection forms.
    *   **Auth**: Required.
    *   **Query Params**: `lang={languageCode}` (e.g., 'hi', 'en').
    *   **Response**: `{ crops: { id: string, name: string, defaultUnit: string }[] }` (Names/units localized based on `lang`).
*   **`GET /api/markets`**:
    *   **Purpose**: Fetches the list of available market locations for selection forms.
    *   **Auth**: Required.
    *   **Query Params**: `lang={languageCode}`.
    *   **Response**: `{ markets: { id: string, name: string }[] }` (Names localized based on `lang`).

## 5. Data Flow

*   **Listing Creation**:
    1.  User interacts with `CreateListingForm` (React Component).
    2.  On submit, component sends POST request to `/api/listings` (Next.js API Route).
    3.  API route validates input, retrieves `user_id` from Clerk/NextAuth session.
    4.  API route interacts with Supabase client to INSERT into `ProduceListing` table.
    5.  API route returns success/error to the frontend component.
    6.  Component displays confirmation/error message.
*   **Browsing Listings**:
    1.  User navigates to `MarketplacePage` (React Component).
    2.  Component sends GET request to `/api/listings`.
    3.  API route interacts with Supabase client to SELECT from `ProduceListing`, JOINing with `CropType` (for localized name based on user's language preference from session) and potentially `UserProfile`.
    4.  API route returns formatted listing data to the component.
    5.  Component renders `ProduceListingCard` components with the data.
*   **Checking Prices**:
    1.  User selects crop/market in `PriceSearchForm` (React Component).
    2.  Component sends GET request to `/api/market-prices` with query parameters.
    3.  API route interacts with Supabase client to SELECT latest entry from `MarketPriceData`, JOINing with `CropType` and `MarketLocation` for localized names/units based on user's language.
    4.  API route returns price data to the component.
    5.  Component updates `PriceDisplay` with the fetched data.

## 6. Database Schema Considerations (Supabase/PostgreSQL)

Based on [`docs/specs/Marketplace_Price_Discovery_overview.md:109`](docs/specs/Marketplace_Price_Discovery_overview.md:109), the following tables are proposed:

*   **`UserProfile`**: Managed partly by Clerk/NextAuth, extended in Supabase.
    *   `user_id` (PK, Text, references auth.users.id)
    *   `name` (Text)
    *   `farm_location_general` (Text, e.g., district)
    *   `preferred_language` (Text, e.g., 'en', 'hi', 'mr') - Crucial for localization.
    *   *(Other fields as needed)*
*   **`CropType`**: Stores standardized crop information and translations.
    *   `crop_type_id` (PK, UUID, default gen_random_uuid())
    *   `name_en` (Text), `name_hi` (Text), `name_mr` (Text), ...
    *   `default_unit_en` (Text), `default_unit_hi` (Text), `default_unit_mr` (Text), ...
*   **`MarketLocation`**: Stores standardized market locations and translations.
    *   `market_location_id` (PK, UUID, default gen_random_uuid())
    *   `name_en` (Text), `name_hi` (Text), `name_mr` (Text), ...
    *   `district` (Text), `state` (Text)
*   **`ProduceListing`**: Stores user-created listings.
    *   `listing_id` (PK, UUID, default gen_random_uuid())
    *   `seller_user_id` (FK references `UserProfile.user_id`, ON DELETE CASCADE)
    *   `crop_type_id` (FK references `CropType.crop_type_id`)
    *   `quantity` (Text) - Kept as text for MVP simplicity.
    *   `price_per_unit` (Text) - Kept as text for MVP simplicity.
    *   `description` (Text, nullable)
    *   `is_active` (Boolean, default true)
    *   `created_at` (TimestampTZ, default now())
    *   `updated_at` (TimestampTZ, default now())
*   **`MarketPriceData`**: Stores market price information (source TBD).
    *   `price_data_id` (PK, UUID, default gen_random_uuid())
    *   `crop_type_id` (FK references `CropType.crop_type_id`)
    *   `market_location_id` (FK references `MarketLocation.market_location_id`)
    *   `price` (Numeric)
    *   `currency` (Text, default 'INR')
    *   `unit` (Text) - e.g., 'quintal', potentially derived/validated against `CropType`.
    *   `date_recorded` (TimestampTZ)
    *   `source` (Text, nullable)
    *   `created_at` (TimestampTZ, default now())

**Row Level Security (RLS):** Implement RLS policies in Supabase to:
*   Ensure users can only read/write their own `UserProfile` data (except perhaps `preferred_language` which might be needed by APIs).
*   Allow authenticated users to read `ProduceListing`, `CropType`, `MarketLocation`, `MarketPriceData`.
*   Allow users to create `ProduceListing` records associated with their `user_id`.
*   Restrict direct modification/deletion of listings initially (MVP focuses on creation).

## 7. Multi-Language Integration Strategy

*   **UI Strings**: Utilize `next-i18next` library.
    *   Store translations in JSON files within `public/locales/{lang}/common.json`.
    *   Use `next-i18next` hooks/HOCs in React components to load and display appropriate strings based on the user's `preferred_language` (managed via global state/context, initialized from `UserProfile`).
*   **Data Localization**:
    *   Store localized names directly in `CropType` (`name_en`, `name_hi`, etc.) and `MarketLocation` tables.
    *   API endpoints (`/api/crops`, `/api/markets`, `/api/listings`, `/api/market-prices`) will query the appropriate language column based on the user's `preferred_language` (obtained from the session or passed as a query parameter like `lang`).
    *   The frontend receives already-localized data names from the API where applicable (e.g., crop names in listings).

## 8. Dependencies

*   **Internal:**
    *   Authentication Module (Clerk/NextAuth): Provides user identity, session, and `user_id`. `UserProfile.preferred_language` is critical.
*   **External:**
    *   Supabase: Database, potentially Auth/Storage.
    *   Next.js: Core framework.
    *   React: UI library.
    *   Tailwind CSS: Styling.
    *   `next-i18next` (or similar): Localization library.
    *   **Market Price Data Source (TBD)**: An external API or data feed to populate/update the `MarketPriceData` table. This is a critical dependency requiring further definition.

## 9. Scalability & Performance Considerations

*   **Low Bandwidth:** API responses should be concise. Minimize large data transfers. Use pagination (`GET /api/listings`). Optimize frontend assets (Next.js handles much of this).
*   **Database:** Index foreign keys (`seller_user_id`, `crop_type_id`, `market_location_id`) and columns used in WHERE clauses or ORDER BY (`created_at`, `date_recorded`). Supabase provides scalable infrastructure.
*   **API:** Next.js API routes run as serverless functions, offering good scalability. Ensure efficient database queries.
*   **Caching:** Consider caching frequently accessed, relatively static data like crop types (`/api/crops`) and market locations (`/api/markets`) at the API or frontend level. Market prices (`/api/market-prices`) might have a short TTL cache depending on the update frequency of the source.

## 10. Security Considerations

*   **Authentication/Authorization**: Handled by Clerk/NextAuth and Supabase RLS. Ensure API routes properly verify authentication status.
*   **Input Validation**:
    *   **Client-Side**: Basic checks should be performed in forms for immediate user feedback.
    *   **Server-Side**: Crucial for security and data integrity. For the `POST /api/listings` endpoint, robust input validation is implemented using the Zod library with a defined `listingCreateSchema`. This ensures that incoming data for creating listings is strictly validated against expected types, formats, and presence of required fields (e.g., preventing empty strings for required fields like `cropTypeId`, `quantity`, `pricePerUnit`). Invalid requests result in a `400 Bad Request` response with error details. This server-side validation is critical to prevent invalid data entry and potential issues.
*   **Data Privacy**: Ensure only non-sensitive data is exposed in listings (e.g., `farm_location_general`, not specific contact info). Adhere to PRD privacy requirements. RLS helps enforce this at the database level.

## 11. Testing Considerations & Known Issues

### 11.1. API Test Environment and `Response.json`

A `TypeError: Response.json is not a function` was encountered in API tests for the [`/api/listings`](app/api/listings/route.ts:1) route, specifically within the Jest environment when testing [`__tests__/features/marketplace-price-discovery/api/listings.api.test.ts`](__tests__/features/marketplace-price-discovery/api/listings.api.test.ts:1).

*   **Cause:** This issue was traced to interactions with `jest-fetch-mock` or the general Jest environment's handling of `NextResponse` objects.
*   **Resolution:**
    *   The [`jest.setup.js`](jest.setup.js:1) file was modified to disable `jest-fetch-mock` (`fetchMock.disableMocks()`). This resolved the immediate `TypeError`.
    *   Error handling within the `POST` handler in [`app/api/listings/route.ts`](app/api/listings/route.ts:1) was improved to more gracefully handle invalid JSON request bodies, returning a 400 error with a clear message.

Developers writing API tests, particularly those involving `fetch` or `NextResponse` objects, should be aware of potential conflicts with mocking libraries and ensure robust error handling in API routes.

### 11.2. Database Interaction Tests

Tests for *simulated* database errors (e.g., connection failures, query errors) within the API tests for listings ([`__tests__/features/marketplace-price-discovery/api/listings.api.test.ts`](__tests__/features/marketplace-price-discovery/api/listings.api.test.ts:1)) have been confirmed to be robust. These tests effectively mock the Prisma client and verify that the API route's error handling logic (e.g., returning 500 status codes) functions as expected when such mocked database errors occur. This provides confidence in the API's resilience to backend database issues.