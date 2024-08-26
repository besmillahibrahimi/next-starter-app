"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <div className="relative w-full">
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-quaternary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-brand-solid-hover transition-all rounded"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      ></ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
    <div
      style={{ left: `${value}px` }}
      className="drop-shadow-md rounded-md shadow-sm absolute -top-12 p-1 bg-background"
    >
      {value}%
    </div>
  </div>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
