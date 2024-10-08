import MySelect from "@/components/molecules/select/MySelect";
import ThemeToggler from "@/components/molecules/ThemeToggler";
import { SelectItemType } from "@/lib/types/ui/ui.types";
import { CgCamera, CgMoon, CgProfile, CgSun } from "react-icons/cg";
import MultipleSelector, {
  Option,
} from "@/components/molecules/select/MultiSelect";

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

  const OPTIONS: Option[] = [
    { label: "nextjs", value: "Nextjs", node: <CgMoon /> },
    { label: "Vite", value: "vite" },
    { label: "Nuxt", value: "nuxt" },
    { label: "Vue", value: "vue, disable: true", disable: true },
    { label: "Remix", value: "remix" },
    { label: "Svelte", value: "svelte", disable: true },
    { label: "Angular", value: "angular" },
    { label: "Ember", value: "ember" },
    { label: "React", value: "react" },
    { label: "Gatsby", value: "gatsby" },
    { label: "Astro", value: "astro", disable: true },
  ];

  return (
    <div className="flex flex-col space-y-5 p-8 mb-[30rem]">
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

        {/* <MySelect size="md" options={options} Leading={<CgCamera />} />
        <MySelect size="md" disabled options={options} />
        <MySelect size="md" options={options} />
        <MySelect size="md" options={options} />
        <MySelect size="md" options={options} />
        <MySelect size="md" options={options} /> */}
      </div>

      <div className="w-2/5">
        <MultipleSelector
          defaultOptions={OPTIONS}
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              no results found.
            </p>
          }
        />
      </div>

      <div className="w-2/5">
        <MultipleSelector
          type="badge"
          defaultOptions={OPTIONS}
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              no results found.
            </p>
          }
        />
      </div>
    </div>
  );
}
