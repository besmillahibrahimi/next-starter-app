import { InitOptions } from "i18next";

export const fallbackLng = "en";
export const languages = [fallbackLng, "fa"];

export const defaultNS = "translation";
export const cookieName = "i18next";

export function getOptions(
  lng = fallbackLng,
  ns: string[] | string = defaultNS
) {
  const options: InitOptions = {
    // debug: true,
    supportedLngs: ["en", "fa"], // languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
  return options;
}
