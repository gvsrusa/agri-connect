'use client';

import React, { useState } from 'react'; // Import useState
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation'; // Use next/navigation for client components
import { locales, localeNames } from '@/i18n'; // Assuming locales are defined here
import logger from '@/lib/logger'; // Import the logger

export default function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher'); // Assuming a namespace for translations
  // State to hold and display user-facing error messages if the API call to update language preferences fails.
  const [apiError, setApiError] = useState<string | null>(null); // Add state for API error
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  // Placeholder for user ID - in a real app, this would come from an auth context or similar
  const userId = 'currentUser123'; // Replace with actual user ID retrieval if available

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    // Basic path manipulation - might need refinement based on next-intl's best practices
    // Remove the current locale prefix if it exists
    const currentPathWithoutLocale = pathname.startsWith(`/${locale}`)
      ? pathname.substring(`/${locale}`.length)
      : pathname;
    // Ensure the path starts with a slash
    const newPath = `/${newLocale}${currentPathWithoutLocale.startsWith('/') ? currentPathWithoutLocale : '/' + currentPathWithoutLocale}`;

    router.push(newPath);

    // Update user profile preference via API
    const updatePreference = async (newLocale: string) => {
      try {
        setApiError(null); // Clear previous errors
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
        const response = await fetch(`${baseUrl}/api/user-profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ preferred_language: newLocale }),
        });

        if (!response.ok) {
          const errorContext = {
            component: 'LanguageSwitcher',
            event: 'updateLanguagePreferenceFailed',
            error_message: response.statusText || 'API request failed',
            status_code: response.status,
            user_id: userId, // Include user ID
            timestamp: new Date().toISOString(),
          };
          logger.error(`Failed to update language preference: ${response.status}`, errorContext);
          
          if (response.status >= 500) {
            setApiError(t('updatePreferenceErrorServer'));
          } else if (response.status >= 400) {
            // For 4xx, could be more specific if API provides details, otherwise generic client error
            setApiError(t('updatePreferenceErrorUnknown')); // Or a more specific 4xx message
          } else {
            setApiError(t('updatePreferenceErrorUnknown'));
          }
        } else {
          console.log('User language preference updated successfully.'); // Keep for non-error cases or use logger.info
        }
      } catch (error: any) {
        const errorContext = {
          component: 'LanguageSwitcher',
          event: 'updateLanguagePreferenceFailed',
          error_message: error.message || 'An unexpected error occurred',
          status_code: 'N/A', // Network errors don't have HTTP status codes
          user_id: userId, // Include user ID
          timestamp: new Date().toISOString(),
        };
        logger.error('Error updating language preference', errorContext);

        // Differentiate user-facing error based on error type
        if (error.message && (error.message.toLowerCase().includes('networkerror') || error.message.toLowerCase().includes('failed to fetch'))) {
          setApiError(t('updatePreferenceErrorNetwork'));
        } else {
          setApiError(t('updatePreferenceErrorUnknown'));
        }
      }
    };

    updatePreference(newLocale);
  };

  return (
    <div>
      <label htmlFor="language-select">{t('languageSwitcherLabel')}: </label>
      <select
        id="language-select"
        value={locale}
        onChange={handleChange}
        className="p-1 border rounded" // Basic styling
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeNames[loc as keyof typeof localeNames] || loc}
          </option>
        ))}
      </select>
      {apiError && <div style={{ color: 'red', marginTop: '8px' }}>{apiError}</div>}
    </div>
  );
}