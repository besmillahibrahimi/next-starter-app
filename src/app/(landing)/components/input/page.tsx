import ThemeToggler from "@/components/molecules/ThemeToggler";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DividerVerticalIcon } from "@radix-ui/react-icons";
import { CgMoon, CgSun } from "react-icons/cg";

export default function InputPage() {
  return (
    <div className="flex flex-col space-y-5 p-8">
      <div className="flex flex-col w-1/5 space-y-5">
        <ThemeToggler />
        <Input
          inputSize={"sm"}
          type="text"
          placeholder="sm"
          Trailing={<CgMoon />}
          Leading={<CgSun />}
        />
        <Input
          inputSize={"sm"}
          type="text"
          placeholder="sm"
          Trailing={<CgMoon />}
          useLeadingDivider={false}
          Leading={<CgSun />}
          useTrailingDivider={false}
          disabled
        />
        <Input
          disabled
          inputSize={"sm"}
          type="text"
          placeholder="sm"
          Trailing={<CgMoon />}
          Leading={<CgSun />}
        />
        <Input inputSize={"md"} type="text" placeholder="md" />
        <Input inputSize={"md"} type="text" placeholder="disabled" disabled />
        <Input
          inputSize={"md"}
          type="text"
          placeholder="disabled"
          useLeadingDivider={true}
          Leading={<p className="">{"http://"}</p>}
        />
        <Input
          inputSize={"md"}
          type="text"
          placeholder="disabled"
          useLeadingDivider={true}
          Leading={<p className="">{"http://"}</p>}
          disabled
        />
        <Input
          inputSize={"md"}
          type="text"
          placeholder="disabled"
          useLeadingDivider={true}
          Leading={
            <Select>
              <SelectTrigger className="w-[180px]">
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
          }
        />
      </div>
    </div>
  );
}
