# AgriConnect: API Endpoints Specification

## 1. Authentication

### 1.1 Google Social Login
- **POST /auth/google**
  - Request: `{ id_token: string }`
  - Response: `{ access_token, refresh_token, user }`
  - Errors: 401 (invalid token), 500 (server error)

### 1.2 Logout
- **POST /auth/logout**
  - Request: `{ access_token }`
  - Response: `{ success: true }`
  - Errors: 401 (unauthorized)

## 2. User

### 2.1 Get Current User
- **GET /user/me**
  - Auth: Bearer token
  - Response: `User`
  - Errors: 401

### 2.2 Update Profile
- **PUT /user/me**
  - Auth: Bearer token
  - Request: `{ name, phone, preferred_language, location, profile_photo_url }`
  - Response: `User`
  - Errors: 400 (validation), 401

## 3. Produce Listings

### 3.1 List Produce
- **GET /produce**
  - Query: `crop_name, location, min_price, max_price, status`
  - Response: `[ProduceListing]`
  - Errors: 400

### 3.2 Create Listing
- **POST /produce**
  - Auth: Bearer token
  - Request: `{ crop_name, quantity, price, location, description, photo_url }`
  - Response: `ProduceListing`
  - Errors: 400, 401

### 3.3 Get Listing
- **GET /produce/{id}**
  - Response: `ProduceListing`
  - Errors: 404

### 3.4 Update Listing
- **PUT /produce/{id}**
  - Auth: Bearer token
  - Request: `{ ...fields }`
  - Response: `ProduceListing`
  - Errors: 400, 401, 404

### 3.5 Delete Listing
- **DELETE /produce/{id}**
  - Auth: Bearer token
  - Response: `{ success: true }`
  - Errors: 401, 404

## 4. Market Prices

### 4.1 Get Market Prices
- **GET /market-prices**
  - Query: `crop_name, location`
  - Response: `[MarketPrice]`
  - Errors: 400

### 4.2 Get Price History
- **GET /market-prices/history**
  - Query: `crop_name, location, range`
  - Response: `[MarketPrice]`
  - Errors: 400

## 5. Advisory Content

### 5.1 List Advisory
- **GET /advisory**
  - Query: `crop_name, topic, language`
  - Response: `[AdvisoryContent]`
  - Errors: 400

## 6. Post-Harvest Guidance

### 6.1 List Guidance
- **GET /post-harvest**
  - Query: `crop_name, language`
  - Response: `[PostHarvestGuidance]`
  - Errors: 400

## 7. Transport

### 7.1 List Transport Listings
- **GET /transport/listings**
  - Query: `route, vehicle_type, status`
  - Response: `[TransportListing]`
  - Errors: 400

### 7.2 Create Transport Listing
- **POST /transport/listings**
  - Auth: Bearer token
  - Request: `{ vehicle_type, capacity, route, availability, contact_info }`
  - Response: `TransportListing`
  - Errors: 400, 401

### 7.3 List Transport Requests
- **GET /transport/requests**
  - Query: `origin, destination, status`
  - Response: `[TransportRequest]`
  - Errors: 400

### 7.4 Create Transport Request
- **POST /transport/requests**
  - Auth: Bearer token
  - Request: `{ produce_listing_id, origin, destination, quantity, contact_info }`
  - Response: `TransportRequest`
  - Errors: 400, 401

## 8. Offline & Sync

- **GET /sync**
  - Auth: Bearer token
  - Response: `{ data: { produce, prices, advisory, guidance, transport } }`
  - Errors: 401

## 9. Error Handling

- All endpoints return `{ error: string }` on failure.
- 400: Validation error, 401: Unauthorized, 404: Not found, 500: Server error.

## 10. Security

- All write endpoints require authentication.
- Input validation on all endpoints.
- Rate limiting and logging for abuse prevention.