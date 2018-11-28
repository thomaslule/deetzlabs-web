import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';

const currentLanguage = localStorage.getItem('lang') || navigator.language.split('-')[0];

i18n
  .use(reactI18nextModule)
  .init({
    resources: {
      en: { translation: translationEN },
      fr: { translation: translationFR },
    },
    lng: currentLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
