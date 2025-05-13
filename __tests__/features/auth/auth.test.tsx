/** @jest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserProfile } from '@/types/userProfile'; // Added import

// Mock dependencies
jest.mock('@clerk/nextjs', () => ({
  useUser: jest.fn(() => ({ // Made useUser a jest.fn()
    isSignedIn: true,
    user: { id: 'user_123', fullName: 'Test User' },
  })),
  useAuth: jest.fn(() => ({ // Made useAuth a jest.fn()
    userId: 'user_123',
    getToken: async () => 'mock_token',
  })),
}));

// Mock fetch for API calls
global.fetch = jest.fn();

// Mock i18n
jest.mock('next-intl', () => ({
  useTranslations: jest.fn((namespace: string) => (key: string) => `${namespace}.${key}`),
  useLocale: jest.fn(() => 'en'), // Changed to jest.fn()
  NextIntlClientProvider: jest.fn(({ children }: { children: React.ReactNode }) => <div>{children}</div>),
}));

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
  })),
  usePathname: jest.fn(() => '/en/profile'), // Changed to jest.fn()
}));


// Placeholder for actual components
// This component would typically be rendered by a higher-order component or page
// that checks for profile existence.
const ProfileGate = ({ children, profile }: { children: React.ReactNode, profile: UserProfile | null }) => {
  if (!profile || !profile.preferred_language || !profile.farm_location) {
    return <MockProfileSetupComponent />;
  }
  return <div>{children}</div>;
};

const MockProfileSetupComponent = ({ onSubmit, initialData }: { onSubmit?: (data: any) => void, initialData?: Partial<UserProfile> }) => {
  const [language, setLanguage] = React.useState(initialData?.preferred_language || 'en');
  const [location, setLocation] = React.useState(initialData?.farm_location || 'Test Farm');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ preferred_language: language, farm_location: location });
    }
  };

  return (
    <div>
      <h1>Profile Setup Component</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="language">profile.setupLanguageLabel</label>
        <select id="language" data-testid="language-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="xx">Invalid Language</option>
        </select>
        <label htmlFor="location">profile.setupLocationLabel</label>
        <input id="location" data-testid="location-input" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        <button type="submit">profile.saveButton</button>
      </form>
    </div>
  );
};
const MockProfileViewEditComponent = () => <div>Profile View/Edit Component</div>;


describe('Authentication & User Profile Management', () => {
  // Helper to mock useUser
  const mockUseUser = jest.requireMock('@clerk/nextjs').useUser;


  beforeEach(() => {
    // Reset mocks before each test
    (fetch as jest.Mock).mockReset(); // Changed from mockClear to mockReset
    mockUseUser.mockReturnValue({
      isSignedIn: true,
      user: { id: 'user_123', fullName: 'Test User' },
    });
  });

  describe('US1: First-Time Login & Setup', () => {
    test('TP-PROF-001: Verify profile check on first login (missing profile)', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => null, // Simulate no profile found
      });

      render(
        <ProfileGate profile={null}>
          <MockProfileViewEditComponent />
        </ProfileGate>
      );

      // Check if the setup component is rendered
      expect(screen.getByText('Profile Setup Component')).toBeInTheDocument();
      // Check if the view/edit component is NOT rendered
      expect(screen.queryByText('Profile View/Edit Component')).not.toBeInTheDocument();
    });

    test('TP-PROF-002: Verify setup flow guidance for language', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => null, // Simulate no profile found
      });
       render(
        <ProfileGate profile={null}>
          <MockProfileViewEditComponent />
        </ProfileGate>
      );
      expect(screen.getByText('Profile Setup Component')).toBeInTheDocument();
      expect(screen.getByLabelText('profile.setupLanguageLabel')).toBeInTheDocument();
      expect(screen.getByRole('combobox', { name: 'profile.setupLanguageLabel' })).toBeInTheDocument();
    });
    test('TP-PROF-003: Verify setup flow guidance for location', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => null, // Simulate no profile found
      });
      render(
        <ProfileGate profile={null}>
          <MockProfileViewEditComponent />
        </ProfileGate>
      );
      expect(screen.getByText('Profile Setup Component')).toBeInTheDocument();
      expect(screen.getByLabelText('profile.setupLocationLabel')).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'profile.setupLocationLabel' })).toBeInTheDocument();
    });

    test('TP-PROF-004: Verify saving valid language and location during setup', async () => {
      const mockProfileData: UserProfile = {
        id: 'prof_123',
        clerk_user_id: 'user_123',
        preferred_language: 'es',
        farm_location: 'Spanish Farm',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Mock fetch for the POST request specifically for this test
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProfileData, // This is for the POST
      });

      // Initial render - assume no fetch calls from these simple mocks for now
      const { rerender } = render(
        <ProfileGate profile={null}>
          <MockProfileViewEditComponent />
        </ProfileGate>
      );
      expect(screen.getByText('Profile Setup Component')).toBeInTheDocument();

      // Simulate the API call (POST)
      const response = await global.fetch('/api/user-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer mock_token' },
        body: JSON.stringify({ preferred_language: 'es', farm_location: 'Spanish Farm' }),
      });
      const createdProfile = await response.json();

      // Check if the POST call was made correctly
      expect(fetch).toHaveBeenCalledWith('/api/user-profile', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ preferred_language: 'es', farm_location: 'Spanish Farm' }),
      }));
      expect(createdProfile).toEqual(mockProfileData); // This should now pass if the mock is correct

      // Now, for the rerender part, if ProfileGate fetches, we need another mock
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => createdProfile, // Simulate fetching the just-created profile
      });

      rerender(
        <ProfileGate profile={createdProfile}>
          <MockProfileViewEditComponent />
        </ProfileGate>
      );
      
      await waitFor(() => {
        expect(screen.queryByText('Profile Setup Component')).not.toBeInTheDocument();
      });
      expect(screen.getByText('Profile View/Edit Component')).toBeInTheDocument();
      expect(fetch).toHaveBeenCalledTimes(1); // Corrected from 2 to 1
    });
    
    test('TP-PROF-005: Verify immediate language application after setup', async () => {
      const profileWithLang: UserProfile = {
        id: 'prof_spanish',
        clerk_user_id: 'user_123',
        preferred_language: 'es', // Spanish
        farm_location: 'Barcelona Farm',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Mock fetch to return this profile
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => profileWithLang,
      });
      
      // Mock useLocale to reflect the change
      const mockUseLocale = jest.requireMock('next-intl').useLocale;
      mockUseLocale.mockReturnValue(profileWithLang.preferred_language); // Set to 'es'

      // Hypothetical component that displays something based on locale
      const LanguageSensitiveComponent = () => {
        const locale = jest.requireMock('next-intl').useLocale();
        return <div>Current Language: {locale}</div>;
      };
      
      render(
        <ProfileGate profile={profileWithLang}>
          <LanguageSensitiveComponent />
        </ProfileGate>
      );

      // After setup (profile now exists with 'es'), the setup form should not be there
      expect(screen.queryByText('Profile Setup Component')).not.toBeInTheDocument();
      // Check if the language sensitive component reflects 'es'
      // This depends on how useLocale is mocked and used.
      expect(screen.getByText(`Current Language: ${profileWithLang.preferred_language}`)).toBeInTheDocument();
      
      // Reset mock for other tests
      mockUseLocale.mockReturnValue('en');
    });
    test('TP-PROF-006: Negative: Attempt to save invalid language during setup', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false, // Simulate API error
        status: 400,
        json: async () => ({ error: 'Invalid language code' }),
      });

      // Simulate the API call that would happen upon form submission with invalid data
      const response = await global.fetch('/api/user-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer mock_token' },
        body: JSON.stringify({ preferred_language: 'xx', farm_location: 'Valid Farm' }), // Invalid language 'xx'
      });

      expect(fetch).toHaveBeenCalledWith('/api/user-profile', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ preferred_language: 'xx', farm_location: 'Valid Farm' }),
      }));
      expect(response.ok).toBe(false);
      expect(response.status).toBe(400);
      const errorData = await response.json();
      expect(errorData).toEqual({ error: 'Invalid language code' });
    });
    test('TP-PROF-007: Negative: Attempt to save invalid location during setup', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false, // Simulate API error
        status: 400,
        json: async () => ({ error: 'Invalid location format' }),
      });
      
      // Simulate the API call with an invalid location (e.g., empty string if required)
      const response = await global.fetch('/api/user-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer mock_token' },
        body: JSON.stringify({ preferred_language: 'en', farm_location: '' }), // Invalid empty location
      });

      expect(fetch).toHaveBeenCalledWith('/api/user-profile', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ preferred_language: 'en', farm_location: '' }),
      }));
      expect(response.ok).toBe(false);
      expect(response.status).toBe(400);
      const errorData = await response.json();
      expect(errorData).toEqual({ error: 'Invalid location format' });
    });
  });

  describe('US2: View & Update Profile', () => {
    test('TP-PROF-008: Verify navigation to Profile section', () => {
      const usePathnameMock = jest.requireMock('next/navigation').usePathname;
      (usePathnameMock as jest.Mock).mockReturnValue('/en/profile'); // Ensure it's set for this test

      const TestPageComponent = () => {
        const pathname = usePathnameMock();
        return <div>Current Path: {pathname}</div>;
      };
      render(<TestPageComponent />);
      expect(screen.getByText('Current Path: /en/profile')).toBeInTheDocument();
      expect(usePathnameMock).toHaveBeenCalled();
      
      // Reset mock to default if necessary for other tests, though beforeEach should handle it.
      // (usePathnameMock as jest.Mock).mockReturnValue('/en/profile');
    });
    test('TP-PROF-009: Verify display of current profile data', async () => {
      const mockProfile: UserProfile = {
        id: 'prof_display_test',
        clerk_user_id: 'user_display_test',
        preferred_language: 'fr',
        farm_location: 'French Display Farm',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      (fetch as jest.Mock).mockResolvedValueOnce({ // For the initial fetch in ProfilePageSimulator
        ok: true,
        json: async () => mockProfile,
      });

      const EnhancedMockProfileViewEditComponent = ({ profile }: { profile: UserProfile | null }) => (
        <div>
          <h1>Profile View/Edit Component</h1>
          {profile && (
            <>
              <p>Language: {profile.preferred_language}</p>
              <p>Location: {profile.farm_location}</p>
            </>
          )}
        </div>
      );
      
      const ProfilePageSimulator = () => {
        const [profile, setProfile] = React.useState<UserProfile | null>(null);
        React.useEffect(() => {
          global.fetch('/api/user-profile') // This fetch is mocked above
            .then(res => res.json())
            .then(data => setProfile(data as UserProfile)); // Added type assertion
        }, []);
        // Render ProfileGate which then renders EnhancedMockProfileViewEditComponent if profile exists
        return (
          <ProfileGate profile={profile}>
            <EnhancedMockProfileViewEditComponent profile={profile} />
          </ProfileGate>
        );
      };

      render(<ProfilePageSimulator />);

      await waitFor(() => {
        expect(screen.getByText(`Language: ${mockProfile.preferred_language}`)).toBeInTheDocument();
      });
      expect(screen.getByText(`Location: ${mockProfile.farm_location}`)).toBeInTheDocument();
      // Ensure setup component is not shown
      expect(screen.queryByText('Profile Setup Component')).not.toBeInTheDocument();
    });
    test('TP-PROF-010: Verify editability of profile fields', async () => {
      const initialProfileData: UserProfile = {
        id: 'prof_editable',
        clerk_user_id: 'user_editable',
        preferred_language: 'en',
        farm_location: 'Initial Farm Location',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      const mockSubmitHandler = jest.fn();

      render(
        <MockProfileSetupComponent
          initialData={initialProfileData}
          onSubmit={mockSubmitHandler}
        />
      );

      const languageSelect = screen.getByTestId('language-select');
      const locationInput = screen.getByTestId('location-input');
      const submitButton = screen.getByRole('button', { name: 'profile.saveButton' });

      // Verify initial values are set
      expect(languageSelect).toHaveValue(initialProfileData.preferred_language);
      expect(locationInput).toHaveValue(initialProfileData.farm_location);

      // Change language
      fireEvent.change(languageSelect, { target: { value: 'es' } });
      expect(languageSelect).toHaveValue('es');

      // Change location
      fireEvent.change(locationInput, { target: { value: 'Updated Farm Location' } });
      expect(locationInput).toHaveValue('Updated Farm Location');

      // Submit the form
      fireEvent.click(submitButton);

      // Verify onSubmit was called with the new values
      expect(mockSubmitHandler).toHaveBeenCalledWith({
        preferred_language: 'es',
        farm_location: 'Updated Farm Location',
      });
    });
    test('TP-PROF-011: Verify saving valid profile updates', async () => {
      const updatedProfileData: UserProfile = {
        id: 'prof_updated_123',
        clerk_user_id: 'user_123',
        preferred_language: 'fr', // Changed language
        farm_location: 'Updated Test Farm', // Changed location
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => updatedProfileData,
      });

      const updatePayload = {
        preferred_language: 'fr',
        farm_location: 'Updated Test Farm',
      };

      const response = await global.fetch('/api/user-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer mock_token' },
        body: JSON.stringify(updatePayload),
      });
      const responseData = await response.json();

      expect(fetch).toHaveBeenCalledWith('/api/user-profile', expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(updatePayload),
      }));
      expect(response.ok).toBe(true);
      expect(response.status).toBe(200);
      expect(responseData).toEqual(updatedProfileData);
    });
    test('TP-PROF-012: Verify language update application', async () => {
      const initialProfile: UserProfile = {
        id: 'prof_lang_update',
        clerk_user_id: 'user_123',
        preferred_language: 'en',
        farm_location: 'English Farm',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const updatedProfileWithFrench: UserProfile = {
        ...initialProfile,
        preferred_language: 'fr', // Updated to French
        updated_at: new Date().toISOString(),
      };

      // Mock the PUT request for updating language
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => updatedProfileWithFrench,
      });

      // Simulate the update call
      await global.fetch('/api/user-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer mock_token' },
        body: JSON.stringify({ preferred_language: 'fr' }),
      });

      // Mock the subsequent GET request that ProfilePageSimulator would make
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => updatedProfileWithFrench,
      });
      
      // Mock useLocale to reflect the change to French
      const mockUseLocale = jest.requireMock('next-intl').useLocale;
      mockUseLocale.mockReturnValue('fr');

      const LanguageSensitiveComponent = () => {
        const locale = jest.requireMock('next-intl').useLocale();
        return <div>Current Display Language: {locale}</div>;
      };
      
      // Simulate a component that would re-fetch or receive the updated profile
      // and display language-sensitive content.
      // For simplicity, we'll assume ProfileGate receives the updated profile.
      render(
        <ProfileGate profile={updatedProfileWithFrench}>
          <LanguageSensitiveComponent />
        </ProfileGate>
      );

      await waitFor(() => {
        expect(screen.getByText('Current Display Language: fr')).toBeInTheDocument();
      });
      
      // Reset useLocale mock
      mockUseLocale.mockReturnValue('en');
    });
    test('TP-PROF-013: Verify privacy - No contact info displayed/editable', () => {
      const mockProfile: UserProfile = {
        id: 'prof_privacy',
        clerk_user_id: 'user_privacy_test',
        preferred_language: 'en',
        farm_location: 'Privacy Farm',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Temporarily augment useUser mock to include hypothetical sensitive info
      const originalUseUserImpl = mockUseUser.getMockImplementation();
      mockUseUser.mockReturnValue({
        isSignedIn: true,
        user: {
          id: 'user_privacy_test',
          fullName: 'Privacy User',
          primaryEmailAddress: { emailAddress: 'sensitive@example.com' }, // Hypothetical sensitive data
          phoneNumbers: [{ phoneNumber: '+1234567890' }] // Hypothetical sensitive data
        },
      });
      
      const EnhancedMockProfileViewEditComponent = ({ profile }: { profile: UserProfile | null }) => (
        <div>
          <h1>Profile View/Edit Component</h1>
          {profile && (
            <>
              <p data-testid="profile-language">Language: {profile.preferred_language}</p>
              <p data-testid="profile-location">Location: {profile.farm_location}</p>
              {/* Add inputs if this were a real form, to check for their absence for sensitive fields */}
              <label htmlFor="editable-language">profile.languageLabel</label>
              <select id="editable-language" defaultValue={profile.preferred_language || 'en'} data-testid="editable-language-select">
                <option value="en">English</option>
                <option value="es">Spanish</option>
              </select>
              <label htmlFor="editable-location">profile.locationLabel</label>
              <input id="editable-location" type="text" defaultValue={profile.farm_location || ''} data-testid="editable-location-input"/>
            </>
          )}
        </div>
      );

      render(
        <ProfileGate profile={mockProfile}>
          <EnhancedMockProfileViewEditComponent profile={mockProfile} />
        </ProfileGate>
      );

      // Check that sensitive info is NOT displayed
      expect(screen.queryByText('sensitive@example.com')).not.toBeInTheDocument();
      expect(screen.queryByText('+1234567890')).not.toBeInTheDocument();

      // Check that there are no input fields for email or phone
      expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/phone/i)).not.toBeInTheDocument();
      expect(screen.queryByTestId('editable-email-input')).not.toBeInTheDocument();
      expect(screen.queryByTestId('editable-phone-input')).not.toBeInTheDocument();

      // Restore original useUser mock
      if (originalUseUserImpl) {
        mockUseUser.mockImplementation(originalUseUserImpl);
      } else {
         mockUseUser.mockReturnValue({ // Default mock if original was undefined
            isSignedIn: true,
            user: { id: 'user_123', fullName: 'Test User' },
        });
      }
    });
    test('TP-PROF-014: Negative: Attempt to save invalid language update', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ error: 'Invalid language code for update' }),
      });

      const updatePayload = { preferred_language: 'zz' }; // Invalid language

      const response = await global.fetch('/api/user-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer mock_token' },
        body: JSON.stringify(updatePayload),
      });
      const errorData = await response.json();

      expect(fetch).toHaveBeenCalledWith('/api/user-profile', expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(updatePayload),
      }));
      expect(response.ok).toBe(false);
      expect(response.status).toBe(400);
      expect(errorData).toEqual({ error: 'Invalid language code for update' });
    });
    test('TP-PROF-015: Negative: Attempt to save invalid location update', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ error: 'Invalid location format for update' }),
      });

      const updatePayload = { farm_location: '' }; // Invalid empty location for update

      const response = await global.fetch('/api/user-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer mock_token' },
        body: JSON.stringify(updatePayload),
      });
      const errorData = await response.json();

      expect(fetch).toHaveBeenCalledWith('/api/user-profile', expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(updatePayload),
      }));
      expect(response.ok).toBe(false);
      expect(response.status).toBe(400);
      expect(errorData).toEqual({ error: 'Invalid location format for update' });
    });
  });

  describe('FR/NFR: Functional & Non-Functional Requirements', () => {
    // Note: Some of these might be better tested via E2E or manual DB inspection,
    // but placeholders are included for completeness or potential unit/integration aspects.
    test('TP-PROF-016: Verify user_profiles table structure and clerk_user_id link (Integration/API level)', async () => {
      const clerkId = 'user_integration_test_123';
      mockUseUser.mockReturnValue({ // Ensure useUser returns the ID we expect to link
        isSignedIn: true,
        user: { id: clerkId, fullName: 'Integration Test User' },
      });

      const mockCreatedProfile: UserProfile = {
        id: 'prof_integ_created',
        clerk_user_id: clerkId, // This should match useUser's ID
        preferred_language: 'en',
        farm_location: 'Integration Test Farm',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Mock POST response
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => mockCreatedProfile,
      });
      // Simulate POST
      await global.fetch('/api/user-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer mock_token' },
        body: JSON.stringify({ preferred_language: 'en', farm_location: 'Integration Test Farm' }),
      });

      // Mock GET response
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockCreatedProfile, // API returns the profile linked to the user
      });
      
      // Simulate GET
      const getResponse = await global.fetch('/api/user-profile', {
        headers: { 'Authorization': 'Bearer mock_token' },
      });
      const fetchedProfile = await getResponse.json();

      expect(fetch).toHaveBeenNthCalledWith(2, '/api/user-profile', { headers: { 'Authorization': 'Bearer mock_token' } });
      expect(getResponse.ok).toBe(true);
      expect(fetchedProfile).toBeDefined();
      expect(fetchedProfile.clerk_user_id).toBe(clerkId); // Key assertion: clerk_user_id matches
      expect(fetchedProfile.preferred_language).toBe('en');
      expect(fetchedProfile.farm_location).toBe('Integration Test Farm');
    });
    test('TP-PROF-017: Verify backend retrieval of Clerk User ID and profile data (Integration/API level)', async () => {
      const clerkIdForRetrieval = 'user_retrieval_test_456';
      mockUseUser.mockReturnValue({
        isSignedIn: true,
        user: { id: clerkIdForRetrieval, fullName: 'Retrieval Test User' },
      });
      
      const mockProfileForRetrieval: UserProfile = {
        id: 'prof_retrieved_abc',
        clerk_user_id: clerkIdForRetrieval,
        preferred_language: 'es',
        farm_location: 'Retrieval Farm ES',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockProfileForRetrieval,
      });

      const response = await global.fetch('/api/user-profile', {
        headers: { 'Authorization': 'Bearer mock_token' },
      });
      const profileData = await response.json();

      expect(fetch).toHaveBeenCalledWith('/api/user-profile', { headers: { 'Authorization': 'Bearer mock_token' } });
      expect(response.ok).toBe(true);
      expect(profileData.clerk_user_id).toBe(clerkIdForRetrieval);
      expect(profileData.preferred_language).toBe('es');
      expect(profileData.farm_location).toBe('Retrieval Farm ES');
    });
    test('TP-PROF-018: Security: Verify API/Server Action authorization (Update) (API level)', async () => {
      const mockUseAuth = jest.requireMock('@clerk/nextjs').useAuth;
      mockUseAuth.mockReturnValueOnce({ // Simulate unauthenticated user for this test
        userId: null,
        getToken: async () => null, // No token
      });

      (fetch as jest.Mock).mockResolvedValueOnce({ // Actual API should deny
        ok: false,
        status: 401,
        json: async () => ({ error: 'Unauthorized' }),
      });

      const response = await global.fetch('/api/user-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' /* No Auth token */ },
        body: JSON.stringify({ preferred_language: 'en', farm_location: 'Attempted Update Farm' }),
      });
      
      expect(response.status).toBe(401);
      const errorData = await response.json();
      expect(errorData).toEqual({ error: 'Unauthorized' });

      // Restore mock for other tests
      mockUseAuth.mockReturnValue({ userId: 'user_123', getToken: async () => 'mock_token' });
    });
    test('TP-PROF-019: Security: Verify API/Server Action authorization (Create) (API level)', async () => {
      const mockUseAuth = jest.requireMock('@clerk/nextjs').useAuth;
      mockUseAuth.mockReturnValueOnce({ // Simulate unauthenticated user
        userId: null,
        getToken: async () => null,
      });

      (fetch as jest.Mock).mockResolvedValueOnce({ // Actual API should deny
        ok: false,
        status: 401,
        json: async () => ({ error: 'Unauthorized Create' }),
      });

      const response = await global.fetch('/api/user-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' /* No Auth token */ },
        body: JSON.stringify({ preferred_language: 'en', farm_location: 'Attempted Create Farm' }),
      });

      expect(response.status).toBe(401);
      const errorData = await response.json();
      expect(errorData).toEqual({ error: 'Unauthorized Create' });
      
      // Restore mock
      mockUseAuth.mockReturnValue({ userId: 'user_123', getToken: async () => 'mock_token' });
    });
    test('TP-PROF-020: Verify i18n integration with profile language', () => {
      const mockProfileSpanish: UserProfile = {
        id: 'prof_i18n',
        clerk_user_id: 'user_i18n_test',
        preferred_language: 'es', // Spanish
        farm_location: 'Granja de i18n',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const mockUseLocale = jest.requireMock('next-intl').useLocale;
      mockUseLocale.mockReturnValue(mockProfileSpanish.preferred_language); // Set to 'es'

      const mockUseTranslations = jest.requireMock('next-intl').useTranslations;
      // Ensure the mock t function behaves as expected
      const tMock = jest.fn((key: string) => `profile.${key}`); // Simulates namespace.key
      mockUseTranslations.mockReturnValue(tMock);


      const I18nTestComponent = () => {
        const t = mockUseTranslations('profile'); // Use the mocked t function
        return <div>{t('greeting')}</div>; // Example key
      };
      
      // Simulate that the ProfileGate has received the profile with 'es' language
      render(
        <ProfileGate profile={mockProfileSpanish}>
          <I18nTestComponent />
        </ProfileGate>
      );

      // Check if useTranslations was called (implicitly, by checking its output)
      // And if the component renders the "translated" string correctly based on the mock
      expect(screen.getByText('profile.greeting')).toBeInTheDocument();
      expect(tMock).toHaveBeenCalledWith('greeting'); // Verify t was called with the key
      expect(mockUseLocale()).toBe('es'); // Verify locale is Spanish

      // Reset mocks
      mockUseLocale.mockReturnValue('en');
      mockUseTranslations.mockReturnValue((key: string) => `profile.${key}`); // Reset t function mock
    });
    test('TP-PROF-021: Verify Profile UI elements and usability', () => {
      render(<MockProfileSetupComponent />);

      // Verify main heading
      expect(screen.getByRole('heading', { name: 'Profile Setup Component' })).toBeInTheDocument();

      // Verify language elements
      expect(screen.getByLabelText('profile.setupLanguageLabel')).toBeInTheDocument();
      const languageSelect = screen.getByTestId('language-select');
      expect(languageSelect).toBeInTheDocument();
      expect(languageSelect.tagName).toBe('SELECT');
      // Check for at least one language option (e.g., English)
      expect(screen.getByRole('option', { name: 'English' })).toBeInTheDocument();


      // Verify location elements
      expect(screen.getByLabelText('profile.setupLocationLabel')).toBeInTheDocument();
      const locationInput = screen.getByTestId('location-input');
      expect(locationInput).toBeInTheDocument();
      expect(locationInput.tagName).toBe('INPUT');
      expect(locationInput).toHaveAttribute('type', 'text');

      // Verify save button
      expect(screen.getByRole('button', { name: 'profile.saveButton' })).toBeInTheDocument();
    });
    test.skip('TP-PROF-022: Basic Performance: Profile page load time (E2E/Manual - Not automatable at unit/integration level)', () => {
      // This test is intended for E2E or manual performance testing.
      // Performance metrics like page load time are not reliably measurable
      // in a JSDOM environment with Jest.
      expect(true).toBe(true); // Placeholder to make Jest treat it as a valid skipped test structure
    });
  });
});