import { importI18nNamespace } from "@/lib/i18n.util";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-resources-to-backend";

const isServer = typeof window === "undefined";

export class Internationalization {
  public static defaultNS = "common";
  public static fallbackNS = "common";
  public static supportedLngs = ["en", "fa"];
  public static fallbackLng = "en";
}

export async function initI18n(lng: string, ns?: string | string[]) {
  return await i18n
    .use(HttpBackend(importI18nNamespace)) // Load translations via HTTP
    .use(LanguageDetector)

    .init({
      fallbackLng: Internationalization.fallbackLng,
      lng,
      ns,
      debug: !isServer,
      interpolation: {
        escapeValue: false, // React already protects from XSS
      },
      // backend: {
      //   loadPath: "/locales/{{lng}}/{{ns}}.json", // Path to translation files
      // },
      // resources: {
      //   en: {
      //     translation: {
      //       appName: "Server App Name",
      //     },
      //   },
      // },
      react: {
        useSuspense: false, // Disable suspense mode for SSR
      },
    });
}

export default i18n;
