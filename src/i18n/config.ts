import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import enJSON from '@/i18n/en.json'
import esJSON from '@/i18n/es.json'
import frJSON from '@/i18n/fr.json'

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: enJSON,
      es: esJSON,
      fr: frJSON,
    },
    lng: 'es',
    fallbackLng: 'es',
    defaultNS: 'common',
    fallbackNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
