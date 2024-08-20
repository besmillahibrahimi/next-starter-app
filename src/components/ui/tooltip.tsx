import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";
import { ArrowDirection, Direction } from "@/lib/constants";

export const tooltipPostion = {
  bottom: "-bottom-1 left-1/2 -translate-x-1/2",
  top: "-top-1 left-1/2 -translate-x-1/2",
  left: "-right-1 top-1/2 -z-10 -translate-y-1/2",
  right: "-left-1 top-1/2 -z-10 -translate-y-1/2",
  bottom_right: "-bottom-1 right-2 -translate-x-1/2",
  bottom_left: "-bottom-1 left-4 -translate-x-1/2",
};

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    arrowDirection?: ArrowDirection;
    tooltipSide?: Direction;
  }
>(
  (
    {
      className,
      sideOffset = 10,
      children,
      arrowDirection,
      tooltipSide = Direction.TOP,
      ...props
    },
    ref
  ) => (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-brand-950 px-lg py-md text-xs text-brand-foreground data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
      side={tooltipSide}
    >
      {children}
      <div
        className={
          arrowDirection
            ? `absolute w-2 h-2 bg-brand-950 rotate-45 transform ${
                tooltipPostion[arrowDirection as keyof typeof tooltipPostion]
              }`
            : ``
        }
      />
    </TooltipPrimitive.Content>
  )
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
