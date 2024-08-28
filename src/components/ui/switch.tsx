"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: {
    container: "w-[2.25rem] h-[1.25rem]",
    thumb: "w-[1rem] h-[1rem]",
    spacing: 4,
  },
  md: {
    container: "w-[2.75rem] h-[1.5rem]",
    thumb: "w-[1.25rem] h-[1.25rem]",
    spacing: 5,
  },
};

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    size?: "sm" | "md";
  }
>(({ className, size = "sm", ...props }, ref) => {
  const { container, thumb, spacing } = sizeClasses[size];

  return (
    <SwitchPrimitives.Root
      className={cn(
        `${container}`,
        "peer group inline-flex p-xxs shrink-0 cursor-pointer items-center rounded-full border-0 border-brand shadow-sm transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-brand-solid focus:ring-offset-2 focus:ring-offset-background",
        "disabled:cursor-not-allowed disabled:data-[state=checked]:bg-disabled disabled:data-[state=unchecked]:bg-disabled",
        "data-[state=checked]:bg-brand-solid data-[state=unchecked]:bg-tertiary data-[state=checked]:hover:bg-brand-solid-hover",
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          `${thumb}`,
          "group-disabled:bg-[hsl(var(--fg-disabled))] pointer-events-none block rounded-full bg-[white] shadow-lg ring-0 transition-transform",
          `data-[state=checked]:translate-x-${spacing} data-[state=unchecked]:translate-x-0`
        )}
      />
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
