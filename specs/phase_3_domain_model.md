# AgriConnect: Domain Model & Data Structures

## 1. Core Entities & Attributes

### 1.1 User
- id (UUID, PK)
- name (string)
- email (string, unique)
- phone (string, optional)
- role (enum: farmer, buyer, transport_provider)
- preferred_language (string)
- location (string, optional)
- profile_photo_url (string, optional)
- created_at (timestamp)
- last_login (timestamp)

### 1.2 ProduceListing
- id (UUID, PK)
- user_id (UUID, FK → User)
- crop_name (string)
- quantity (float, unit: kg/ton)
- price (float, per unit)
- location (string)
- description (string, optional)
- photo_url (string, optional)
- status (enum: active, sold, expired)
- created_at (timestamp)
- updated_at (timestamp)

### 1.3 MarketPrice
- id (UUID, PK)
- crop_name (string)
- location (string)
- price (float, per unit)
- source (string)
- timestamp (datetime)

### 1.4 AdvisoryContent
- id (UUID, PK)
- crop_name (string)
- topic (enum: pest, disease, climate, general)
- language (string)
- title (string)
- content (text/markdown)
- images (array of URLs, optional)
- created_at (timestamp)
- updated_at (timestamp)

### 1.5 PostHarvestGuidance
- id (UUID, PK)
- crop_name (string)
- language (string)
- title (string)
- content (text/markdown)
- images (array of URLs, optional)
- created_at (timestamp)
- updated_at (timestamp)

### 1.6 TransportRequest
- id (UUID, PK)
- user_id (UUID, FK → User)
- produce_listing_id (UUID, FK → ProduceListing, optional)
- origin (string)
- destination (string)
- quantity (float, unit: kg/ton)
- status (enum: open, matched, closed)
- contact_info (string)
- created_at (timestamp)
- updated_at (timestamp)

### 1.7 TransportListing
- id (UUID, PK)
- user_id (UUID, FK → User)
- vehicle_type (string)
- capacity (float, unit: kg/ton)
- route (string)
- availability (date range)
- contact_info (string)
- status (enum: available, unavailable)
- created_at (timestamp)
- updated_at (timestamp)

## 2. Relationships

- User 1—N ProduceListing
- User 1—N TransportRequest
- User 1—N TransportListing
- ProduceListing 0—N TransportRequest
- MarketPrice N—N Crop (by crop_name/location)
- AdvisoryContent N—N Crop (by crop_name)
- PostHarvestGuidance N—N Crop (by crop_name)

## 3. Validation Rules

- Email must be unique and valid.
- Required fields: crop_name, quantity, price for listings.
- Price and quantity must be positive numbers.
- Only authenticated users can create listings or requests.
- Language must be supported (from allowed list).
- Status fields must use defined enums.

## 4. State Transitions

- ProduceListing: active → sold/expired
- TransportRequest: open → matched/closed
- TransportListing: available ↔ unavailable

## 5. Glossary

- **ProduceListing:** A farmer’s offer to sell produce.
- **MarketPrice:** Reference price for a crop in a location.
- **AdvisoryContent:** Expert tips on crop health and climate.
- **PostHarvestGuidance:** Storage and handling advice.
- **TransportRequest:** Farmer’s request for moving produce.
- **TransportListing:** Provider’s offer of transport service.