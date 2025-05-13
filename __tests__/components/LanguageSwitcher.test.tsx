/** @jest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import LanguageSwitcher from '@/components/LanguageSwitcher'; // Adjust path if needed
import { usePathname, useRouter } from 'next/navigation'; // Mock these (Reverted)
import { useLocale, useTranslations } from 'next-intl'; // Mock these

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
it('reproduces TypeError from fetch with relative URL when language changes', async () => {
    // This test is designed to FAIL if the bug (TypeError from fetch) is present.
    // The failure indicates successful reproduction of the bug.
    // We are not mocking global.fetch here, relying on JSDOM's default fetch.

    render(<LanguageSwitcher />);
    const dropdown = screen.getByRole('combobox');

    // Act: Change language. This triggers updatePreference, which calls fetch.
    fireEvent.change(dropdown, { target: { value: 'hi' } });

    // Allow microtasks to process for the async fetch call and potential error.
    // If fetch throws a TypeError and it's unhandled, Jest will fail the test.
    await act(async () => {
      // Ensure any promises from the event handler have a chance to resolve or reject.
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // If the test reaches this point without an unhandled rejection,
    // it implies the TypeError was not thrown or was handled in an unexpected way.
    // In such a case, the bug is not reproduced by this test.
    // No explicit Jest assertion is made here; the test's failure is the key indicator.
  });
});