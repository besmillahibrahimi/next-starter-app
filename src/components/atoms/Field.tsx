import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

type IFieldProps<D extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[D] & {
    control?: any;
    message?: React.ReactNode | string;
    label?: string;
    Input: React.ComponentType<any>;
    name: string;
  };
export function Field<D extends keyof JSX.IntrinsicElements>(
  props: IFieldProps<D>
) {
  return (
    <div>
      <FormField
        control={props.control}
        name={props.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{props.label}</FormLabel>
            <FormControl>{<props.Input {...field} />}</FormControl>
            <FormDescription />
            <FormMessage>{props.message}</FormMessage>
          </FormItem>
        )}
      />
    </div>
  );
}
