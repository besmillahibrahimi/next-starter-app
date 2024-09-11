"use client";

import CustomSelect from "@/components/molecules/select/CustomSelect";
import { Input } from "@/components/ui/input";
import { HorizontalDirection } from "@/lib/constants";
import { CgMoon, CgSun } from "react-icons/cg";

export default function InputPage() {
  return (
    <div className="flex flex-col gap-y-8 p-8">
      <div>
        <Input
          id="default"
          label="Default"
          placeholder="Default"
          EndNode={
            <CgSun
              onClick={() => console.log("clicked end icon")}
              className="text-fg-quinary"
            />
          }
        />
      </div>

      <div>
        <Input
          id="iconLeading"
          label="Icon Leading"
          placeholder="Icon Leading"
          StartNode={<CgMoon />}
          EndNode={
            <CgSun
              onClick={() => console.log("clicked end icon")}
              className="text-fg-quinary"
            />
          }
        />
      </div>

      <div>
        <Input
          id="leadingDropdown"
          label="Leading Dropdown"
          placeholder="Leading Dropdown"
          EndNode={
            <CgSun
              onClick={() => console.log("clicked end icon")}
              className="text-fg-quinary"
            />
          }
          LeadingNode={
            <CustomSelect
              type="InputSelect"
              selectPosition={HorizontalDirection.LEFT}
            />
          }
        />
      </div>

      <div>
        <Input
          id="trailingDropDown"
          label="Trailing Dropdown"
          placeholder="Trailing Dropdown"
          StartNode={<CgMoon />}
          EndNode={
            <CgSun
              onClick={() => console.log("clicked end icon")}
              className="text-fg-quinary"
            />
          }
          TrailingNode={
            <CustomSelect
              type="InputSelect"
              selectPosition={HorizontalDirection.RIGHT}
            />
          }
        />
      </div>

      <div>
        <Input
          label="Default"
          placeholder="Default"
          EndNode={
            <CgSun
              onClick={() => console.log("clicked end icon")}
              className="text-fg-quinary"
            />
          }
          TrailingButtonNode={true}
          LeadingTextNode={true}
        />
      </div>

      <div>
        <Input
          label="Default"
          placeholder="Default"
          EndNode={
            <CgSun
              onClick={() => console.log("clicked end icon")}
              className="text-fg-quinary"
            />
          }
          TrailingButtonNode={true}
        />
      </div>

      <div>
        <Input
          label="Default"
          placeholder="Default"
          EndNode={
            <CgSun
              onClick={() => console.log("clicked end icon")}
              className="text-fg-quinary"
            />
          }
          LeadingTextNode={true}
        />
      </div>
    </div>
  );
}
