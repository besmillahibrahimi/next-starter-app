import { defaultNS } from "./settings";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const isServer = typeof window === "undefined";

export class Internationalization {
  public static defaultNS = "common";
  public static fallbackNS = "common";
  public static supportedLngs = ["en", "fa"];
  public static fallbackLng = "en";
}

// Initialize i18next for both client and server
i18n
  .use(HttpBackend) // Load translations via HTTP
  .use(LanguageDetector)
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    fallbackLng: Internationalization.fallbackLng,
    lng: "en", // Default language, can be overridden
    debug: !isServer,
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Path to translation files
    },
    react: {
      useSuspense: false, // Disable suspense mode for SSR
    },
  });

export default i18n;
