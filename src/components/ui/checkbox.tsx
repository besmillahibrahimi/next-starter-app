"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon, MinusIcon, DotFilledIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: {
    container: "w-[1rem] h-[1rem]",
    roundedIcon: "w-[0.375rem] h-[0.375rem]",
    padding: "0.125rem",
    iconStyle: { height: 3, width: 3 },
  },
  md: {
    container: "w-[1.25rem] h-[1.25rem]",
    roundedIcon: "w-[0.5rem] h-[0.5rem]",
    padding: "0.1875rem",
    iconStyle: { height: 5, width: 5 },
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
    onChange?: (e: any) => void;
    value?: any;
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
    const { container, roundedIcon, padding, iconStyle } = sizeClasses[size];

    return (
      <div className="flex justify-center items-start space-x-md">
        <CheckboxPrimitive.Root
          ref={ref}
          className={cn(
            `${container} ${
              shape == "square" ? "rounded-xs" : "rounded-full"
            } ${padding}`,
            "group peer shrink-0 bg-primary shadow mt-xxs flex justify-center items-center",
            "text-white",
            "focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-background border border-transparent",
            "disabled:cursor-not-allowed disabled:data-[state=checked]:bg-disabled disabled:data-[state=checked]:text-fg-disabled-subtle disabled:data-[state=unchecked]:bg-disabled disabled:border-disabled-subtle",
            "disabled:data-[state=indeterminate]:bg-disabled disabled:data-[state=indeterminate]:text-fg-disabled-subtle",
            "data-[state=checked]:bg-brand-solid data-[state=checked]:text-fg-white",
            "data-[state=indeterminate]:bg-brand-solid data-[state=indeterminate]:text-fg-white",
            className
          )}
          {...props}
          onCheckedChange={props.onCheckedChange ?? props.onChange}
          checked={props.checked ?? props.value}
        >
          <CheckboxPrimitive.CheckboxIndicator
            className={cn("flex items-center justify-center text-current")}
          >
            {shape == "circle" ? (
              <DotFilledIcon />
            ) : (
              <>
                <CheckIcon
                  className={`h-${iconStyle.height} w-${iconStyle.width} hidden group-data-[state=checked]:block`}
                />
                <MinusIcon
                  className={`h-${iconStyle.height} w-${iconStyle.width} hidden group-data-[state=indeterminate]:block`}
                />
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
