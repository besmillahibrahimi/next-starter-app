"use client";

import { useTranslation } from "@/configs/i18next/client";
import { getOptions, languages } from "@/configs/i18next/settings";
import { cookies } from "next/headers";
import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";

export const LanguageSwitcherBase = () =>
  //{ t, lng }: { t: any; lng: string }

  {
    const { t, i18n } = useTranslation("fa", "translation");

    const handleLanguageChange = (langValue: string) => {
      console.log("mm 20 - -   ", langValue);
      i18n.changeLanguage(langValue);
      localStorage.setItem("i18nextLng", langValue);
    };

    return (
      <footer style={{ marginTop: 50 }}>
        <Trans i18nKey="languageSwitcher" t={t}>
          Switch from ${} to:{" "}
        </Trans>
        {/* {languages
        .filter((l: any) => lng !== l)
        .map((l: any, index: number) => {
          return (
            <span key={l}>
              {index > 0 && " or "}
              <Link href={`/lng`} onClick={() => getOptions(l)}>
                {l}
              </Link>
            </span>
          );
        })} */}
        <select onChange={(e) => handleLanguageChange(e.target.value)}>
          <option value="en">english</option>
          <option value="fa">farsi</option>
        </select>
      </footer>
    );
  };
