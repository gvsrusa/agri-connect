'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation'; // Use next/navigation for client components
import { locales, localeNames } from '@/i18n'; // Assuming locales are defined here

export default function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher'); // Assuming a namespace for translations
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

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
    // Note: In a real app, you'd likely only do this if the user is authenticated.
    // We might need to add Clerk's useAuth() here later if tests require it.
    const updatePreference = async (newLocale: string) => {
      try {
        const response = await fetch('/api/user-profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ preferred_language: newLocale }),
        });
        if (!response.ok) {
          console.error('Failed to update language preference:', response.statusText);
          // Handle error display to user if needed
        } else {
          console.log('User language preference updated successfully.');
        }
      } catch (error) {
        console.error('Error updating language preference:', error);
        // Handle error display to user if needed
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
    </div>
  );
}