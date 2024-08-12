import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CgMoon, CgSun } from "react-icons/cg";

const variants: Record<string, string[]> = {
  variant: ["default", "destructive", "outline", "secondary", "ghost", "link"],
  size: ["default", "sm", "lg", "icon"],
};

export default function Components() {
  return (
    <div className="flex flex-col space-y-5">
      <h1>Buttons</h1>
      {Object.keys(variants).map((key, i) => {
        return (
          <div key={key}>
            <h6>{key}</h6>
            <div className="flex space-x-4">
              {variants[key].map((variant, index) =>
                key === "size" ? (
                  <Button key={variant} size={variant as any}>
                    {variant}
                  </Button>
                ) : (
                  <Button
                    icon={<CgSun />}
                    iconPosition={"left"}
                    key={variant}
                    variant={variant as any}
                  >
                    <div className="group-hover:hidden">
                      <CgSun />
                    </div>

                    <div className="hidden group-hover:block">
                      <CgMoon />
                    </div>

                    <span className="group-hover:hidden">
                      Default {variant}
                    </span>

                    <span className="hidden group-hover:inline text-gray">
                      Hovered {variant}
                    </span>
                  </Button>
                )
              )}
            </div>
          </div>
        );
      })}

      <h1 className="mt-16 text-[#970f0f] font-[800] tablet:text-wrap sm:text-wrap container">
        Inputs
      </h1>
      {/* <div className="flex space-x-8">
        {Object.keys(inputVariants).map((item, i) => {
          return (
            <Input
              key={item}
              variant={item as any}
              //placeholder="Enter text"
              label="Default Input"
            />
          );
        })}
      </div> */}
      <div className="flex space-x-8">
        <Input
          variant="default"
          placeholder="Enter text"
          label="Default Input"
        />
        <Input variant="error" placeholder="Enter text" label="Error Input" />
        <Input
          variant="success"
          placeholder="Enter text"
          label="Success Input"
          icon={<CgSun />}
          disabled
        />
        <Input
          type="file"
          variant="file"
          placeholder="FILE :)"
          label="choose file"
        />
        <Input disabled placeholder="Disabled :(" />
      </div>

      <div>
        <div className="w-xs h-32 bg-brand-300-foreground text-gray-200-foreground rounded-xl text-[#fff] border-gray-200 border-2 ">
          test test test
        </div>
      </div>
    </div>
  );
}
