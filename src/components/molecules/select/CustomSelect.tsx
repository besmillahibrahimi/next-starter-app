import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SelectItemType } from "@/lib/types/ui/ui.types";
import { Input, InputProps as InputPropsType } from "../../ui/input";
import { HorizontalDirection } from "@/lib/constants";

interface ISelectClassName {
  trigger?: string;
  content?: string;
  group?: string;
  label?: string;
  item?: string;
}

interface ISelect {
  className?: ISelectClassName;
  placeholder?: string;
  type?: "InputSelect";
  InputProps?: InputPropsType;
  SelectProps?: InputPropsType;
  selectNodeOffset?: number;
  selectPosition?: HorizontalDirection;
  options?: SelectItemType[];
}

const CustomSelect = ({ className, type }: ISelect) => {
  return (
    <Select>
      <SelectTrigger
        className={
          type === "InputSelect"
            ? cn(
                "w-[80px] border border-none shadow-none focus:ring-0 text-[black]",
                className?.trigger
              )
            : className?.trigger
        }
      >
        <SelectValue placeholder="USD" />
      </SelectTrigger>
      <SelectContent className={className?.content}>
        <SelectGroup className={className?.group}>
          <SelectLabel className={className?.label}>Fruits</SelectLabel>
          <SelectItem value="banana" className={className?.item}>
            Apple
          </SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
