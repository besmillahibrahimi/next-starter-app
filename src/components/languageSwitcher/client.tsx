"use client";

import { useTranslation } from "@/configs/i18next/client";
import { LanguageSwitcherBase } from "./languageSwitcherBase";

export const LanguageSwitcher = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng, "languageSwitcher");
  return (
    <LanguageSwitcherBase
    //t100={t} lng={lng}
    />
  );
};
