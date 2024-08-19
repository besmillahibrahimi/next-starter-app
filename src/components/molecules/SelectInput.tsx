import React, { useEffect, useRef, useState } from "react";
import { Input, InputProps as InputPropsType } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { HorizontalDirection } from "@/lib/constants";
import { SelectItemType } from "@/lib/types/ui/ui.types";

export interface SelectInputProps {
  InputProps?: InputPropsType;
  SelectProps?: InputPropsType;
  selectNodeOffset?: number;
  selectPosition?: HorizontalDirection;
  options: SelectItemType[];
}

const SelectInput: React.FC<SelectInputProps> = ({
  InputProps,
  selectNodeOffset = 5,
  selectPosition = HorizontalDirection.LEFT,
}) => {
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [selectWidth, setSelectWidth] = useState<number>(0);

  useEffect(() => {
    if (selectRef.current) {
      const selectWidth = selectRef.current.offsetWidth;
      setSelectWidth(selectWidth + selectNodeOffset);
    }
  }, [selectRef]);

  const inputPadding = {
    [selectPosition == HorizontalDirection.LEFT
      ? "paddingLeft"
      : "paddingRight"]: selectWidth + selectNodeOffset + "px",
  };
  // integrate style with client input style.
  return (
    <div className={`relative w-max`}>
      <Input {...(InputProps ?? {})} style={inputPadding} />
      <div
        ref={selectRef}
        className={`absolute top-[50%] translate-y-[-50%]  z-10 ${
          selectPosition == HorizontalDirection.LEFT ? "left-0" : "right-0"
        }`}
      >
        <Select>
          <SelectTrigger className="w-[180px] bg-red">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
export default SelectInput;
