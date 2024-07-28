import Link from "next/link";
import { useTranslation } from "@/configs/i18next";
import { LanguageSwitcher } from "@/components/languageSwitcher";

export default async function Page({ params }: { params: { lng: string } }) {
  console.log("-----------------", params);
  const { t } = await useTranslation("fa", "translation");

  return (
    <>
      <h1>{t("title")}</h1>
      <Link href={`/lng/second-page`}>{t("to-second-page")}</Link>
      <br />
      <Link href={`/lng/client-page`}>{t("to-client-page")}</Link>

      <LanguageSwitcher lng={params.lng} />
    </>
  );
}
