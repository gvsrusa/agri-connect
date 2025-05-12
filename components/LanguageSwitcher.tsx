'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation'; // Use standard Next.js navigation
import { ChangeEvent, useTransition } from 'react';
import { locales as supportedLocales } from '@/i18n'; // Import supported locales

// Define locale names for display
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

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('LanguageSwitcher'); // Assuming a namespace for translations

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;
    startTransition(() => {
      // Manually construct the new path with the selected locale
      if (pathname) {
        const segments = pathname.split('/');
        // Assuming locale is the first segment after the initial '/' (e.g., /en/dashboard -> segments[1] is 'en')
        // If the default locale is not prefixed, this logic needs adjustment.
        // For now, assume prefixing for all locales including default.
        segments[1] = nextLocale;
        const newPath = segments.join('/');
        router.push(newPath); // Use standard push with the full new path
      }
    });

    // TODO: Add API call here to update user profile if logged in
    // This will require checking auth status (e.g., using Clerk's useAuth)
    // and making a fetch request.
  };

  return (
    <div className="relative">
      <label htmlFor="language-select" className="sr-only">
        {t('languageSwitcherLabel')} {/* Example translation key */}
      </label>
      <select
        id="language-select"
        value={locale}
        onChange={handleChange}
        disabled={isPending}
        className="block appearance-none w-full bg-gray-100 border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        aria-label={t('languageSwitcherLabel')}
      >
        {supportedLocales.map((loc) => (
          <option key={loc} value={loc}>
            {localeNames[loc] || loc} {/* Display name or code as fallback */}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  );
}