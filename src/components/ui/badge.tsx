import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex justify-center items-center rounded-md text-utility-gray-700 bg-utility-gray-50 border border-utility-gray-200  transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        pillColor: "rounded-full gap-x-xs border-[1px]",
        pillOutline: "rounded-full bg-transparent border-[1.5px]",
        badgeColor: "rounded-sm border-[1px]",
        badgeModern: "rounded-sm border-[1px] shadow-xs",
      },
      size: {
        sm: "px-md py-xxs text-text-xs font-[500] gap-x-xs",
        md: "px-[0.625rem] py-xxs text-text-sm font-[500] gap-x-sm",
        lg: "px-lg py-xs text-text-sm gap-x-sm",
        icon_sm: "p-[0.31rem]",
        icon_md: "p-sm",
        icon_lg: "p-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
