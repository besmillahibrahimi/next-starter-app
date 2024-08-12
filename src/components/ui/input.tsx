import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
//focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
const inputVariants = cva(
  "relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "shadow-sm transition-colors focus-visible:border-blue-300  disabled:cursor-not-allowed disabled:opacity-50 hover:border-blue-300",
        error: "border-red-500 focus-visible:ring-red-500 focus:ring-1",
        success: "border-green-500 focus-visible:ring-green-500",
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
  icon?: React.ReactNode;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, icon, label, ...props }, ref) => {
    return (
      // <input
      //   type={type}
      //   className={cn(
      //     "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-pointer disabled:opacity-50 hover:border-blue-300",
      //     className
      //   )}
      //   ref={ref}
      //   {...props}
      // />
      <div className="">
        {label && (
          <label className="mb-2 block text-sm font-medium">{label}</label>
        )}
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <input
            className={cn(inputVariants({ variant, className }))}
            ref={ref}
            {...props}
            type={type}
          />
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
