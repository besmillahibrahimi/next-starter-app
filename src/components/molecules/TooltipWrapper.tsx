// Tooltip.jsx
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Direction } from "@/lib/constants";

// @ts-ignore
interface TooltipProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  title?: React.ReactNode;
  body?: React.ReactNode;
}

const TooltipWrapper: React.FC<TooltipProps> = ({
  children,
  title,
  body,
  ...props
}) => {
  const titleNode =
    typeof title === "string" ? (
      <h6 className="text-xs font-bold">{title}</h6>
    ) : (
      title
    );
  const bodyNode =
    typeof body === "string" ? (
      <p className="text-xs font-medium">{body}</p>
    ) : (
      body
    );

  return (
    <TooltipProvider>
      <Tooltip>
        {/* Use a span or div instead of a button for the trigger */}
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent {...(props || {})}>
          <div className="max-w-32 relative">
            {titleNode}
            {bodyNode}
          </div>
          <TooltipPrimitive.TooltipArrow className="fill-primary-solid" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
