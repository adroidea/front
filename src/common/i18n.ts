import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../locales/en.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export interface ILanguage {
    nativeName: string;
    countryCode: string;
}

export interface ILanguages {
    [key: string]: ILanguage;
}

export const lngs: ILanguages = {
    en: { nativeName: 'English', countryCode: 'gb' },
    es: { nativeName: 'Español', countryCode: 'es' },
    fr: { nativeName: 'Français', countryCode: 'fr' }
};

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        },
        resources: {
            fr,
            en,
            es
        }
    });

export default i18n;
