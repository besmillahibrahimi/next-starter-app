"use server";
import _ from "lodash-es";
import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./settings";
import { importI18nNamespace } from "@/lib/i18n.util";

const initI18next = async (lng: string, ns: string[] | string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend(importI18nNamespace))
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export async function useTranslation(
  lng: string = "en",
  ns: string[] | string,
  options?: Record<string, any>
) {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(lng, ns, options?.keyPrefix),
    i18n: i18nextInstance,
  };
}
