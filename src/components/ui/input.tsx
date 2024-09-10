"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Label } from "./label";
import { HorizontalDirection } from "@/lib/constants";
import { SelectItemType } from "@/lib/types/ui/ui.types";

export const inputVariants = cva(
  "relative focus-visible:outline-focus-ring flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:placeholder-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 disabled:text-disabled",
  {
    variants: {
      variant: {
        default:
          "shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        error: "border-red-500 focus-visible:ring-red-500 focus:ring-1",
        success: "border-green-500 focus-visible:ring-green-500 pl-8",
        file: "border-red-500 focus-visible:ring-red-500 focus:ring-1 ",
      },
      sizeVariants: {
        sm: "px-2 py-1 text-sm",
        md: "px-3 py-2 text-base",
        lg: "px-4 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      sizeVariants: "md",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  StartNode?: React.ReactNode;
  EndNode?: React.ReactNode;
  LeadingNode?: React.ReactNode;
  TrailingNode?: React.ReactNode;
  startNodeOffset?: number;
  endNodeOffset?: number;
  leadingNodeOffset?: number;
  trailingNodeOffset?: number;
  selectPosition?: HorizontalDirection;
  options?: SelectItemType[];
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      variant,
      sizeVariants,
      label,
      className = "",
      StartNode,
      startNodeOffset = 8,
      EndNode,
      endNodeOffset = 8,
      LeadingNode,
      TrailingNode,
      leadingNodeOffset = 5,
      trailingNodeOffset = 5,
      selectPosition = HorizontalDirection.LEFT,
      id,
      ...props
    },
    ref
  ) => {
    const startNode = React.useRef<HTMLDivElement | null>(null);
    const endNode = React.useRef<HTMLDivElement | null>(null);
    const leadingNode = React.useRef<HTMLDivElement | null>(null);
    const trailingNode = React.useRef<HTMLDivElement | null>(null);

    const [paddingLeft, setPaddingLeft] = React.useState<number>(10);
    const [paddingRight, setPaddingRight] = React.useState<number>(0);

    const [nodeWidth, setNodeWidth] = React.useState<number>(0);

    const trilingPadding = {
      [selectPosition == HorizontalDirection.LEFT
        ? "paddingLeft"
        : "paddingRight"]: nodeWidth + leadingNodeOffset + "px",
    };

    const endTraingPadding = {
      [selectPosition == HorizontalDirection.LEFT
        ? "paddingRight"
        : "paddingLeft"]: nodeWidth + leadingNodeOffset + "px",
    };

    React.useEffect(() => {
      // Calculate the icon's width and set the left padding for the input
      if (startNode.current) {
        const iconWidth = startNode.current.offsetWidth;
        setPaddingLeft(iconWidth + startNodeOffset); // Adding a little extra space (8px)
      }
      if (endNode.current) {
        const iconWidth = endNode.current.offsetWidth;
        setPaddingRight(iconWidth + endNodeOffset); // Adding a little extra space (8px)
      }

      if (leadingNode.current) {
        const leadingWidth = leadingNode.current.offsetWidth;
        setNodeWidth(leadingWidth + leadingNodeOffset);
        setPaddingLeft(leadingWidth + leadingNodeOffset);
      }

      if (trailingNode.current) {
        const trailingWidth = trailingNode.current.offsetWidth;
        setNodeWidth(trailingWidth + trailingNodeOffset);
        setPaddingRight((state) => state + trailingWidth + trailingNodeOffset);
      }
    }, [startNode, endNode, leadingNode]);

    className += `${LeadingNode && "radius-l-0"}`;
    id ??= "";
    return (
      <div className=" flex flex-col">
        {label && (
          <Label
            htmlFor={id}
            className="mb-2 block text-text-sm font-medium text-secondary"
          >
            {label}
          </Label>
        )}
        <div className="w-max relative">
          <input
            className={cn(
              inputVariants({
                variant,
                sizeVariants,
                className,
              })
            )}
            ref={ref}
            style={{
              paddingLeft: `${paddingLeft}px`,
              paddingRight: `${paddingRight}px`,
            }}
            {...props}
            id={id}
            type={type}
          />
          {LeadingNode ? (
            <div
              ref={leadingNode}
              className={`absolute left-0 top-[50%] translate-y-[-50%] z-10 transform`}
            >
              {LeadingNode}
            </div>
          ) : null}
          {StartNode ? (
            <span
              ref={startNode}
              className="absolute pl-3 top-[50%] translate-y-[-50%] z-10 transform bg-red "
            >
              {StartNode}
            </span>
          ) : null}
          {EndNode ? (
            <div
              ref={endNode}
              className={`absolute right-1 pr-3 top-[50%] translate-y-[-50%] z-10 transform`}
              style={TrailingNode ? endTraingPadding : {}}
            >
              {EndNode}
            </div>
          ) : null}

          {TrailingNode ? (
            <div
              ref={trailingNode}
              className={`absolute right-0  top-[50%] translate-y-[-50%] z-10 transform`}
              style={trilingPadding}
            >
              {TrailingNode}
            </div>
          ) : null}
        </div>

        <p className="text-tertiary text-text-sm font-regular">hhuiyh</p>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
