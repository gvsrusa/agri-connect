# Feature Overview Specification: Transportation Connection

**1. Introduction**

This document outlines the specification for the "Transportation Connection" feature within the AgriConnect application. This feature aims to connect farmers needing to transport their produce with available transporters. It will allow farmers to post transport requests and browse a list of transporters.

**2. User Stories**

*   **US1 (Farmer - Request Transport):** As a farmer, I want to post a request for transportation for my harvest, specifying the type of produce, desired date, and pickup location, so that I can find help moving my goods to market.
*   **US2 (Farmer - Browse Transporters):** As a farmer, I want to view a list of available transporters, including their service areas and capacity, so that I can identify potential transport options.
*   **US3 (Farmer - View Transporter Contact):** As a farmer, I want to be able to see contact information for a transporter (under specific conditions, respecting privacy) so that I can initiate communication to arrange transport.
*   **US4 (User - View Transport Requests):** As a user (farmer or transporter), I want to view a list of active transport requests, so that I can see current needs or opportunities.
*   **US5 (User - Language Support):** As a user, I want all forms, labels, and information related to transportation to be displayed in my selected language, so that I can easily understand and use the feature.

**3. Acceptance Criteria**

*   **AC1.1 (Post Request):** A farmer can successfully submit a transport request via a web form, providing produce type, date, and pickup location. The request is saved to the database.
*   **AC1.2 (Request Confirmation):** Upon submitting a request, the farmer receives a confirmation message.
*   **AC2.1 (Browse Transporters List):** A user can view a paginated list of registered transporters.
*   **AC2.2 (Transporter Details):** Each transporter in the list displays their name, capacity, and service areas. Contact information is handled as per privacy rules.
*   **AC3.1 (Conditional Contact Display):** Transporter contact information is displayed according to defined privacy rules (e.g., only after a farmer expresses interest, or a general contact method for the platform to facilitate connection).
*   **AC4.1 (Browse Requests List):** A user can view a list of active transport requests, showing produce type, date, and pickup location.
*   **AC5.1 (Localization):** All UI elements (forms, buttons, labels, messages) for the transportation feature are correctly translated and displayed based on the user's selected language.

**4. Functional Requirements**

*   **FR1: Create Transport Request:**
    *   System shall allow authenticated farmers to create a new transport request.
    *   The request form shall capture:
        *   Type of produce (e.g., dropdown, text input)
        *   Quantity/Volume (optional, if capacity matching is desired later)
        *   Preferred transport date
        *   Pickup location (e.g., village, district - potentially using a map or structured input)
        *   Contact preference (how the farmer wishes to be contacted, if different from profile)
    *   The system shall store the transport request linked to the requesting user's ID.
*   **FR2: List/Browse Transporters:**
    *   System shall display a list of registered transporters.
    *   The list shall be filterable/sortable by service area (if feasible in MVP).
    *   Each transporter entry shall display: Name, Capacity (e.g., "Small truck", "Tractor-trolley"), Service Areas.
*   **FR3: View Transporter Details:**
    *   System shall allow users to view more details about a specific transporter.
    *   Contact information display will be governed by privacy rules (see Section 10).
*   **FR4: List/Browse Transport Requests:**
    *   System shall display a list of active transport requests.
    *   Each request entry shall display: Type of produce, Date, Pickup Location.
    *   The list may be filterable by location or date.
*   **FR5: Multi-language Support:**
    *   All UI text (labels, buttons, messages, form placeholders) related to this feature must be available in all supported languages.
    *   The display language will be determined by the user's profile settings.

**5. Non-Functional Requirements**

*   **NFR1: Accessibility:** The UI must be accessible to low-literacy and low-tech users, featuring minimal text, intuitive icons, and responsive design (PRD 48).
*   **NFR2: Privacy:** Transporter contact information and farmer's request details must be handled with strict privacy considerations (PRD 49). Direct display of personal contact info should be minimized.
*   **NFR3: Performance:** Lists of transporters and transport requests should load within an acceptable timeframe (e.g., < 3 seconds) on typical internet connections available to rural users.
*   **NFR4: Data Integrity:** All data related to transport requests and transporter profiles must be stored accurately and consistently in Supabase PostgreSQL (PRD 36).
*   **NFR5: Usability:** Forms for submitting requests and interfaces for browsing listings must be simple, intuitive, and easy to navigate.

**6. Scope**

*   **In Scope:**
    *   Farmers posting transport requests.
    *   Users browsing a list of available transporters.
    *   Users browsing a list of posted transport requests.
    *   Basic transporter profiles (name, capacity, service areas, contact method).
    *   Storage of requests and transporter data in Supabase.
    *   Multi-language support for UI elements.
    *   Privacy-conscious handling of contact information.
*   **Out of Scope (for MVP, as per PRD 51):**
    *   Full transaction processing or booking system.
    *   Payment processing.
    *   Real-time tracking of transport.
    *   Automated matching of requests to transporters.
    *   Ratings or reviews for transporters or farmers.
    *   Transporter registration/profile management (assuming this is handled separately or pre-populated for MVP). If transporters need to register, this would be a separate feature.

**7. Dependencies**

*   **Authentication & User Profile Management:** Relies on the existing user authentication system (Clerk/NextAuth) to identify farmers posting requests. User ID will be linked to requests.
*   **Localization Infrastructure:** Depends on the application's existing framework for managing and displaying localization strings (PRD 35).
*   **Supabase Database:** All data will be stored in Supabase PostgreSQL (PRD 36).
*   **UI Component Library:** Will utilize existing UI components (Tailwind CSS) for consistency.

**8. Data Models (Supabase PostgreSQL)**

*   **Table: `transporters`**
    *   `id`: UUID (Primary Key, auto-generated)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default now())
    *   `name`: TEXT (Not Null) - Transporter's name or company name.
    *   `capacity_description`: TEXT - e.g., "Small truck (1 ton)", "Tractor with trolley", "20 crates".
    *   `service_areas`: TEXT[] (Array of text) - List of districts, villages, or regions served.
    *   `contact_info_type`: TEXT (Enum: 'phone_platform_mediated', 'email_platform_mediated', 'direct_phone_provisional') - Defines how contact is managed.
    *   `contact_details_encrypted`: TEXT (Nullable) - Encrypted contact info if direct display is ever provisionally allowed or for platform use.
    *   `is_active`: BOOLEAN (default true) - To enable/disable transporter visibility.
    *   `notes`: TEXT (Nullable) - Any additional notes.

*   **Table: `transport_requests`**
    *   `id`: UUID (Primary Key, auto-generated)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default now())
    *   `user_id`: UUID (Foreign Key referencing `auth.users(id)` or a local `profiles` table) - The farmer who posted the request.
    *   `produce_type`: TEXT (Not Null) - e.g., "Tomatoes", "Wheat", "Mangoes".
    *   `quantity_description`: TEXT (Nullable) - e.g., "10 quintals", "50 boxes".
    *   `pickup_location_description`: TEXT (Not Null) - Farmer's description of the pickup location.
    *   `pickup_latitude`: DECIMAL (Nullable) - Optional for map integration.
    *   `pickup_longitude`: DECIMAL (Nullable) - Optional for map integration.
    *   `preferred_transport_date`: DATE (Not Null).
    *   `status`: TEXT (Enum: 'open', 'pending_connection', 'closed', 'cancelled', default 'open').
    *   `contact_preference`: TEXT (Nullable) - How the farmer prefers to be contacted regarding this request.
    *   `is_active`: BOOLEAN (default true)

**9. User Flows**

*   **9.1. Farmer Submits a Transport Request:**
    1.  Farmer navigates to the "Request Transport" section of the application.
    2.  Farmer is presented with a web form (in their selected language).
    3.  Farmer fills in:
        *   Type of Produce
        *   Quantity (optional)
        *   Preferred Transport Date (using a date picker)
        *   Pickup Location Description
    4.  Farmer submits the form.
    5.  System validates the input.
    6.  If valid, the system saves the `TransportRequest` to the database, linking it to the farmer's `user_id`.
    7.  System displays a success message to the farmer.
*   **9.2. User Browses Available Transporters:**
    1.  User navigates to the "Browse Transporters" section.
    2.  System fetches and displays a list of active `Transporters` from the database.
    3.  Each list item shows: Transporter Name, Capacity Description, Service Areas.
    4.  Contact information is displayed according to privacy rules (see Section 10).
    5.  The list may offer basic filtering (e.g., by service area if implemented).
*   **9.3. User Views Transport Request Listings:**
    1.  User navigates to a "View Transport Requests" section (or this might be integrated with browsing transporters).
    2.  System fetches and displays a list of active `TransportRequests`.
    3.  Each list item shows: Produce Type, Preferred Transport Date, Pickup Location Description.
    4.  This allows transporters (or other farmers) to see current needs.

**10. Multi-Language Handling**

*   All UI elements (form labels, button text, informational messages, table headers, placeholders) related to the Transportation Connection feature will use localization keys.
*   These keys will map to translated strings stored in the application's localization files (PRD 35).
*   The application will render the UI in the language selected by the user in their profile settings.

**11. Privacy Considerations**

*   **Transporter Contact Information (PRD 49):**
    *   **Default:** Direct display of transporter phone numbers or email addresses will be avoided in public listings.
    *   **Option 1 (Platform Mediated Contact):** Farmers express interest in a transporter. The platform facilitates an initial connection (e.g., a notification to the transporter with the farmer's request ID, or a masked communication channel). This is the preferred MVP approach.
    *   **Option 2 (Provisional Direct Contact - Post-MVP/Careful Consideration):** If direct contact is deemed necessary, it should only be revealed after a clear action by the farmer (e.g., "Request Contact") and potentially with consent from the transporter for each request. This requires careful UI/UX to manage expectations and consent.
    *   The `contact_info_type` field in the `transporters` table will help manage this.
*   **Farmer Request Details:** While pickup location is necessary, avoid displaying overly precise personal addresses in general listings if not essential. Focus on village/district level.

**12. UI/UX Considerations**

*   **Simplicity:** Forms for posting requests should be extremely simple, with clear labels and minimal fields required for MVP (PRD 48).
*   **Clear Listings:** Lists of transporters and requests should be easy to scan and understand. Use clear typography and layout.
*   **Intuitive Icons:** Use icons where appropriate to aid understanding for low-literacy users (PRD 48).
*   **Responsive Design:** Ensure the feature is fully usable on various screen sizes, especially mobile devices.
*   **Guidance:** Provide brief, clear instructions or tooltips in the local language.
*   **Feedback:** Clear success/error messages for form submissions.

**13. Future Considerations (Out of MVP Scope)**

*   Transporter registration and profile management portal.
*   Filtering transporters by specific capacity types.
*   Map-based view for locations.
*   Notifications to transporters about new relevant requests.
*   A mechanism for farmers/transporters to mark a request as "connected" or "fulfilled."