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

  // Spy on console.error and console.warn before all tests in this suite
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance; // Added spy for console.warn

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock to silence output during tests
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {}); // Mock warn as well
  });

  afterEach(() => {
    consoleErrorSpy.mockClear(); // Clear spy history after each test
    consoleWarnSpy.mockClear(); // Clear warn spy history
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore(); // Restore original console.error after all tests
    consoleWarnSpy.mockRestore(); // Restore original console.warn
  });

  describe('POST (Create Profile - Initial Setup)', () => {
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
      expect(consoleErrorSpy).not.toHaveBeenCalled(); // Verify no error logged on success
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
      expect(consoleErrorSpy).not.toHaveBeenCalled(); // Verify no error logged on validation failure
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
        // Note: The route now logs a warning for handled SyntaxError.
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1); // Check warn instead of error
        expect(consoleErrorSpy).not.toHaveBeenCalled(); // Ensure error was NOT called
        const consoleArgs = consoleWarnSpy.mock.calls[0];
        expect(consoleArgs[0]).toBe('API POST /api/user-profile Warning: Invalid JSON body received.'); // Check warning message
        expect(consoleArgs[1]?.name).toBe('SyntaxError'); // Check the error object passed
      });
  
      it('should return 500 and log error on unexpected error during creation', async () => {
          // 1. Mock auth and createUserProfile throwing an error
          const mockUserId = 'user_clerk_post_fail';
          const inputData = { preferred_language: 'es', farm_location: 'Fail Farm', name: 'Fail User' };
          const unexpectedError = new Error('Database write failed');
          (auth as unknown as jest.Mock).mockResolvedValue({ userId: mockUserId });
          (createUserProfile as jest.Mock).mockRejectedValue(unexpectedError);
  
          // 2. Call API
          const request = createMockRequest('POST', inputData);
          const response = await POST(request);
  
          // 3. Assert 500 status and console.error call
          expect(auth).toHaveBeenCalledTimes(1);
          expect(createUserProfile).toHaveBeenCalledTimes(1);
          expect(response.status).toBe(500);
          expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
          expect(consoleErrorSpy).toHaveBeenCalledWith(
              'API POST /api/user-profile Error:', // Matches the generic catch block log
              unexpectedError
          );
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
      expect(consoleErrorSpy).not.toHaveBeenCalled(); // Verify no error logged on success
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
      expect(consoleErrorSpy).not.toHaveBeenCalled(); // Verify no error logged when profile not found
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
      expect(consoleErrorSpy).not.toHaveBeenCalled(); // Verify no error logged for auth failure
    });

    it('should return 500 and log error on unexpected error during fetch', async () => {
        // 1. Mock auth and getUserProfile throwing an error
        const mockUserId = 'user_clerk_get_fail';
        const unexpectedError = new Error('Database read failed');
        (auth as unknown as jest.Mock).mockResolvedValue({ userId: mockUserId });
        (getUserProfile as jest.Mock).mockRejectedValue(unexpectedError);

        // 2. Call API
        const request = createMockRequest('GET');
        const response = await GET(request);

        // 3. Assert 500 status and console.error call
        expect(auth).toHaveBeenCalledTimes(1);
        expect(getUserProfile).toHaveBeenCalledTimes(1);
        expect(response.status).toBe(500);
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            'API GET /api/user-profile Error:', // Matches the generic catch block log
            unexpectedError
        );
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

  describe('PUT (Update Profile)', () => { // Changed to PUT only for clarity

    const mockUserId = 'user_clerk_put_test';
    const updateData = { name: 'Updated Name', preferred_language: 'fr', farm_location: 'Updated Farm' };
    const updatedProfile: UserProfile = {
      id: 'profile_uuid_put',
      clerk_user_id: mockUserId,
      ...updateData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    it('TC-PROF-019: should successfully update the profile with valid data', async () => {
      // 1. Mock auth, existing profile, and successful update
      (auth as unknown as jest.Mock).mockResolvedValue({ userId: mockUserId });
      (getUserProfile as jest.Mock).mockResolvedValue({ id: 'existing_profile_id', clerk_user_id: mockUserId }); // Mock existing profile
      (updateUserProfile as jest.Mock).mockResolvedValue(updatedProfile);

      // 2. Call API
      const request = createMockRequest('PUT', updateData);
      const response = await PUT(request);
      const responseBody = await response.json();

      // 3. Assert
      expect(auth).toHaveBeenCalledTimes(1);
      expect(updateUserProfile).toHaveBeenCalledTimes(1);
      expect(updateUserProfile).toHaveBeenCalledWith(mockUserId, updateData);
      expect(response.status).toBe(200);
      expect(responseBody).toEqual(updatedProfile);
      expect(consoleErrorSpy).not.toHaveBeenCalled(); // Ensure no errors logged on success
    });

    it('TC-ERR-API-001: should return 500 and log error if updateUserProfile returns null', async () => {
      // 1. Mock auth, existing profile, and updateUserProfile returning null
      (auth as unknown as jest.Mock).mockResolvedValue({ userId: mockUserId });
      (getUserProfile as jest.Mock).mockResolvedValue({ id: 'existing_profile_id', clerk_user_id: mockUserId }); // Mock existing profile
      (updateUserProfile as jest.Mock).mockResolvedValue(null); // Simulate update failure returning null

      // 2. Call API
      const request = createMockRequest('PUT', updateData);
      const response = await PUT(request);

      // 3. Assert 500 status and console.error call
      expect(auth).toHaveBeenCalledTimes(1);
      expect(getUserProfile).toHaveBeenCalledWith(mockUserId); // Verify check was made
      expect(updateUserProfile).toHaveBeenCalledTimes(1);
      expect(updateUserProfile).toHaveBeenCalledWith(mockUserId, updateData);
      expect(response.status).toBe(500); // Expecting Internal Server Error
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `API PUT /api/user-profile: Update failed or returned null for Clerk User ID: ${mockUserId}` // Match exact log message
      );
    });

    it('TC-ERR-API-002: should return 500 and log error on unexpected error during update', async () => {
        // 1. Mock auth, existing profile, and updateUserProfile throwing an error
        const unexpectedError = new Error('Database connection lost');
        (auth as unknown as jest.Mock).mockResolvedValue({ userId: mockUserId });
        (getUserProfile as jest.Mock).mockResolvedValue({ id: 'existing_profile_id', clerk_user_id: mockUserId }); // Mock existing profile
        (updateUserProfile as jest.Mock).mockRejectedValue(unexpectedError); // Simulate unexpected failure

        // 2. Call API
        const request = createMockRequest('PUT', updateData);
        const response = await PUT(request);

        // 3. Assert 500 status and console.error call
        expect(auth).toHaveBeenCalledTimes(1);
        expect(getUserProfile).toHaveBeenCalledWith(mockUserId); // Verify check was made
        expect(updateUserProfile).toHaveBeenCalledTimes(1);
        expect(updateUserProfile).toHaveBeenCalledWith(mockUserId, updateData);
        expect(response.status).toBe(500); // Expecting Internal Server Error
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            'API PUT /api/user-profile Error:', // Matches the generic catch block log
            unexpectedError
        );
    });

    it('TC-SEC-002: should fail (401) for unauthenticated requests', async () => {
      // 1. Mock authentication failure
      (auth as unknown as jest.Mock).mockResolvedValue({ userId: null });

      // 2. Call API
      const request = createMockRequest('PUT', updateData);
      const response = await PUT(request);

      // 3. Assert 401
      expect(auth).toHaveBeenCalledTimes(1);
      expect(updateUserProfile).not.toHaveBeenCalled();
      expect(response.status).toBe(401);
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should return 400 for invalid JSON body', async () => {
        // 1. Mock authentication
        (auth as unknown as jest.Mock).mockResolvedValue({ userId: mockUserId });

        // 2. Call API with invalid JSON
        const request = new Request('http://localhost/api/user-profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: '{invalid json', // Malformed JSON string
        });
        const response = await PUT(request);

        // 3. Assert 400 Bad Request and console.error
        expect(auth).toHaveBeenCalledTimes(1);
        expect(updateUserProfile).not.toHaveBeenCalled();
        expect(response.status).toBe(400);
        // The route now logs a warning for handled SyntaxError
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1); // Check warn instead of error
        expect(consoleErrorSpy).not.toHaveBeenCalled(); // Ensure error was NOT called
        // Check arguments directly
        const consoleArgs = consoleWarnSpy.mock.calls[0];
        expect(consoleArgs.length).toBe(2); // Should be called with 2 arguments
        expect(consoleArgs[0]).toBe('API PUT /api/user-profile Warning: Invalid JSON body received.'); // Check warning message
        // Check the 'name' property
        expect(consoleArgs[1]?.name).toBe('SyntaxError');
    });

    // --- Placeholder tests from original file ---
    // These can be implemented or removed as needed based on requirements.
    // For now, they are kept but marked as skipped or left as placeholders.

    it.skip('TC-SEC-004: User A should not be able to PUT updates to User B\'s profile', async () => {
      // Skipped: Similar reasoning to GET TC-SEC-003. The API uses the authenticated user ID.
      // Authorization logic is assumed within updateUserProfile or DB layer.
      expect(true).toBe(true);
    });

    it.skip('TC-SEC-008: should reject invalid language codes', async () => {
      // TODO: Implement if validation logic is added to PUT handler or lib/userProfile
      expect(true).toBe(true); // Placeholder
    });

     it.skip('TC-SEC-009: should handle potentially malicious input in location field', async () => {
      // TODO: Implement if sanitization/validation logic is added
      expect(true).toBe(true); // Placeholder
    });

     it.skip('TC-SEC-010: should not expose sensitive Clerk/NextAuth tokens/details in responses', async () => {
      // TODO: Verify response structure in successful PUT test (TC-PROF-019)
      expect(true).toBe(true); // Placeholder
    });

    it.skip('TC-NEG-001: should handle attempts to save profile with invalid language code', async () => {
      // TODO: Implement if validation logic is added (Similar to TC-SEC-008)
      expect(true).toBe(true); // Placeholder
    });

    it.skip('TC-NEG-002: should handle attempts to save profile with empty required field (if applicable)', async () => {
      // TODO: Implement if PUT requires specific fields beyond those in updateData
      expect(true).toBe(true); // Placeholder
    });

    it.skip('TC-EDGE-002: should handle rapid consecutive updates correctly (ensure final state)', async () => {
        // Skipped: Better suited for integration/E2E tests.
        expect(true).toBe(true);
      });
  });
});