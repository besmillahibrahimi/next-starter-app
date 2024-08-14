"use client";

import { CgMoon, CgSun } from "react-icons/cg";
import { Input, inputVariants } from "../ui/input";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  label?: string;
  placeholder?: string;
  onClickStartIcon?: () => void;
  onClickEndIcon?: () => void;
}
const IconInput: React.FC<InputProps> = ({
  variant,
  startIcon,
  endIcon,
  type,
  label,
  placeholder,
  className,
  onClickStartIcon,
  onClickEndIcon,
  ...props
}) => {
  const StartIcon = startIcon;
  const EndIcon = endIcon;
  return (
    <div className={cn("relative", className)}>
      <Input
        variant={variant}
        placeholder={placeholder}
        label={label}
        type={type}
        className={cn("pl-10", className)}
        {...props}
      />

      {/* {StartIcon ? (
        <div className="absolute left-1 top-7 transform -translate-y-1/2">
          <Select>
            <SelectTrigger className="absolute">
              <SelectValue placeholder="Choose an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ) : null} */}

      {StartIcon ? (
        <div className="absolute left-3 top-12 mt-0.5 transform -translate-y-1/2">
          <button onClick={onClickStartIcon}>
            <span className="text-brand-600 hover:text-brand-900">
              {startIcon}
            </span>
          </button>
        </div>
      ) : null}
      {EndIcon ? (
        <div className="absolute right-3 top-12 mt-0.5 transform -translate-y-1/2">
          <button onClick={onClickEndIcon}>
            <span className="text-brand-600 hover:text-brand-900">
              {endIcon}
            </span>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default IconInput;
