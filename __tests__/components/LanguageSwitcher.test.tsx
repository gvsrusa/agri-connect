/** @jest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import LanguageSwitcher from '@/components/LanguageSwitcher'; // Adjust path if needed
import { usePathname, useRouter } from 'next/navigation'; // Mock these (Reverted)
import { useLocale, useTranslations } from 'next-intl'; // Mock these
import logger from '@/lib/logger'; // Import the logger to mock it

// Mock fetch
const mockFetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Preference updated' }),
  })
);

// Mock next/navigation
jest.mock('next/navigation', () => ({ // Reverted
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock next-intl
jest.mock('next-intl', () => ({
  useLocale: jest.fn(),
  useTranslations: jest.fn(),
  // Mock navigation utilities if LanguageSwitcher uses them directly
}));

// Mock the logger
jest.mock('@/lib/logger', () => ({
  error: jest.fn(),
  // Add other methods if LanguageSwitcher uses them
}));


// Mock supported locales (should match i18n.ts)
const locales = ['en', 'hi', 'mr', 'te', 'ta', 'kn', 'ml', 'pa'];
const localeNames: { [key: string]: string } = {
  en: 'English',
  hi: 'हिन्दी',
  mr: 'मराठी',
  te: 'తెలుగు',
  ta: 'தமிழ்',
  kn: 'ಕನ್ನಡ',
  ml: 'മലയാളം',
  pa: 'ਪੰਜਾਬੀ',
};


describe('LanguageSwitcher Component', () => {
  let mockRouter: { push: jest.Mock };
  let mockPathname: string;
  let mockLocale: string;
  let mockT: jest.Mock;

  beforeEach(() => {
    // Reset mocks for each test
    mockRouter = { push: jest.fn() };
    mockPathname = '/en/some/path'; // Include locale prefix in mock
    mockLocale = 'en'; // Default locale for testing
    mockT = jest.fn((key) => {
        // Simple mock translation for keys like 'languageSwitcherLabel'
        if (key === 'languageSwitcherLabel') return 'Language:';
        if (key === 'updatePreferenceError') return 'Failed to update language preference. Please try again.';
        if (key === 'updatePreferenceErrorNetwork') return 'Network connection issue. Please check your internet and try again.';
        if (key === 'updatePreferenceErrorServer') return 'Could not save your preference due to a server issue. Please try again later.';
        if (key === 'updatePreferenceErrorUnknown') return 'An unexpected error occurred. Please try again.';
        return key; // Return key if no translation is mocked
    });

    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
    (useLocale as jest.Mock).mockReturnValue(mockLocale);
    (useTranslations as jest.Mock).mockReturnValue(mockT);

  });

  test('renders correctly and displays the current language', () => {
    render(<LanguageSwitcher />);

    // Check if the label (or button text) indicating the current language is present
    // This assumes the switcher displays the current language name or code
    // Example: Check for a button/select displaying "English"
    expect(screen.getByRole('combobox')).toBeInTheDocument(); // Assuming it's a select dropdown
    expect(screen.getByDisplayValue(localeNames[mockLocale])).toBeInTheDocument(); // Check if the current language is selected
  });

  test('displays all supported languages in the dropdown', () => {
    render(<LanguageSwitcher />);
    const dropdown = screen.getByRole('combobox');
    fireEvent.mouseDown(dropdown); // Open the dropdown (adjust interaction based on actual component)

    locales.forEach(locale => {
      expect(screen.getByText(localeNames[locale])).toBeInTheDocument();
    });
  });

  test('calls router.push with the correct locale and pathname when a language is selected', () => {
    render(<LanguageSwitcher />);
    const dropdown = screen.getByRole('combobox');

    const targetLocale = 'hi'; // Select Hindi
    fireEvent.change(dropdown, { target: { value: targetLocale } });

    // Verify router.push was called correctly by next-intl's navigation wrapper
    // next-intl's usePathname and useRouter hooks handle the actual path manipulation
    // We expect the router's push method (mocked here) to be called with the *original* pathname
    // and the new locale option, letting next-intl handle the prefixing.
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    // Expect the manually constructed path: /<new_locale>/<rest_of_path>
    const expectedPath = `/${targetLocale}/some/path`; // Construct expected path based on mockPathname
    expect(mockRouter.push).toHaveBeenCalledWith(expectedPath);
  });

  // Add more tests later:
  // - Test API call for logged-in users (requires mocking auth state)
  // - Test accessibility attributes
  // This test is now modified to ensure fetch is mocked correctly and the API call is made.
  it('calls fetch when language is changed and handles the API call', async () => {
    const originalFetch = global.fetch;
    global.fetch = mockFetch as any; // Assign the mock to global.fetch

    render(<LanguageSwitcher />);
    const dropdown = screen.getByRole('combobox');

    // Act: Change language. This should trigger updatePreference.
    fireEvent.change(dropdown, { target: { value: 'hi' } });

    // Allow microtasks to process, e.g., for the fetch call and subsequent state updates
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0)); // Wait for next tick
    });

    // Assert that fetch was called with the correct parameters
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith('http://localhost/api/user-profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ preferred_language: 'hi' }),
    });

    // Restore original fetch and clear the mock for other tests
    global.fetch = originalFetch;
    mockFetch.mockClear();
  });
// This test is removed as it's obsolete due to logging refactor.
// The old bug it was testing for (specific console.error pattern for XMLHttpRequest)
// is no longer relevant with the new logger.error mechanism.
// it('FAILS if the specific XMLHttpRequest error is logged via console.error', async () => { ... });

it('displays user-facing error on API failure', async () => {
    const originalFetch = global.fetch;
    const mockApiErrorFetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'API update failed' }),
        statusText: 'Internal Server Error' // Added statusText for console.error
      })
    );
    global.fetch = mockApiErrorFetch as any;

    render(<LanguageSwitcher />);
    const dropdown = screen.getByRole('combobox');

    // Act: Change language, triggering the API call that will fail
    fireEvent.change(dropdown, { target: { value: 'hi' } });

    // Allow microtasks to process
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Assert: Check that the user-facing error message is displayed
    // This test now expects the server error message, as the mock simulates a 500 error.
    expect(screen.getByText('Could not save your preference due to a server issue. Please try again later.')).toBeInTheDocument();

    // Clean up
    global.fetch = originalFetch;
    mockApiErrorFetch.mockClear();
  });

  // This test is now updated to reflect the new structured logging and specific error messages.
  it('logs structured error and shows specific message on API server error (500)', async () => {
    const originalFetch = global.fetch;
    const mockFailedFetch = jest.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify({ error: 'Simulated API update failed' }), {
          status: 500,
          statusText: 'Internal Server Error',
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );
    global.fetch = mockFailedFetch as any;
    (logger.error as jest.Mock).mockClear(); // Clear mock before use

    // Mock React.useState to make setApiError throw an error
    const mockSetApiErrorWhichThrows = jest.fn(() => {
      throw new Error('Simulated error from setApiError');
    });
    // Simpler mock for useState given there's only one instance in the component
    const useStateSpy = jest.spyOn(React, 'useState').mockReturnValue([null, mockSetApiErrorWhichThrows] as any);

    render(<LanguageSwitcher />);
    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'es' } });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Assert logger.error was called with structured payload
    // After the fix in the component, we expect logger.error to be called only ONCE,
    // even if setApiError throws, because the new flag should prevent the second log.
    expect(logger.error).toHaveBeenCalledTimes(1);

    // The single call should be from the !response.ok block.
    // The catch block in the component should no longer log due to the errorLoggedThisAttempt flag.
    expect(logger.error).toHaveBeenCalledWith(
      'Failed to update language preference: 500',
      expect.objectContaining({
        component: 'LanguageSwitcher',
        event: 'updateLanguagePreferenceFailed',
        error_message: 'Internal Server Error', // This is from the mock fetch response
        status_code: 500,
        user_id: 'currentUser123',
        timestamp: expect.any(String),
      })
    );
    
    // Assert specific server error message is displayed
    // This message should still be set before setApiError throws.
    expect(screen.getByText('Could not save your preference due to a server issue. Please try again later.')).toBeInTheDocument();

    global.fetch = originalFetch;
    mockFailedFetch.mockClear();
    useStateSpy.mockRestore(); // Restore the original useState
  });

  it('logs structured error and shows specific message on network error', async () => {
    const originalFetch = global.fetch;
    const networkErrorMessage = 'NetworkError when attempting to fetch resource.';
    const mockNetworkErrorFetch = jest.fn(() => Promise.reject(new Error(networkErrorMessage)));
    global.fetch = mockNetworkErrorFetch as any;
    (logger.error as jest.Mock).mockClear();

    render(<LanguageSwitcher />);
    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'fr' } }); // Using 'fr' for variety

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith(
      'Error updating language preference',
      expect.objectContaining({
        component: 'LanguageSwitcher',
        event: 'updateLanguagePreferenceFailed',
        error_message: networkErrorMessage,
        status_code: 'N/A',
        user_id: 'currentUser123',
        timestamp: expect.any(String),
      })
    );

    expect(screen.getByText('Network connection issue. Please check your internet and try again.')).toBeInTheDocument();

    global.fetch = originalFetch;
    mockNetworkErrorFetch.mockClear();
  });

  it('logs structured error and shows unknown error message for other client errors (e.g., 400)', async () => {
    const originalFetch = global.fetch;
    const mockClientErrorFetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: () => Promise.resolve({ error: 'Simulated client error' }),
      })
    );
    global.fetch = mockClientErrorFetch as any;
    (logger.error as jest.Mock).mockClear();

    render(<LanguageSwitcher />);
    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'de' } }); // Using 'de'

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith(
      'Failed to update language preference: 400',
      expect.objectContaining({
        component: 'LanguageSwitcher',
        event: 'updateLanguagePreferenceFailed',
        error_message: 'Bad Request',
        status_code: 400,
        user_id: 'currentUser123',
        timestamp: expect.any(String),
      })
    );
    
    expect(screen.getByText('An unexpected error occurred. Please try again.')).toBeInTheDocument();

    global.fetch = originalFetch;
    mockClientErrorFetch.mockClear();
  });
});