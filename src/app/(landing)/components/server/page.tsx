"use client";
import { Input } from "@/components/ui/input";
import { CgMoon, CgSun } from "react-icons/cg";
import React from "react";
import SelectInput from "@/components/molecules/SelectInput";
import { HorizontalDirection } from "@/lib/constants";
import { Form } from "@/components/ui/form";
import { Field } from "@/components/atoms/Field";
import { Select } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { SelectItemType } from "@/lib/types/ui/ui.types";
import MySelect from "@/components/molecules/select/MySelect";
import { Checkbox } from "@/components/ui/checkbox";

export default function ServerPage() {
  const form = useForm({
    defaultValues: {
      test: "default value of test",
      select: "",
    },
  });

  function onSubmit(values: any) {
    console.log("mm 100 - - - ", values);
  }

  const options: SelectItemType[] = [
    { label: <CgMoon />, value: "moon" },
    { label: <CgSun />, value: "sun" },
    { label: "Select", value: "select" },
    {
      label: <p>Your select p with long text is here and continue</p>,
      value: "your_select",
    },
  ];

  return (
    <div className=" p-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Field<"input"> name={"input1"} Input={Input} label="Input Label" />

          <Field<"select">
            name={"country"}
            Input={MySelect}
            InputProps={{ options, placeholder: "Select One" }}
          />
          <Field<"select">
            name={"checbox"}
            Input={Checkbox}
            InputProps={{ title: "My Checkbox" }}
          />
          <Field<"select"> name={"select"} Input={Select} />
          <Input
            type="submit"
            value={"Submit"}
            className="w-[100px] mt-6 bg-cyan-00 hover:bg-cyan-700 cursor-pointer"
          />
        </form>
      </Form>
    </div>
  );
}
