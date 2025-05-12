/** @jest-environment jsdom */
// __tests__/features/auth-profile/auth-profile.ui.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserProfileFormWrapper from '@/components/profile/UserProfileFormWrapper'; // Import the wrapper
import { UserProfile } from '@/types/userProfile';
import { useUser } from '@clerk/nextjs'; // Import useUser *after* mocking Clerk
import { within } from '@testing-library/react'; // Import within
// Mock next-intl - Adjust if ProfilePage uses getTranslations differently
jest.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) => {
     // Provide simple mock translations matching UserProfileForm.test.tsx
     const translations: { [key: string]: string } = {
        'profile.form.nameLabel': 'Display Name',
        'profile.form.namePlaceholder': 'Enter your display name',
        'profile.form.languageLabel': 'Preferred Language',
        'profile.form.languagePlaceholder': '-- Select Language --',
        'profile.form.languageRequired': 'Language is required',
        'profile.form.locationLabel': 'Farm Location',
        'profile.form.locationPlaceholder': 'e.g., City, Country',
        'profile.form.locationRequired': 'Location is required',
        'profile.form.saveButton': 'Save Profile',
        'profile.form.submittingButton': 'Saving...',
        'profile.languages.en': 'English',
        'profile.languages.es': 'Spanish',
        'profile.languages.hi': 'Hindi',
        'profile.languages.ta': 'Tamil',
      };
      return translations[`${namespace}.${key}`] || `${namespace}.${key}`;
  },
  useLocale: () => 'en', // Mock locale hook
  // Mock getTranslations if needed for server component testing (more complex)
}));

// Mock fetch for API calls made by UserProfileFormWrapper
global.fetch = jest.fn();

// Mock next/navigation
const mockRouterRefresh = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: mockRouterRefresh,
    push: jest.fn(), // Add push if needed later
  }),
  // Mock other exports like usePathname if needed
}));

// Mock Clerk's useUser hook
jest.mock('@clerk/nextjs', () => ({
  useUser: jest.fn(),
}));

const mockUseUser = useUser as jest.Mock; // Type cast for easier mocking

// --- Test Data ---
const mockInitialProfile: UserProfile = {
  id: 'prof_ui_1',
  clerk_user_id: 'user_clerk_ui_123',
  name: 'UI Test User',
  farm_location: 'UI Test Farm, World',
  preferred_language: 'en',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockUpdatedProfile: UserProfile = {
    ...mockInitialProfile,
    name: 'Updated UI User', // Keep name same as initial for some tests unless changed
    farm_location: 'Updated Farm, Galaxy',
    preferred_language: 'es',
    updated_at: new Date(Date.now() + 1000).toISOString(),
};

// --- beforeEach Setup ---
beforeEach(() => {
  // Reset mocks before each test
  jest.clearAllMocks();
  (global.fetch as jest.Mock).mockClear();
  mockRouterRefresh.mockClear();

  // Default mock implementations
  mockUseUser.mockReturnValue({
    isSignedIn: true,
    user: { id: mockInitialProfile.clerk_user_id, fullName: mockInitialProfile.name },
  });
  (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockUpdatedProfile, // Default success response
      text: async () => JSON.stringify(mockUpdatedProfile),
  });
});
// Import the relevant components, e.g., UserProfileForm, ProfilePage, etc.
// import UserProfileForm from 'components/profile/UserProfileForm'; // Example
// import ProfilePage from 'app/[locale]/profile/page'; // Example

// Mock dependencies (API calls, hooks, context, Clerk/NextAuth)
// jest.mock('lib/userProfile'); // Example: Mocking API functions
// jest.mock('next/navigation', () => ({ useRouter: jest.fn() })); // Example
// jest.mock('@clerk/nextjs', () => ({ // Example Clerk mock
//   useUser: () => ({ isSignedIn: true, user: { id: 'user_123', fullName: 'Test User' } }),
//   UserProfile: () => <div>Mock User Profile Component</div>, // Mock Clerk components if used directly
// }));

describe('Authentication & User Profile Management UI/Component Tests', () => {

  describe('Initial Profile Setup Flow', () => {
    // Note: Some of these might be better as E2E tests depending on implementation
    it('TC-PROF-001: should guide user to setup flow on first login (if profile incomplete)', () => {
      // TODO: Implement test logic
      // 1. Render the relevant component/page in a state simulating first login (e.g., mock API returning 404)
      // 2. Assert that the setup UI (e.g., specific form or message) is displayed.
      expect(true).toBe(true); // Placeholder
    });

    it('TC-PROF-002: should allow selecting a preferred language during initial setup', async () => {
      // Render the wrapper with null profile for setup
      render(<UserProfileFormWrapper initialProfile={null} />);

      const languageSelect = screen.getByLabelText(/Preferred Language/); // Use regex to be more flexible
      fireEvent.change(languageSelect, { target: { value: 'es' } });

      // Assert the select value changed
      expect(languageSelect).toHaveValue('es');
    });

    it('TC-PROF-003: should allow inputting farm location during initial setup', async () => {
       // Render the wrapper with null profile for setup
       render(<UserProfileFormWrapper initialProfile={null} />);

       const locationInput = screen.getByLabelText(/Farm Location/); // Use regex
       fireEvent.change(locationInput, { target: { value: 'New Farm Location' } });

       expect(locationInput).toHaveValue('New Farm Location');
    });

    it('TC-PROF-006: should reflect chosen language immediately after setup (UI update)', async () => {
        // TODO: Implement test logic (might require context/state mocking)
        // 1. Render the application shell or relevant component post-setup.
        // 2. Mock the state/context to reflect the newly chosen language.
        // 3. Assert that UI elements (e.g., text labels) are rendered in the selected language.
        expect(true).toBe(true); // Placeholder
      });
  });

  describe('Profile Viewing & Editing Page', () => {
    // Assume rendering UserProfileFormWrapper which contains the form
    it('TC-PROF-010: should allow navigation to the Profile section (component renders)', () => {
      render(<UserProfileFormWrapper initialProfile={mockInitialProfile} />);

      // Check for key elements rendered by the form within the wrapper using regex for labels
      expect(screen.getByLabelText(/Display Name/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Preferred Language/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Farm Location/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Save Profile' })).toBeInTheDocument(); // Exact match for button should be fine
    });

    it('TC-PROF-011: should display current language and location from fetched data', async () => {
      // The wrapper receives initialProfile prop, simulating fetched data
      render(<UserProfileFormWrapper initialProfile={mockInitialProfile} />);

      // Assert form fields are populated correctly using regex for labels
      expect(screen.getByLabelText(/Preferred Language/)).toHaveValue(mockInitialProfile.preferred_language);
      expect(screen.getByLabelText(/Farm Location/)).toHaveValue(mockInitialProfile.farm_location);
    });

    it('TC-PROF-012: should display user name (read-only if from Clerk)', async () => {
        // The wrapper receives initialProfile prop which includes name
        render(<UserProfileFormWrapper initialProfile={mockInitialProfile} />);

        const nameInput = screen.getByLabelText(/Display Name/); // Use regex
        expect(nameInput).toHaveValue(mockInitialProfile.name);
        // Note: The current UserProfileForm doesn't enforce read-only based on Clerk data source.
        // This test might need adjustment based on actual requirements or form implementation.
        // For now, just check the value is displayed.
        // expect(nameInput).toBeReadOnly(); // Add this if the input should be read-only
      });

    it('TC-PROF-013: should NOT display private contact info (email/phone from Clerk)', () => {
        // Mock Clerk user with extra info
        mockUseUser.mockReturnValue({
            isSignedIn: true,
            user: {
                id: mockInitialProfile.clerk_user_id,
                fullName: mockInitialProfile.name,
                primaryEmailAddress: { emailAddress: 'test@example.com' },
                primaryPhoneNumber: { phoneNumber: '+1234567890' },
            },
        });

        render(<UserProfileFormWrapper initialProfile={mockInitialProfile} />);

        // Assert that elements displaying email/phone are NOT present in the form
        expect(screen.queryByText('test@example.com')).not.toBeInTheDocument();
        expect(screen.queryByText('+1234567890')).not.toBeInTheDocument();
        expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
        expect(screen.queryByLabelText(/phone/i)).not.toBeInTheDocument();
      });

    it('TC-PROF-014: should allow modifying preferred language via UI control', async () => {
      render(<UserProfileFormWrapper initialProfile={mockInitialProfile} />);
      const languageSelect = screen.getByLabelText(/Preferred Language/); // Use regex

      expect(languageSelect).toHaveValue('en'); // Initial value
      fireEvent.change(languageSelect, { target: { value: 'hi' } });
      expect(languageSelect).toHaveValue('hi'); // New value
    });

    it('TC-PROF-015: should allow modifying farm location via UI control', async () => {
      render(<UserProfileFormWrapper initialProfile={mockInitialProfile} />);
      const locationInput = screen.getByLabelText(/Farm Location/); // Use regex

      expect(locationInput).toHaveValue(mockInitialProfile.farm_location); // Initial value
      fireEvent.change(locationInput, { target: { value: 'New Location Input' } });
      expect(locationInput).toHaveValue('New Location Input'); // New value
    });

    it('TC-PROF-018: should reflect updated language in UI after save and refresh/nav (state update)', async () => {
        // TODO: Implement test logic (might require mocking state/context updates post-save)
        // 1. Render the component.
        // 2. Simulate successful save triggering a state/context update for language.
        // 3. Assert UI elements now reflect the new language.
        expect(true).toBe(true); // Placeholder
      });

    it('TC-UI-001: should have clear navigation path (component structure check)', () => {
        // This test is difficult to implement meaningfully at the wrapper/form level.
        // It's better suited for the ProfilePage level or E2E testing.
        // We can check that the form itself renders within the wrapper by checking for a known element.
        render(<UserProfileFormWrapper initialProfile={mockInitialProfile} />);
        expect(screen.getByLabelText(/Display Name/)).toBeInTheDocument(); // Check a known label from the form exists
      });

    it('TC-UI-002: should have intuitive layout and labelled fields', () => {
        render(<UserProfileFormWrapper initialProfile={mockInitialProfile} />);
        // Check labels exist for required fields using regex for labels
        expect(screen.getByLabelText(/Display Name/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Preferred Language/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Farm Location/)).toBeInTheDocument();
      });

    it('TC-UI-003: should contain all supported languages in the dropdown', () => {
        render(<UserProfileFormWrapper initialProfile={mockInitialProfile} />);
        const languageSelect = screen.getByLabelText(/Preferred Language/); // Use regex
        // Check for specific options based on the mock translations/form setup using actual names
        expect(within(languageSelect).getByRole('option', { name: 'English' })).toBeInTheDocument();
        expect(within(languageSelect).getByRole('option', { name: 'Spanish' })).toBeInTheDocument();
        expect(within(languageSelect).getByRole('option', { name: 'Hindi' })).toBeInTheDocument();
        expect(within(languageSelect).getByRole('option', { name: 'Tamil' })).toBeInTheDocument();
        // Check placeholder exists using actual text
        expect(within(languageSelect).getByRole('option', { name: '-- Select Language --' })).toBeInTheDocument();
        expect(within(languageSelect).getByRole('option', { name: '-- Select Language --' })).toBeDisabled();
      });

    it('TC-UI-004: should use an appropriate input for location (text input)', () => {
        render(<UserProfileFormWrapper initialProfile={mockInitialProfile} />);
        const locationInput = screen.getByLabelText(/Farm Location/); // Use regex
        expect(locationInput).toHaveAttribute('type', 'text');
      });

    it('TC-UI-005: should show visual feedback (e.g., toast) on save success', async () => {
        render(<UserProfileFormWrapper initialProfile={mockInitialProfile} />);

        // Simulate form changes (optional, but good practice)
        fireEvent.change(screen.getByLabelText(/Farm Location/), { target: { value: 'Updated Farm, Galaxy' } });
        fireEvent.change(screen.getByLabelText(/Preferred Language/), { target: { value: 'es' } });

        // Submit using actual button text
        fireEvent.click(screen.getByRole('button', { name: 'Save Profile' }));

        // Wait for success message (defined in UserProfileFormWrapper)
        expect(await screen.findByText('Profile updated successfully!')).toBeInTheDocument();

        // Check API call
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledWith('/api/user-profile', expect.objectContaining({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            }));
            // More robust check for body content, independent of property order
            const fetchCall = (global.fetch as jest.Mock).mock.calls[0];
            expect(fetchCall[0]).toBe('/api/user-profile'); // Check URL separately
            const sentBody = JSON.parse(fetchCall[1].body);
            expect(sentBody).toEqual({
                name: mockInitialProfile.name,
                preferred_language: 'es',
                farm_location: 'Updated Farm, Galaxy',
            });
        });

        // Check router refresh was called
        expect(mockRouterRefresh).toHaveBeenCalledTimes(1);
      });

    it('TC-UI-006: should show visual feedback on save failure', async () => {
        // Mock fetch to return an error
        const errorMessage = 'API Save Failed';
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 500,
            text: async () => errorMessage,
        });

        render(<UserProfileFormWrapper initialProfile={mockInitialProfile} />);

        // Submit using actual button text
        fireEvent.click(screen.getByRole('button', { name: 'Save Profile' }));

        // Wait for error message
        expect(await screen.findByText(errorMessage)).toBeInTheDocument();

        // Check API call
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        // Ensure success message is not shown
        expect(screen.queryByText('Profile updated successfully!')).not.toBeInTheDocument();
        // Ensure router refresh was NOT called on failure
        expect(mockRouterRefresh).not.toHaveBeenCalled();
      });

    it('TC-UI-007: should respect selected preferred_language for the entire profile page UI', () => {
        // TODO: Implement test logic (Requires i18n setup for tests)
        // 1. Set up i18n mocks/providers for a specific language (e.g., 'es').
        // 2. Render the Profile page/component.
        // 3. Assert that key text elements (labels, buttons) are displayed in the selected language ('es').
        expect(true).toBe(true); // Placeholder
      });

    it('TC-UI-008: should disable form fields/button during save operation', async () => {
        // Mock fetch to return a promise that never resolves (simulates pending)
        (global.fetch as jest.Mock).mockReturnValueOnce(new Promise(() => {}));

        render(<UserProfileFormWrapper initialProfile={mockInitialProfile} />);

        // Submit using actual button text
        const submitButton = screen.getByRole('button', { name: 'Save Profile' });
        fireEvent.click(submitButton);

        // Button should be disabled and show submitting text (using actual text)
        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'Saving...' })).toBeDisabled();
        });

        // Optionally check if other fields are disabled (depends on desired UX)
        // expect(screen.getByLabelText('Preferred Language')).toBeDisabled();
        // expect(screen.getByLabelText('Farm Location')).toBeDisabled();
      });

    it('TC-NEG-003: should handle network error during save gracefully (UI feedback)', async () => {
        // Mock fetch to throw a network error
        const networkErrorMessage = 'Network Error Occurred';
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error(networkErrorMessage));

        render(<UserProfileFormWrapper initialProfile={mockInitialProfile} />);

        // Submit using actual button text
        fireEvent.click(screen.getByRole('button', { name: 'Save Profile' }));

        // Wait for error message
        expect(await screen.findByText(networkErrorMessage)).toBeInTheDocument();

        // Check API call attempt
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });
        expect(mockRouterRefresh).not.toHaveBeenCalled();
      });

    it('TC-NEG-004: should handle API 500 error during save gracefully (UI feedback)', async () => {
        // This is effectively the same as TC-UI-006, just confirming the naming
        const errorMessage = 'Internal Server Error';
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 500,
            text: async () => errorMessage,
        });

        render(<UserProfileFormWrapper initialProfile={mockInitialProfile} />);
        fireEvent.click(screen.getByRole('button', { name: 'Save Profile' })); // Use actual button text
        expect(await screen.findByText(errorMessage)).toBeInTheDocument();
        await waitFor(() => { expect(global.fetch).toHaveBeenCalledTimes(1); });
        expect(mockRouterRefresh).not.toHaveBeenCalled();
      });

    it('TC-EDGE-003: should handle accessing profile page immediately after login (data fetching state)', async () => {
        // TODO: Implement test logic
        // 1. Mock the API/hook to simulate a loading state initially.
        // 2. Render the component.
        // 3. Assert that a loading indicator (spinner, skeleton screen) is displayed.
        // 4. (Optional) Resolve the mock data fetch and assert the loading indicator disappears and data is shown.
        expect(true).toBe(true); // Placeholder
      });
  });
});