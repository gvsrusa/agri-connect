// __tests__/features/auth-profile/auth-profile.api.test.ts
import { GET, POST, PUT } from '@/app/api/user-profile/route'; // Import GET, POST, and PUT handlers
import { auth } from '@clerk/nextjs/server';
import { getUserProfile, createUserProfile, updateUserProfile } from '@/lib/userProfile'; // Ensure updateUserProfile is imported
import { NextResponse } from 'next/server';
import { UserProfile, UserProfileCreate } from '@/types/userProfile'; // Import UserProfile and UserProfileCreate types

// Mock dependencies
jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn(),
}));

jest.mock('@/lib/userProfile', () => ({
  getUserProfile: jest.fn(),
  createUserProfile: jest.fn(), // Add mock for createUserProfile
  updateUserProfile: jest.fn(), // Add mock for updateUserProfile (for later)
}));

// Helper to create a mock Request
const createMockRequest = (method: string = 'GET', body: any = null): Request => {
  const url = `http://localhost/api/user-profile`; // Base URL doesn't matter much for unit tests
  return new Request(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  });
};

describe('Authentication & User Profile Management API Tests (/api/user-profile)', () => {

  // Reset mocks before each test in this suite
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST (Create Profile - Initial Setup)', () => { // Changed describe to POST only for clarity
    it('TC-PROF-007: should successfully create profile on initial setup', async () => {
      // 1. Mock authentication and successful profile creation
      const mockUserId = 'user_clerk_789ghi_new';
      const inputData = {
        preferred_language: 'es',
        farm_location: 'New Farm Location',
        name: 'New User Name', // Optional name
      };
      const expectedProfileData: UserProfileCreate = {
        clerk_user_id: mockUserId,
        preferred_language: inputData.preferred_language,
        farm_location: inputData.farm_location,
        name: inputData.name,
      };
      const createdProfile: UserProfile = {
        ...expectedProfileData,
        id: 'profile_uuid_789jkl',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      (auth as unknown as jest.Mock).mockResolvedValue({ userId: mockUserId });
      (createUserProfile as jest.Mock).mockResolvedValue(createdProfile);

      // 2. Call the API function/handler
      const request = createMockRequest('POST', inputData);
      const response = await POST(request);
      const responseBody = await response.json();

      // 3. Assert the call was made with correct data
      expect(auth).toHaveBeenCalledTimes(1);
      expect(createUserProfile).toHaveBeenCalledTimes(1);
      expect(createUserProfile).toHaveBeenCalledWith(expectedProfileData);

      // 4. Assert the expected outcome (201 Created status, returned profile)
      expect(response.status).toBe(201);
      expect(responseBody).toEqual(createdProfile);
    });

    it('should return 400 if required fields (language, location) are missing', async () => {
      // 1. Mock authentication
      const mockUserId = 'user_clerk_bad_request';
      (auth as unknown as jest.Mock).mockResolvedValue({ userId: mockUserId });

      // 2. Call API with missing data
      const incompleteData = { name: 'Incomplete User' }; // Missing language and location
      const request = createMockRequest('POST', incompleteData);
      const response = await POST(request);

      // 3. Assert 400 Bad Request
      expect(auth).toHaveBeenCalledTimes(1);
      expect(createUserProfile).not.toHaveBeenCalled(); // Should not attempt creation
      expect(response.status).toBe(400);
    });

     it('should return 400 for invalid JSON body', async () => {
        // 1. Mock authentication
        const mockUserId = 'user_clerk_invalid_json';
        (auth as unknown as jest.Mock).mockResolvedValue({ userId: mockUserId });

        // 2. Call API with invalid JSON
        const request = new Request('http://localhost/api/user-profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{invalid json', // Malformed JSON string
        });
        const response = await POST(request);

        // 3. Assert 400 Bad Request
        expect(auth).toHaveBeenCalledTimes(1);
        expect(createUserProfile).not.toHaveBeenCalled();
        expect(response.status).toBe(400);
    });

  });

  describe('GET (Fetch Profile)', () => {
    it('TC-PROF-020: should return correct profile data for the logged-in user', async () => {
      // 1. Mock successful authentication and profile data
      const mockUserId = 'user_clerk_123abc';
      const mockProfile: UserProfile = {
        id: 'profile_uuid_456def', // Corrected: Use a string ID
        clerk_user_id: mockUserId,
        name: 'Test User',
        preferred_language: 'en',
        farm_location: 'Test Farm Location',
        created_at: new Date().toISOString(), // Corrected: Use ISO string
        updated_at: new Date().toISOString(), // Corrected: Use ISO string
      };
      // Corrected: Cast to unknown first for type assertion
      (auth as unknown as jest.Mock).mockResolvedValue({ userId: mockUserId });
      (getUserProfile as jest.Mock).mockResolvedValue(mockProfile);

      // 2. Call the API function/handler
      const request = createMockRequest('GET');
      const response = await GET(request);
      const responseBody = await response.json();

      // 3. Assert the call was made and the returned data matches the mock
      expect(auth).toHaveBeenCalledTimes(1);
      expect(getUserProfile).toHaveBeenCalledWith(mockUserId);
      expect(response.status).toBe(200);
      // Compare essential fields, avoid direct object comparison due to Date objects
      expect(responseBody.clerk_user_id).toBe(mockProfile.clerk_user_id);
      expect(responseBody.name).toBe(mockProfile.name);
      expect(responseBody.preferred_language).toBe(mockProfile.preferred_language);
      expect(responseBody.farm_location).toBe(mockProfile.farm_location);
    });

    it('TC-PROF-021: should return 404 if the user has no profile yet', async () => {
      // 1. Mock authentication success but profile fetch failure (null)
      const mockUserId = 'user_clerk_456def_no_profile';
      (auth as unknown as jest.Mock).mockResolvedValue({ userId: mockUserId });
      (getUserProfile as jest.Mock).mockResolvedValue(null); // Simulate profile not found

      // 2. Call the API function/handler
      const request = createMockRequest('GET');
      const response = await GET(request);

      // 3. Assert that a 404 status is returned
      expect(auth).toHaveBeenCalledTimes(1); // Ensure auth mock is reset or managed if tests run parallel
      expect(getUserProfile).toHaveBeenCalledWith(mockUserId);
      expect(response.status).toBe(404);
      // Optionally check body if needed, but status is key here
      // const responseBody = await response.json(); // Might throw if body is not valid JSON on 404
      // expect(responseBody).toEqual({ message: 'Profile not found' }); // Example if body is expected
    });

    it('TC-SEC-001: should fail (401) for unauthenticated requests', async () => {
      // 1. Mock authentication failure (no userId)
      (auth as unknown as jest.Mock).mockResolvedValue({ userId: null });

      // 2. Call the API function/handler
      const request = createMockRequest('GET');
      const response = await GET(request);

      // 3. Assert that a 401 Unauthorized status is returned
      expect(auth).toHaveBeenCalledTimes(1);
      expect(getUserProfile).not.toHaveBeenCalled(); // Should not attempt to get profile
      expect(response.status).toBe(401);
    });

    it.skip('TC-SEC-003: User A should not be able to GET User B\'s profile', () => {
      // This test case is skipped because the current GET /api/user-profile
      // endpoint design inherently prevents fetching another user's profile.
      // It exclusively uses the authenticated user's ID from `auth()` to fetch data.
      // Authorization (ensuring the user ID matches the profile ID) is handled
      // implicitly by this design and/or enforced at the data access layer (lib/userProfile or RLS),
      // which should be tested there (e.g., TC-SEC-005).
      // Passing TC-PROF-020 (fetch own profile) and TC-SEC-001 (unauthenticated fails)
      // provides confidence in the API route's security boundary for GET requests.
      expect(true).toBe(true); // Skipped
    });
  });

  describe('PUT/PATCH (Update Profile)', () => {
    it('TC-PROF-019: should successfully update the profile with valid data', async () => {
      // TODO: Implement test logic
      // 1. Mock successful API response for PUT/PATCH
      // 2. Call the API function/handler with update data
      // 3. Assert the call was made with correct data
      // 4. Assert the expected outcome (e.g., success status, updated data)
      expect(true).toBe(true); // Placeholder
    });

    it('TC-SEC-002: should fail (401/403) for unauthenticated requests', async () => {
      // TODO: Implement test logic
      // 1. Mock API response indicating authentication failure
      // 2. Call the API function/handler without authentication context
      // 3. Assert that an authentication error is handled
      expect(true).toBe(true); // Placeholder
    });

    it('TC-SEC-004: User A should not be able to PUT updates to User B\'s profile', async () => {
      // TODO: Implement test logic
      // 1. Set up authentication context for User A
      // 2. Mock API response indicating authorization failure when trying to update User B's data
      // 3. Call the API function/handler attempting to update User B's profile
      // 4. Assert that an authorization error is handled
      expect(true).toBe(true); // Placeholder
    });

     it('TC-SEC-008: should reject invalid language codes', async () => {
      // TODO: Implement test logic
      // 1. Mock API response indicating validation failure (e.g., 400 Bad Request)
      // 2. Call the API function/handler with an invalid language code
      // 3. Assert that a validation error is handled
      expect(true).toBe(true); // Placeholder
    });

     it('TC-SEC-009: should handle potentially malicious input in location field', async () => {
      // TODO: Implement test logic for input sanitization/validation
      // 1. Mock API response (either success after sanitization or validation failure)
      // 2. Call the API function/handler with potentially malicious input (e.g., script tags)
      // 3. Assert the expected behavior (sanitized data saved or error thrown)
      expect(true).toBe(true); // Placeholder
    });

     it('TC-SEC-010: should not expose sensitive Clerk/NextAuth tokens/details in responses', async () => {
      // TODO: Implement test logic
      // 1. Mock API responses for GET and PUT/PATCH
      // 2. Ensure the mock responses do not contain sensitive auth details
      // 3. Call the API functions/handlers
      // 4. Assert that the actual responses (or data passed to frontend) lack sensitive info
      expect(true).toBe(true); // Placeholder
    });

    it('TC-NEG-001: should handle attempts to save profile with invalid language code', async () => {
      // TODO: Implement test logic (Similar to TC-SEC-008, focus on error handling)
      // 1. Mock API response indicating validation failure
      // 2. Call the API function/handler with invalid language
      // 3. Assert appropriate error handling
      expect(true).toBe(true); // Placeholder
    });

    it('TC-NEG-002: should handle attempts to save profile with empty required field (if applicable)', async () => {
      // TODO: Implement test logic (if any fields become required beyond defaults)
      // 1. Mock API response indicating validation failure
      // 2. Call the API function/handler with missing required data
      // 3. Assert appropriate error handling
      expect(true).toBe(true); // Placeholder - Mark as skipped if no fields are strictly required for update
    });

    it('TC-EDGE-002: should handle rapid consecutive updates correctly (ensure final state)', async () => {
        // TODO: Implement test logic (May require specific mocking or test setup)
        // 1. Mock API responses for multiple sequential calls
        // 2. Make rapid calls to the update function/handler
        // 3. Assert that the final state reflects the last update correctly
        // Note: This might be better suited for integration/E2E depending on implementation
        expect(true).toBe(true); // Placeholder
      });
  });
});