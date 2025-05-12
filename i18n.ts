import {getRequestConfig} from 'next-intl/server';

// Define the locales your application supports
export const locales = ['en', 'hi', 'mr', 'te', 'ta', 'kn', 'ml', 'pa']; // Supported languages
export const defaultLocale = 'en';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    // Optionally, redirect to a default locale or show a 404 page
    // For simplicity, we'll load the default locale's messages
    locale = defaultLocale;
  }

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});