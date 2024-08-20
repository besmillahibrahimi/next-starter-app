// Tooltip.jsx
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowDirection, Direction } from "@/lib/constants";

interface TooltipProps {
  triggerText: React.ReactNode;
  tooltipText: React.ReactNode;
  arrowDirection?: ArrowDirection;
  tooltipSide?: Direction;
  className?: string;
}

const TooltipWrapper: React.FC<TooltipProps> = ({
  triggerText,
  tooltipText,
  arrowDirection,
  tooltipSide,
  className,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        {/* Use a span or div instead of a button for the trigger */}
        <TooltipTrigger asChild>
          <span className="text-blue-600 place-self-center cursor-pointer">
            {triggerText}
          </span>
        </TooltipTrigger>
        <TooltipContent
          arrowDirection={arrowDirection}
          tooltipSide={tooltipSide}
          className={className}
        >
          {tooltipText}
          {/* <div className="absolute w-2 h-2 bg-gray-900 rotate-45 -bottom-1 left-1/2 transform -translate-x-1/2" /> */}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
