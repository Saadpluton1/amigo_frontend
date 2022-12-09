import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import TRANSLATION_EN from "./locales/en/translation.json";
import TRANSLATION_CHI from "./locales/chi/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)

  .init({
    debug: true,
    fallbackLng: "en",

    resources: {
      en: {
        translation: TRANSLATION_EN,
      },
      chi: {
        translation: TRANSLATION_CHI,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
