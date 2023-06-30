import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languageDetectorPlugin from "./languageDetectorPlugin";

// common.json -> Things that are reused everywhere, eg. Button labels 'save', 'cancel'
import common_en from "./en/common.json";
import common_es from "./es/common.json";

// validation.json -> All validation texts
import validaion_en from "./en/validation.json";
import validaion_es from "./es/validation.json";

// glossary.json -> Words we want to be reused consistently inside texts
import glossary_en from "./en/glossary.json";
import glossary_es from "./es/glossary.json";

i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    ns: ["common", "validation", "glossary"],
    defaultNS: "common",
    resources: {
      en: {
        common: common_en,
        validation: validaion_en,
        glossary: glossary_en,
      },
      es: {
        common: common_es,
        validation: validaion_es,
        glossary: glossary_es,
      },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    compatibilityJSON: "v3",
    supportedLngs: ["en", "es"],
  });

export default i18n;
