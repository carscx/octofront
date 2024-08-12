import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enJSON from '../locales/en.json'
import esJSON from '../locales/es.json'
import LanguageDetector from 'i18next-browser-languagedetector'

import esPrinterStatusJSON from '@/components/PrinterStatus/es.json'
import enPrinterStatusJSON from '@/components/PrinterStatus/en.json'

// Features

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: enJSON,
      es: esJSON,
    },
    lng: 'es',
    fallbackLng: 'es',
    defaultNS: 'common',
    fallbackNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  })

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
i18n.services.formatter.add('lowercase', (value: string) => {
  return value.toLowerCase()
})

i18n.addResourceBundle('en', 'features', {
  PrinterStatus: enPrinterStatusJSON,
})

i18n.addResourceBundle('es', 'features', {
  PrinterStatus: esPrinterStatusJSON,
})

export default i18n
