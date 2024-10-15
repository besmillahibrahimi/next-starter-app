"use client";

import { Field } from "@/components/atoms/Field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ParseBrowser from "@/configs/parse/parse-browser";
import { useGlobal } from "@/contexts/GlobalLayout";
import { useRedirectQuery } from "@/hooks/use-redirect";

import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useState } from "react";
import { setCookie } from "cookies-next";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { AppContants } from "@/lib/constants";
import { Session } from "parse";
import Fetch from "@/configs/api/apiConfig";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Toaster as soonerToaster } from "@/components/ui/sonner";
import { toast as soonerToast } from "sonner";

export const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export default function SignInPage() {
  const { t } = useTranslation("translation");
  const { setIsLoading } = useGlobal();
  const [redirect] = useRedirectQuery();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const body = { username: values.username, password: values.password };
      const res = await Fetch({ url: "login", method: "POST", body: body });
      setCookie(AppContants.ParseSessionCookieName, res.sessionToken);
      redirect();
      console.log(" mm -- login new  ---   ", res);
    } catch (err: any) {
      console.log(" errrrrrrr  ---   ", err);
      soonerToast("aaa", {
        description: "aa, aa 03, 2023 at 9:00 AM",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      soonerToast("bbb", {
        description: "bb, bb 03, 2023 at 9:00 AM",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      soonerToast("ccc", {
        description: "cc, cc 03, 2023 at 9:00 AM",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }

    // try {
    //   setIsLoading(true);

    //   const user = await ParseBrowser.User.logIn(
    //     values.username,
    //     values.password
    //   );
    //   const token = user.getSessionToken();
    //   setCookie(AppContants.ParseSessionCookieName, token);
    //   redirect();
    // } catch (err: any) {
    //   toast({ description: t(`auth.error.${err.code}`), variant: "error" });
    // } finally {
    //   setIsLoading(false);
    // }
  }

  const [countToast, setCountToast] = useState<number>(1);
  const [countSooner, setCountSooner] = useState<number>(1);

  const showToast = () => {
    setCountToast(countToast + 1);
    toast({
      title: `----------         hiii  ${countToast}     ----------- `,
      variant: "error",
      position: "bottom",
    });
  };

  const showSooner = () => {
    setCountSooner(countSooner + 1);
    soonerToast(` --- --- -- ${countToast}  ----- `, {
      description: "uhad edbqabn ejdjwejd",
    });
  };

  return (
    <Suspense fallback={"Loading"}>
      <div className="h-dvh flex justify-center items-center">
        <div className="w-[50%] h-[70%] bg-slate-500 rounded-2xl flex-row justify-center p-[50px] overflow-y-auto">
          <Button className="bg-yellow-400 text-blue-950" onClick={showToast}>
            Toast
          </Button>
          <Button className="bg-yellow-400 text-blue-950" onClick={showSooner}>
            Sooner
          </Button>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Field
                name="username"
                control={form.control}
                Input={Input}
                label={t("auth.username")}
              />
              <Field<"input">
                name={"password"}
                Input={Input}
                label={t("auth.password")}
              />
              <Input
                type="submit"
                className="w-[50%] mt-6 bg-cyan-00 hover:bg-cyan-700 cursor-pointer"
              />
            </form>
          </Form>
        </div>
      </div>
    </Suspense>
  );
}
