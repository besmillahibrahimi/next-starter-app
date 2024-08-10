import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CgMoon, CgSun } from "react-icons/cg";

const variants: Record<string, string[]> = {
  variant: ["default", "destructive", "outline", "secondary", "ghost", "link"],
  size: ["default", "sm", "lg", "icon"],
};

export default function Components() {
  return (
    <div>
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

                    <span className="hidden group-hover:inline">
                      Hovered {variant}
                    </span>
                  </Button>
                )
              )}
            </div>
          </div>
        );
      })}

      {/* <h1 className="mt-16 text-[#970f0f] font-[800]">Inputs</h1>
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
        />
      </div> */}
    </div>
  );
}
