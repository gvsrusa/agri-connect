import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import translation files
import en from './translations/en.json';
import hi from './translations/hi.json';
import mr from './translations/mr.json';

const resources = {
  en: {
    translation: en,
  },
  hi: {
    translation: hi,
  },
  mr: {
    translation: mr,
  },
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: (lang: string) => void) => {
    try {
      const language = await AsyncStorage.getItem('user-language');
      if (language) {
        return callback(language);
      } else {
        return callback('en'); // Default language
      }
    } catch (error) {
      console.error('Error fetching language from AsyncStorage', error);
      return callback('en'); // Fallback to default language on error
    }
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem('user-language', language);
    } catch (error) {
      console.error('Error caching language to AsyncStorage', error);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react-i18next already safes from xss
    },
  });

export default i18n;