"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon, MinusIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: {
    container: "w-[1rem] h-[1rem]",
    roundedIcon: "w-[0.375rem] h-[0.375rem]",
  },
  md: {
    container: "w-[1.25rem] h-[1.25rem]",
    roundedIcon: "w-[0.5rem] h-[0.5rem]",
  },
};

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    size?: "sm" | "md";
    icon?: React.ReactNode;
    shape?: "square" | "circle";
    title?: string;
    desc?: string;
  }
>(
  (
    {
      className,
      size = "sm",
      //icon = <CheckIcon />,
      shape = "circle",
      title,
      desc,
      ...props
    },
    ref
  ) => {
    const { container, roundedIcon } = sizeClasses[size];

    // hsl(var(--fg-disabled_subtle))
    return (
      <div className="flex justify-center items-start space-x-md">
        <CheckboxPrimitive.Root
          ref={ref}
          className={cn(
            `${container} ${shape == "square" ? "rounded-xs" : "rounded-full"}`,
            "group peer shrink-0 bg-primary shadow mt-xxs",
            "focus:outline-none focus:ring-2 focus:ring-brand-solid focus:ring-offset-2 focus:ring-offset-background",
            "disabled:cursor-not-allowed disabled:data-[state=checked]:bg-disabled disabled:data-[state=checked]:text-[hsl(var(--fg-disabled-subtle))] disabled:data-[state=unchecked]:bg-disabled",
            "disabled:data-[state=indeterminate]:bg-disabled disabled:data-[state=indeterminate]:text-[hsl(var(--fg-disabled-subtle))]",
            "data-[state=checked]:bg-brand-solid data-[state=checked]:text-white",
            "data-[state=indeterminate]:bg-brand-solid data-[state=indeterminate]:text-white",
            className
          )}
          {...props}
        >
          <CheckboxPrimitive.CheckboxIndicator
            className={cn("flex items-center justify-center text-current")}
          >
            {shape == "circle" ? (
              <div
                className={`${roundedIcon} rounded-full bg-[white] disabled:data-[state=checked]:bg-[hsl(var(--fg-disabled-subtle))]`}
              />
            ) : (
              <>
                <CheckIcon className="h-4 w-4 hidden group-data-[state=checked]:block" />
                <MinusIcon className="h-4 w-4 hidden group-data-[state=indeterminate]:block" />
              </>
            )}
          </CheckboxPrimitive.CheckboxIndicator>
        </CheckboxPrimitive.Root>

        <div className="">
          <p className="text-md font-medium text-secondary">{title}</p>
          <p className="text-md font-regular text-tertiary">{desc}</p>
        </div>
      </div>
    );
  }
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
