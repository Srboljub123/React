/* eslint-disable @typescript-eslint/naming-convention */
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './en.json'
import pt from './pt.json'

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: {
            en,
            pt,
        },

        lng: 'en',

        fallbackLng: 'en',

        interpolation: {
            escapeValue: true,
        },

        react: {
            bindI18n: 'languageChanged loaded',
            nsMode: 'default',
        },
    })

export { default } from 'i18next'
