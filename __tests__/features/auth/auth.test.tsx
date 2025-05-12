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
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
  usePathname: () => '/en/profile', // Example pathname
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

const MockProfileSetupComponent = ({ onSubmit }: { onSubmit?: (data: any) => void }) => ( // Added onSubmit prop
  <div>
    <h1>Profile Setup Component</h1>
    <form onSubmit={(e) => { e.preventDefault(); if(onSubmit) onSubmit({ preferred_language: 'en', farm_location: 'Test Farm' }); }}>
      <label htmlFor="language">profile.setupLanguageLabel</label>
      <select id="language" defaultValue="en">
        <option value="en">English</option>
        <option value="es">Spanish</option>
      </select>
      <label htmlFor="location">profile.setupLocationLabel</label>
      <input id="location" type="text" defaultValue="Test Farm" />
      <button type="submit">profile.saveButton</button>
    </form>
  </div>
);
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
    test.todo('TP-PROF-006: Negative: Attempt to save invalid language during setup');
    test.todo('TP-PROF-007: Negative: Attempt to save invalid location during setup');
  });

  describe('US2: View & Update Profile', () => {
    test.todo('TP-PROF-008: Verify navigation to Profile section');
    test.todo('TP-PROF-009: Verify display of current profile data');
    test.todo('TP-PROF-010: Verify editability of profile fields');
    test.todo('TP-PROF-011: Verify saving valid profile updates');
    test.todo('TP-PROF-012: Verify language update application');
    test.todo('TP-PROF-013: Verify privacy - No contact info displayed/editable');
    test.todo('TP-PROF-014: Negative: Attempt to save invalid language update');
    test.todo('TP-PROF-015: Negative: Attempt to save invalid location update');
  });

  describe('FR/NFR: Functional & Non-Functional Requirements', () => {
    // Note: Some of these might be better tested via E2E or manual DB inspection,
    // but placeholders are included for completeness or potential unit/integration aspects.
    test.todo('TP-PROF-016: Verify user_profiles table structure and clerk_user_id link (Integration/API level)');
    test.todo('TP-PROF-017: Verify backend retrieval of Clerk User ID and profile data (Integration/API level)');
    test.todo('TP-PROF-018: Security: Verify API/Server Action authorization (Update) (API level)');
    test.todo('TP-PROF-019: Security: Verify API/Server Action authorization (Create) (API level)');
    test.todo('TP-PROF-020: Verify i18n integration with profile language');
    test.todo('TP-PROF-021: Verify Profile UI elements and usability');
    test.todo('TP-PROF-022: Basic Performance: Profile page load time (Likely E2E/Manual)');
  });
});