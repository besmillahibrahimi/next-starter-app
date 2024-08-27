"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    disabled?: boolean;
  }
>(({ className, disabled = false, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex p-xxs h-[1.25rem] w-[2.25rem] shrink-0 cursor-pointer items-center rounded-full border-0 border-brand shadow-sm transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      disabled
        ? "cursor-not-allowed bg-disabled"
        : "data-[state=checked]:bg-brand-solid data-[state=unchecked]:bg-tertiary data-[state=checked]:hover:bg-brand-solid-hover",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-[white] shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
