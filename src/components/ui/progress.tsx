"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";
import { Direction } from "@/lib/constants";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    showPercentageText?: boolean;
    positionPercentageText?: Direction;
    showPercentageCard?: boolean;
    positionPercentageCard?: Direction;
  }
>(
  (
    {
      className,
      value,
      showPercentageText = false,
      positionPercentageText = Direction.RIGHT,
      showPercentageCard,
      positionPercentageCard = Direction.TOP,
      ...props
    },
    ref
  ) => (
    <div className="relative w-[500px] flex items-center m-8 justify-between">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          `relative h-3  overflow-hidden rounded-full bg-quaternary ${
            showPercentageText && positionPercentageText === "right"
              ? "w-[92%]"
              : "w-full"
          } `,
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="h-full w-full flex-1 bg-brand-solid-hover transition-all rounded"
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        ></ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>

      {showPercentageCard ? (
        <div
          style={{ left: `${value}%` }}
          className={`drop-shadow-md rounded-md shadow-sm absolute p-1 bg-primary-alt ${
            positionPercentageCard === "bottom" ? "-bottom-10" : "-top-10"
          } `}
        >
          {value}%
        </div>
      ) : null}

      {showPercentageText ? (
        <span
          className={`text-right right-0 text-text-md font-medium ml-1 ${
            positionPercentageText === "bottom" ? "absolute top-0 pt-3" : ""
          }`}
        >
          {value}%
        </span>
      ) : null}
    </div>
  )
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
