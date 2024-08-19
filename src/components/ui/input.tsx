"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

export const inputVariants = cva(
  "relative focus:outline-brand-300 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:placeholder-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "shadow-sm transition-colors focus-visible:border-brand-25  disabled:cursor-not-allowed disabled:opacity-50 hover:border-blue-300",
        error: "border-red-500 focus-visible:ring-red-500 focus:ring-1",
        success: "border-green-500 focus-visible:ring-green-500 pl-8",
        file: "border-red-500 focus-visible:ring-red-500 focus:ring-1 ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  StartNode?: React.ReactNode;
  EndNode?: React.ReactNode;
  startNodeOffset?: number;
  endNodeOffset?: number;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      variant,
      label,
      className = "",
      StartNode,
      startNodeOffset = 8,
      EndNode,
      endNodeOffset = 8,
      ...props
    },
    ref
  ) => {
    const startNode = React.useRef<HTMLDivElement | null>(null);
    const endNode = React.useRef<HTMLDivElement | null>(null);
    const [paddingLeft, setPaddingLeft] = React.useState<number>(10);
    const [paddingRight, setPaddingRight] = React.useState<number>(0);

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
    }, [startNode, endNode]);

    return (
      <div className="">
        {label && (
          <label className="mb-2 block text-sm font-medium">{label}</label>
        )}
        <div className="w-max relative">
          {/* {icon && <span className="mr-2">{icon}</span>} */}
          <input
            className={cn(
              inputVariants({
                variant,
                className,
              })
            )}
            ref={ref}
            style={{
              paddingLeft: `${paddingLeft}px`,
              paddingRight: `${paddingRight}px`,
            }}
            {...props}
            type={type}
          />

          {StartNode ? (
            <span
              ref={startNode}
              className="absolute pl-3 top-[50%] translate-y-[-50%]  z-10 transform "
            >
              {StartNode}
            </span>
          ) : null}
          {EndNode ? (
            <div
              ref={endNode}
              className="absolute right-0 pr-3 top-[50%] translate-y-[-50%]  z-10 transform "
            >
              {EndNode}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
