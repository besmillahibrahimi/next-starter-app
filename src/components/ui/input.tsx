import * as React from "react";

import { cn } from "@/lib/utils";
import { InputClasses } from "@/lib/styles/common";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  Leading?: React.ReactNode;
  Trailing?: React.ReactNode;
  inputSize?: "sm" | "md";
  useLeadingDivider?: boolean;
  useTrailingDivider?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      Leading,
      useLeadingDivider = true,
      Trailing,
      useTrailingDivider = true,
      inputSize = "sm",
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          `flex items-center space-x-md border border-solid border-gray-300 shadow-xs rounded-md focus-within:rounded-md focus-within:outline-none focus-within:border-brand focus-within:ring-2  focus-within:ring-brand  ${
            props.disabled && "opacity-50 cursor-not-allowed text-disabled"
          }`,
          InputClasses.size[inputSize].px
        )}
      >
        {Leading}
        <input
          type={type}
          className={cn(
            "flex w-full bg-transparent text-sm  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed",
            className,
            InputClasses.size[inputSize].py,
            useLeadingDivider && Leading
              ? `border-l border-l-gray-300 ` + InputClasses.size[inputSize].pl
              : "",
            useTrailingDivider && Trailing
              ? "border-r border-r-gray-300 " + InputClasses.size[inputSize].pr
              : ""
          )}
          ref={ref}
          {...props}
        />
        {Trailing}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
