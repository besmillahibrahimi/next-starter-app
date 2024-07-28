import { InitOptions } from "i18next";

export const fallbackLng = "en";
export const languages = [fallbackLng];

export const defaultNS = "translation";
export const cookieName = "i18next";

export function getOptions(
  lng = fallbackLng,
  ns: string[] | string = defaultNS
) {
  const options: InitOptions = {
    // debug: true,
    supportedLngs: languages,
    fallbackLng: ["en", "fa"],
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
  return options;
}
