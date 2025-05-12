# Feature Overview Specification: Marketplace & Price Discovery

## 1. Introduction

This document outlines the specification for the Marketplace and Price Discovery features within the AgriConnect application. These features aim to provide Indian farmers with a simple platform to list their produce for sale and check prevailing market prices for key commodities, all while supporting multiple languages and catering to users with low-literacy and low-tech backgrounds.

## 2. User Stories

*   **US1 (List Produce):** As a registered farmer, I want to easily list my crop (type, quantity, price) for sale in my preferred language, so that other farmers can see my produce.
*   **US2 (Browse Marketplace):** As a registered farmer, I want to browse produce listings from other farmers in my preferred language, so that I can find items I might be interested in (though not for purchase through the platform).
*   **US3 (Check Market Prices):** As a registered farmer, I want to look up current market prices for specific crops in nearby locations, displayed in my preferred language, so that I can make informed decisions about selling my produce.
*   **US4 (Language Switching):** As a registered farmer, I want to be able to switch the application's language easily, so that I can use the platform in the language I am most comfortable with.

## 3. Acceptance Criteria

*   **AC1.1 (List Produce - Form):** Given a logged-in farmer selects "List Your Crop," then a simple web form is displayed with labels in their selected language for crop type, quantity, and price.
*   **AC1.2 (List Produce - Submission):** When the farmer submits valid crop details, then the system saves the listing to the Supabase database, linking it to the farmer's user ID.
*   **AC1.3 (List Produce - Confirmation):** After successful submission, the farmer sees a confirmation message in their selected language, and the new listing appears in the marketplace view.
*   **AC2.1 (Browse Marketplace - Display):** Given a logged-in farmer navigates to the marketplace, then a list of available produce is displayed with details (crop type, quantity, price, seller's farm location - if deemed appropriate and not a privacy risk, otherwise just a general region if available from profile) in the farmer's selected language.
*   **AC3.1 (Check Market Prices - Interface):** Given a logged-in farmer navigates to "Market Prices," then an interface (e.g., dropdowns or search) allows them to select a crop and a market location, with UI elements in their selected language.
*   **AC3.2 (Check Market Prices - Display):** When a crop and market are selected, then the latest price for that crop in that market is displayed in the farmer's selected language (e.g., ₹X per quintal).
*   **AC4.1 (Language Persistence):** The user's selected language preference is stored in their profile and applied consistently across the marketplace and price discovery features.

## 4. Functional Requirements

### 4.1. User Registration & Authentication
*   FR1.1: All users must register and authenticate using Clerk/NextAuth (as per PRD 46).

### 4.2. Produce Listing Management
*   FR2.1: Users shall be able to create a new produce listing.
    *   Input fields: Crop Type (selectable list, localized), Quantity (e.g., "50 kg", unit might be part of crop type or a separate field), Price (per unit, currency ₹).
    *   Form labels and validation messages must be in the user's selected language.
*   FR2.2: Listings shall be stored in the Supabase PostgreSQL database, associated with the seller's user ID.
*   FR2.3: Users shall receive a confirmation message in their selected language upon successful listing creation.

### 4.3. Marketplace Browsing
*   FR3.1: Users shall be able to view a list of all active produce listings.
*   FR3.2: Each listing shall display: Crop Type, Quantity, Price, and potentially a non-identifying seller location (e.g., district, if available and privacy-compliant).
*   FR3.3: All marketplace information (labels, data if applicable like crop names) shall be displayed in the user's selected language.
*   FR3.4: (Optional - Future Enhancement) Basic filtering (e.g., by crop type) or sorting (e.g., by date listed) could be considered if simple to implement.

### 4.4. Market Price Discovery
*   FR4.1: Users shall be able to access a dedicated section to check market prices.
*   FR4.2: Users shall be able to select/search for a specific crop and a market location.
    *   Crop selection: Dropdown or searchable list (localized names).
    *   Market location selection: Dropdown or searchable list (localized names).
*   FR4.3: The system shall display the latest available price for the selected crop in the chosen market.
*   FR4.4: Price information (labels, units, crop names) shall be displayed in the user's selected language.

### 4.5. Multi-Language Support
*   FR5.1: The UI for marketplace and price discovery features must support multiple languages (e.g., Hindi, Marathi, English initially).
*   FR5.2: Users must be able to easily switch their preferred language.
*   FR5.3: User language preference shall be stored in their profile (PRD 36).
*   FR5.4: Localization strings for UI elements (labels, buttons, messages) must be managed (PRD 35).

## 5. Non-Functional Requirements

*   **NFR1 (Simplicity & Usability):** The UI must be extremely simple, intuitive, and accessible to low-literacy and low-tech users (PRD 48). Use minimal text and clear icons.
*   **NFR2 (Performance - Low Bandwidth):** The application must perform adequately on low-bandwidth internet connections. Optimize images and data transfer.
*   **NFR3 (Responsiveness):** The web application must be responsive and work well on various screen sizes, especially mobile devices (PRD 48).
*   **NFR4 (Privacy):** User contact details and personal data must be kept private. Only necessary, non-identifying information should be displayed in public listings (PRD 49).
*   **NFR5 (Data Integrity):** Data for listings and market prices must be stored accurately in Supabase.
*   **NFR6 (Clean UI):** Maintain a clean, uncluttered UI using Tailwind CSS, accommodating different text lengths from translations (PRD 55).
*   **NFR7 (Data Input Minimization):** Avoid requiring excessive data input from users (PRD 53).

## 6. Scope

### 6.1. In Scope
*   User registration and login (via Clerk/NextAuth).
*   Creating and managing (implicitly, though explicit management like edit/delete is not detailed in PRD for MVP, focus is on creation) produce listings by farmers.
*   Browsing produce listings in a marketplace view.
*   Looking up real-time or frequently updated local commodity prices.
*   Support for multiple languages in UI and relevant data presentation.
*   Storing user profiles, produce listings, and price data (source TBD for price data, but storage in Supabase).
*   Simple web form for listing produce.
*   Search/filter interface for market prices.

### 6.2. Out of Scope (for MVP, as per PRD)
*   Full transaction or payment processing (PRD 51).
*   Direct communication or negotiation between users within the platform.
*   Complex inventory management for farmers.
*   Advanced analytics or reporting on marketplace activity.
*   User reviews or ratings.
*   Delivery or logistics coordination.
*   Bidding or auction mechanisms.

## 7. Dependencies

*   **D1 (User Authentication):** Clerk/NextAuth for user registration and authentication (PRD 46).
*   **D2 (Database):** Supabase (cloud PostgreSQL) for storing user profiles, produce listings, and potentially cached/aggregated price data (PRD 47).
*   **D3 (Price Data Source):** An external or internal source for real-time or frequently updated market prices for key commodities. The nature and API of this source need to be defined. (Implied by PRD 29).
*   **D4 (Localization Infrastructure):** A system for managing and serving localization strings (e.g., in-code, dedicated i18n library) (PRD 35, 36).
*   **D5 (Frontend Framework):** Next.js.
*   **D6 (Styling):** Tailwind CSS.

## 8. High-Level UI/UX Considerations

*   **Simplicity:** Prioritize ease of use. Minimal text, large tappable targets, clear visual hierarchy.
*   **Icons:** Use intuitive icons to supplement text, aiding low-literacy users.
*   **Language Selector:** A prominent and easily accessible language switcher.
*   **Forms:** Listing form should be single-step if possible, with clear labels in the selected language.
*   **Marketplace View:** Clean card-based or list-based layout for produce.
*   **Price View:** Clear display of crop, market, and price.
*   **Feedback:** Clear success/error messages in the user's language.
*   **Responsiveness:** Mobile-first design approach.

## 9. Data Models (High-Level)

### 9.1. UserProfile (Managed partly by Clerk/NextAuth, extended in Supabase)
*   `user_id` (Primary Key, Foreign Key to Clerk/NextAuth user)
*   `name` (Text)
*   `contact_info` (Text, kept private)
*   `farm_location_general` (Text, e.g., district/region - for general display, not precise)
*   `preferred_language` (Text, e.g., 'en', 'hi', 'mr')
*   ... (other Clerk/NextAuth fields)

### 9.2. ProduceListing
*   `listing_id` (Primary Key, UUID)
*   `seller_user_id` (Foreign Key to UserProfile.user_id)
*   `crop_type_id` (Foreign Key to CropType.crop_type_id - for standardized crop names)
*   `quantity` (Text, e.g., "50 kg", "10 quintals") - consider structured quantity (value + unit) if filtering/sorting on quantity is ever needed. For MVP, text is simpler.
*   `price_per_unit` (Numeric or Text, e.g., "1500 INR per quintal") - consider structured price (value + currency + unit) for consistency. For MVP, text is simpler.
*   `listing_date` (Timestamp, auto-set)
*   `is_active` (Boolean, default true)
*   `description` (Text, optional, simple)

### 9.3. CropType (for standardizing crop names and enabling localization)
*   `crop_type_id` (Primary Key, Serial/UUID)
*   `name_en` (Text, e.g., "Wheat")
*   `name_hi` (Text, e.g., "गेहूँ")
*   `name_mr` (Text, e.g., "गहू")
*   ... (other supported languages)
*   `default_unit_en` (Text, e.g., "quintal")
*   `default_unit_hi` (Text, e.g., "क्विंटल")
*   `default_unit_mr` (Text, e.g., "क्विंटल")

### 9.4. MarketPriceData
*   `price_data_id` (Primary Key, UUID)
*   `crop_type_id` (Foreign Key to CropType.crop_type_id)
*   `market_location_id` (Foreign Key to MarketLocation.market_location_id)
*   `price` (Numeric)
*   `price_unit` (Text, e.g., "INR per quintal" - could be derived from CropType default unit)
*   `date_recorded` (Timestamp)
*   `source` (Text, optional, e.g., "Mandi API X")

### 9.5. MarketLocation (for standardizing market names and enabling localization)
*   `market_location_id` (Primary Key, Serial/UUID)
*   `name_en` (Text, e.g., "Mumbai APMC")
*   `name_hi` (Text, e.g., "मुंबई एपीएमसी")
*   `name_mr` (Text, e.g., "मुंबई एपीएमसी")
*   ... (other supported languages)
*   `district` (Text)
*   `state` (Text)

## 10. User Flows (High-Level)

### 10.1. Listing Produce
1.  User (logged in) navigates to "Marketplace" section.
2.  User clicks "List Your Crop" (or similar, localized button).
3.  System displays a simple web form:
    *   Crop Type (dropdown, populated from `CropType` table, names localized based on `UserProfile.preferred_language`).
    *   Quantity (text input, e.g., "50 kg").
    *   Price (text input, e.g., "2000 INR per quintal").
    *   (Optional) Short Description.
    *   Labels are in user's selected language.
4.  User fills the form and clicks "Submit" (localized).
5.  System validates input.
    *   On error: Display error message(s) in user's language next to relevant fields.
    *   On success:
        1.  Save data to `ProduceListing` table in Supabase (linking to `UserProfile.user_id`).
        2.  Display success message (e.g., "Your listing is live!") in user's language.
        3.  Redirect to Marketplace view, where the new listing is visible.

### 10.2. Browsing Produce Listings
1.  User (logged in) navigates to "Marketplace" section.
2.  System fetches active listings from `ProduceListing` table, joining with `UserProfile` (for seller's general location, if used) and `CropType` (for localized crop names).
3.  System displays listings (e.g., in cards or a list):
    *   Localized Crop Name.
    *   Quantity.
    *   Price.
    *   (Optional) Seller's general farm location (e.g., district).
    *   Date Listed.
    *   All UI elements and relevant data are in user's selected language.
4.  (Future) User might be able to apply simple filters (e.g., by crop type).

### 10.3. Checking Market Prices
1.  User (logged in) navigates to "Market Prices" section.
2.  System displays an interface with:
    *   Crop Type selector (dropdown/search, populated from `CropType`, names localized).
    *   Market Location selector (dropdown/search, populated from `MarketLocation`, names localized).
    *   "Get Price" button (localized).
    *   All UI elements are in user's selected language.
3.  User selects a crop and a market, then clicks "Get Price."
4.  System queries `MarketPriceData` (or an API that feeds this table) for the latest price for the selected crop and market.
5.  System displays the price:
    *   "Price for [Localized Crop Name] in [Localized Market Name]: ₹X per [Localized Unit]."
    *   Date of price information.
    *   All displayed in user's selected language.