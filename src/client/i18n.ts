import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from '../utils/locales/en/translation.json'
import zhTW from '../utils/locales/zhTW/translation.json'

const resources = {
  en: {
    translation: en,
  },
  'zh-TW': {
    translation: zhTW,
  },
}

const availableLanguages = ['en', 'zh-TW']
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    detection: {
      order: ['navigator'],
    },
    whitelist: availableLanguages,
    nonExplicitWhitelist: true,
    // debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })

export default i18n
