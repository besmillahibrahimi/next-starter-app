"use client";

import { useEffect, useState } from "react";
import i18next from "i18next";
import { initReactI18next, useTranslation as useTranslationOrg } from "react-i18next";
// import { useCookies } from "react-cookie";
import resourcesToBackend from "i18next-resources-to-backend";
// import LanguageDetector from 'i18next-browser-languagedetector'
import { getOptions, languages, cookieName } from "./settings";

const runsOnServerSide = typeof window === "undefined";

//
i18next
  .use(initReactI18next)
  //   .use()
  .use(resourcesToBackend((language: string, namespace: string) => import(`@/locales/${language}/${namespace}.json`)))
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: runsOnServerSide ? languages : [],
  });

export function useTranslation(ns?: any, options?: Record<string, any>, lng: string = "en") {
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;

  i18n.changeLanguage(lng);

  return ret;
}
