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

  let MySelect = () => (
    <select name="cars" id="cars">
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="mercedes">Mercedes</option>
      <option value="audi">Audi</option>
    </select>
  );

  return (
    <div>
      <Input
        label="My Input"
        className="w-96"
        StartNode={<CgMoon />}
        EndNode={<CgSun onClick={() => console.log("clicked end icon")} />}
      />
      {/* <SelectInput
        selectPosition={HorizontalDirection.RIGHT}
        InputProps={{ variant: "error" }}
      /> */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Field<"input"> name={"test"} Input={Input} label="Input" />
          <Field<"select"> name={"select"} Input={MySelect} />
          <Field<"select"> name={"select"} Input={Select} />
          <Input
            type="submit"
            className="w-[100px] mt-6 bg-cyan-00 hover:bg-cyan-700 cursor-pointer"
          />
        </form>
      </Form>
    </div>
  );
}
