"use client";
import ParseBrowser from "@/configs/parse/parse-browser";
import { useDialog } from "@/hooks/use-dialogs";
import { useRedirectQuery } from "@/hooks/use-redirect";
import { AppContants } from "@/lib/constants";
import { ExitIcon } from "@radix-ui/react-icons";
import { deleteCookie } from "cookies-next";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Field } from "./Field";
import { FormProvider, useForm } from "react-hook-form";
import MyDialog from "../molecules/MyDialog";

const LogOutButton = () => {
  const [redirect] = useRedirectQuery();
  const { showDialog, closeDialog } = useDialog();

  const { t } = useTranslation("translation");

  const logOut = () => {
    ParseBrowser.User.logOut().then(() => {
      redirect("/auth/sign-in");
      deleteCookie(AppContants.ParseSessionCookieName);
    });
  };

  const methods = useForm();

  function onSubmit(values: any) {
    console.log("mm 100 - - - ", values);
    logOut();
  }

  return (
    <>
      <MyDialog
        dialogTrigger={
          <Button size={"icon_lg"}>
            <ExitIcon />
          </Button>
        }
        dialogTitle="DialogTitle"
        dialogDes="Are you sure you want to logout ?"
        // body={
        //   <FormProvider {...methods}>
        //     <form onSubmit={methods.handleSubmit(onSubmit)}>
        //       <Field name={"input1"} Input={Input} label="Input Label" />
        //     </form>
        //   </FormProvider>
        // }
        footer={
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Button className="bg-success-500">{t("yes")}</Button>
            </form>
          </FormProvider>
        }
      />
    </>
  );
};

export default LogOutButton;
