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
import { InputClasses } from "@/lib/styles/common";
import { SelectItemType } from "@/lib/types/ui/ui.types";
import { SelectProps } from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface ISelectClassName {
  trigger?: string;
  content?: string;
  group?: string;
  label?: string;
  item?: string;
}

interface ISelect {
  classes?: ISelectClassName;
  size?: "sm" | "md";
  placeholder?: React.ReactNode;
  selectLabel?: React.ReactNode;
  Leading?: React.ReactNode;
  Trailing?: React.ReactNode;
  options: SelectItemType[] | any[];
  renderItem?: (item: SelectItemType | any) => React.ReactNode;
  getItemValue?: (item: SelectItemType | any) => string;
}

const MySelect = React.forwardRef<HTMLSelectElement, ISelect & SelectProps>(
  (
    {
      selectLabel,
      placeholder,
      options,
      classes,
      renderItem,
      getItemValue,
      size = "md",
      Leading,
      ...props
    },
    ref
  ) => (
    <Select {...props}>
      <SelectTrigger className={cn("", InputClasses.size[size].default)}>
        {Leading ? (
          <div className="flex space-x-3 items-center">
            {Leading}
            <SelectValue placeholder={placeholder} />
          </div>
        ) : (
          <div className="relative">
            <SelectValue placeholder={placeholder} />
            <input
              className="absolute top-0 left-0 bg-blue-300 z-10"
              autoFocus
            />
          </div>
        )}
      </SelectTrigger>
      <SelectContent className={cn("", classes?.content)}>
        <SelectGroup className={classes?.group}>
          {selectLabel ? (
            <SelectLabel className={classes?.label}>{selectLabel}</SelectLabel>
          ) : null}
          {options.map((item, index) => (
            <SelectItem
              className={classes?.item}
              key={item.value}
              value={getItemValue ? getItemValue(item) : item.value}
            >
              {renderItem ? renderItem(item) : item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
);

MySelect.displayName = "MySelect";

export default MySelect;
