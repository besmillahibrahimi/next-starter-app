"use client"

import MyInput from "@/components/atoms/myInput";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/configs/i18n/client";
import { SignInAPI, SignUpAPI } from "@/lib/http/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import locales from '@/locales/en/error-codes.json';
import _ from 'lodash-es'

const t = (key: string): any => _.get(locales, key);



export const formSchema = z
  .object({
    username: z.string(),
    password: z.string(),
  })



  
  export default function SignInPage() {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        password: "",
      },
    })

  
  function onSubmit(values: z.infer<typeof formSchema>) {

console.log('mm 200 - -   ', values)
    SignInAPI(values).then(res => {
      alert("Success!")
    }).catch((err) => {
      alert(t(err.code))
    })
  }
 
  return (
    <div className="h-dvh flex justify-center items-center">
      <div className="w-[50%] h-[70%] bg-slate-500 rounded-2xl flex-row justify-center p-[50px] overflow-y-auto">
        
        <Form {...form}>

            <form onSubmit={form.handleSubmit(onSubmit)}>

                <MyInput control={form.control} name="username" label="Username" formMessage={formSchema} className="w-[50%] mb-3"/>

                <MyInput control={form.control} name="password" label="Password" type="password" formMessage={formSchema} className="w-[50%] mb-3"/>

                <Input type="submit" className="w-[50%] mt-6 bg-cyan-00 hover:bg-cyan-700 cursor-pointer"/>

            </form>

        </Form>
      </div>
    </div>
  );
}
