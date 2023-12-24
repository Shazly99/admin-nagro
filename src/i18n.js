import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['ar', 'en'],
    fallbackLng: 'ar',
    lng: 'ar', // Set the default language to Arabic
    debug: false,
    detection: {
      order: ['cookie', 'localStorage', 'path', 'htmlTag'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

export default i18next;
