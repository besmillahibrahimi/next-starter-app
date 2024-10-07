import MySelect from "@/components/molecules/select/MySelect";
import ThemeToggler from "@/components/molecules/ThemeToggler";
import { SelectItemType } from "@/lib/types/ui/ui.types";
import { CgCamera, CgMoon, CgProfile, CgSun } from "react-icons/cg";

export default function InputPage() {
  const countries = [
    { ios3: "sdf", code: "98", name: "Iran" },
    { ios3: "sdsdff", code: "97", name: "Pakistan" },
  ];
  const options: SelectItemType[] = [
    { label: <CgMoon />, value: "moon" },
    { label: <CgSun />, value: "sun" },
    { label: "Select", value: "select" },
    {
      label: <p>Your select p with long text is here and continue</p>,
      value: "your_select",
    },
  ];
  return (
    <div className="flex flex-col space-y-5 p-8">
      <div className="flex flex-col w-1/5 space-y-5">
        <ThemeToggler />
        <MySelect
          size="sm"
          options={countries}
          renderItem={(item) => (
            <p className="cursor-default flex space-x-5 items-center">
              <CgProfile /> <span>{item.name + " " + item.code}</span>
            </p>
          )}
          getItemValue={(item) => item.code}
        />

        <MySelect size="md" options={options} Leading={<CgCamera />} />
        <MySelect size="md" disabled options={options} />
        <MySelect size="md" options={options} />
        <MySelect size="md" options={options} />
        <MySelect size="md" options={options} />
        <MySelect size="md" options={options} />
      </div>
    </div>
  );
}
