import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const primaryDestructiveStyle = {
  border:
    "1px solid var(--Gradient-skeuemorphic-gradient-border, rgba(255, 255, 255, 0.12))",
  boxShadow:
    "0px -1px 5px 1px  var(--shadow-skeumorphic-inner_border) inset, 0px -2px 0px 0px var(--shadow-skeumorphic-inner) inset, 0px 1px 2px 0px var(--shadow-xs)",
};

const buttonVariants = cva(
  "inline-flex items-center justify-center disabled:pointer-events-none focus:!ring-2 focus:!outline-none focus:!ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-button-primary-bg text-button-primary-fg hover:bg-button-primary-bg_hover hover:text-button-primary-fg_hover focus:bg-button-primary-bg focus:text-button-primary-fg focus:!ring-focus-ring disabled:text-fg-disabled disabled:!border-disabled-subtle disabled:bg-disabled disabled:!shadow-xs",
        secondaryGray:
          "!shadow-none bg-button-secondary-bg text-button-secondary-fg border !border-button-secondary-border hover:bg-button-secondary-bg_hover hover:text-button-secondary-fg_hover hover:!border-button-secondary-border_hover focus:bg-button-secondary-bg focus:text-button-secondary-fg focus:!border-button-secondary-border focus:ring-focus-ring disabled:text-fg-disabled disabled:!border-disabled-subtle disabled:bg-primary disabled:!shadow-xs",
        secondaryColor:
          "!shadow-none bg-button-secondary-color-bg text-button-secondary-color-fg border !border-button-secondary-color-border hover:bg-button-secondary-color-bg_hover hover:text-button-secondary-color-fg_hover hover:!border-button-secondary-color-border_hover focus:bg-button-secondary-color-bg focus:text-button-secondary-color-fg focus:!border-button-secondary-color-border focus:ring-focus-ring disabled:text-fg-disabled disabled:!border-disabled-subtle disabled:bg-primary disabled:!shadow-xs",
        tertiaryGray:
          "!shadow-none text-button-tertiary-fg hover:bg-button-tertiary-bg_hover hover:text-button-tertiary-fg_hover focus:text-button-tertiary-fg focus:ring-focus-ring disabled:text-fg-disabled",
        tertiaryColor:
          "!shadow-none text-button-tertiary-color-fg hover:bg-button-tertiary-color-bg_hover hover:text-button-tertiary-color-fg_hover focus:text-button-tertiary-color-fg focus:ring-focus-ring disabled:text-fg-disabled",
        linkGray:
          "!shadow-none text-button-tertiary-fg hover:text-button-tertiary-fg_hover focus:text-button-tertiary-fg focus:ring-focus-ring disabled:text-fg-disabled",
        linkColor:
          "!shadow-none text-button-tertiary-color-fg hover:text-button-tertiary-color-fg_hover focus:text-button-tertiary-color-fg focus:ring-focus-ring disabled:text-fg-disabled",
        destructivePrimary:
          "bg-button-primary-error-bg text-fg-white hover:bg-button-primary-error-bg_hover hover:text-fg-white focus:bg-button-primary-error-bg focus:text-fg-white focus:!ring-focus-ring-error disabled:text-fg-disabled disabled:!border-disabled-subtle disabled:bg-disabled disabled:!shadow-xs",
        secondary:
          "!shadow-none bg-button-secondary-error-bg text-button-secondary-error-fg border !border-button-secondary-error-border hover:bg-button-secondary-error-bg_hover hover:text-button-secodary-error-fg_hover focus:bg-button-secondary-error-bg focus:text-button-secondary-error-fg focus:!border-button-secondary-error-border focus:ring-focus-ring-error disabled:text-fg-disabled disabled:!border-disabled-subtle disabled:bg-primary disabled:!shadow-xs",
        tertiary:
          "!shadow-none text-button-tertiary-error-fg hover:bg-button-tertiary-error-bg_hover hover:text-button-tertiary-error-fg_hover focus:text-button-tertiary-error-fg focus:ring-focus-ring-error disabled:text-fg-disabled",
        link: "!shadow-none text-button-tertiary-error-fg hover:text-button-tertiary-error-fg_hover focus:text-button-tertiary-error-fg focus:ring-focus-ring-error disabled:text-fg-disabled",
      },
      size: {
        sm: "rounded-md px-lg py-md gap-x-xs text-sm font-semibold",
        md: "rounded-md px-[calc(0.875rem-1px)] py-[calc(0.625rem-1px)] gap-x-xs text-sm font-semibold",
        lg: "rounded-md px-xl py-[0.625rem] gap-x-sm text-md font-semibold",
        xl: "rounded-md px-[1.125rem] py-lg gap-x-sm text-md font-semibold",
        "2xl":
          "rounded-lg px-[1.375rem] py-xl gap-x-[0.625rem] text-lg font-semibold",
        link_sm: "rounded-xs gap-x-sm text-sm font-semibold",
        link_md: "rounded-xs gap-x-sm text-sm font-semibold",
        link_lg: "rounded-xs gap-x-md text-md font-semibold",
        link_xl: "rounded-xs gap-x-md text-md font-semibold",
        link_2xl: "rounded-xs gap-x-lg text-lg font-semibold",
        icon_sm: "rounded-md p-md",
        icon_md: "rounded-md p-[0.625rem]",
        icon_lg: "rounded-md p-lg",
        icon_xl: "rounded-md p-[0.875rem]",
        icon_2xl: "rounded-lg p-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type IconPosition = "top" | "left" | "right" | "bottom";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  hoverIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      icon,
      iconPosition,
      hoverIcon,
      children: child,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <div className="h-full w-max">
        <Comp
          className={`${cn(buttonVariants({ variant, size, className }))}`}
          style={
            variant === "primary" || "destructivePrimary"
              ? primaryDestructiveStyle
              : {}
          }
          ref={ref}
          children={child}
          {...props}
        />
      </div>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
