import { LanguageDetectorModule } from "i18next";
import { locale } from "expo-localization";

const languageDetectorPlugin: LanguageDetectorModule = {
  type: "languageDetector",
  detect: () => {
    return locale.split("-")[0];
  },
};

export default languageDetectorPlugin;
