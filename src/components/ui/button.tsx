import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "group gap-2 bg-primary text-brand-foreground shadow hover:bg-brand/20",
        destructive:
          "group gap-2 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/10",
        outline:
          "group gap-2 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "group gap-2 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "group gap-2 hover:bg-accent hover:text-accent-foreground",
        link: "group gap-2 text-brand underline-offset-4 underline ",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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
      <Comp
        className={`${cn(buttonVariants({ variant, size, className }))}`}
        ref={ref}
        children={child}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
