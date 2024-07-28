import { useTranslation } from "@/configs/i18next";
import { LanguageSwitcher } from "@/components/languageSwitcher";
import Link from "next/link";
import { Trans } from "react-i18next";

export default async function Page({ params }: { params: { lng: string } }) {
  const { t } = await useTranslation(undefined, "second-page");
  return (
    <>
      <h1>{t("title")}</h1>
      <Link href={`/lng`}>{t("back-to-home")}</Link>

      <LanguageSwitcher lng={params.lng} />
    </>
  );
}
