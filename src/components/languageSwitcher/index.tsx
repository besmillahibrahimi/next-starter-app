import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import { useTranslation } from "@/configs/i18next";
import { languages } from "@/configs/i18next/settings";
import { LanguageSwitcherBase } from "./languageSwitcherBase";

export const LanguageSwitcher = async ({ lng }: { lng: string }) => {
  const { t } = await useTranslation(lng, "languageSwitcher");
  return (
    <LanguageSwitcherBase
    //t100={t} lng={lng}
    />
  );
};
