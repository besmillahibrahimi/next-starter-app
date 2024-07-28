"use client";

import Link from "next/link";
import { useTranslation } from "@/configs/i18next/client";

import { LanguageSwitcher } from "@/components/languageSwitcher/client";
import { Cookies } from "react-cookie";
import { importI18nNamespace } from "@/lib/i18n.util";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { lng: string } }) {
  const { t } = useTranslation(undefined, "client-page");

  const [tt, setTT] = useState(null);

  return (
    <>
      <h1>{t("title")} sdfasd</h1>

      {tt ? (
        <>
          <p> sdf {tt["appName"]}</p>
          <p> sdaf {tt["title"]}</p>
        </>
      ) : null}

      <Link href={`/lng`}>{t("back-to-home")}</Link>
      {/* <LanguageSwitcher lng={params.lng} /> */}
    </>
  );
}
