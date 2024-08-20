import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend'; // Import HttpApi

i18n
    .use(HttpApi) // Load translation using http backend
    .use(LanguageDetector) // Detect user language
    .use(initReactI18next) // Passes i18n down to react-i18next
    .init({
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false // React already safes from XSS
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json' // Path to translation files
        }
    });

export default i18n;