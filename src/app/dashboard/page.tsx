"use client";

import { useTranslation } from "@/configs/i18n/client";

export default function Dashboard() {
  const { t } = useTranslation();

  return <main>{t("appName")}</main>;
}
