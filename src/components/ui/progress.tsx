"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      `relative h-20 w-20 overflow-hidden rounded-full bg-primary-solid flex justify-center items-center`,
      className
    )}
    {...props}
    style={{
      background: `radial-gradient(closest-side, hsl(var(--background)) 79%, transparent 80% 100%), conic-gradient(hsl(var(--text-brand-primary)) ${
        value || 0
      }%, hsl(var(--bg-quaternary)) 0)`,
    }}
  >
    <div className="">{`${value || 0}%`}</div>
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

//
// ---  ----  raw shadcn code  ----  ---
//
// import * as React from "react"
// import * as ProgressPrimitive from "@radix-ui/react-progress"

// import { cn } from "@/lib/utils"

// const Progress = React.forwardRef<
//   React.ElementRef<typeof ProgressPrimitive.Root>,
//   React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
// >(({ className, value, ...props }, ref) => (
//   <ProgressPrimitive.Root
//     ref={ref}
//     className={cn(
//       "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
//       className
//     )}
//     {...props}
//   >
//     <ProgressPrimitive.Indicator
//       className="h-full w-full flex-1 bg-primary transition-all"
//       style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
//     />
//   </ProgressPrimitive.Root>
// ))
// Progress.displayName = ProgressPrimitive.Root.displayName

// export { Progress }