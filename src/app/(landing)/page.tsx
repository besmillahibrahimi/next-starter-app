import ThemeToggler from "@/components/molecules/ThemeToggler";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/configs/i18n";

const colors = ["primary", "secondary", "accent", "destructive", "info", "success", "warning", "error"];
const colorVariants = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const buttonVariants = {
  variant: ["default", "destructive", "outline", "secondary", "ghost", "link"],
  size: ["default", "lg", "sm", "icon"],
};

export default async function Home() {
  const { t } = await useTranslation("en");
  return (
    <main className="container">
      <div className="py-8">
        <h1 className="text-center text-3xl">{t("appName")}</h1>
        <div className="w-full flex justify-end space-x-5">
          <ThemeToggler />
          <ThemeToggler useSwitch={false} />
        </div>

        <div>
          <h1 className="text-center text-3xl">Color Palette</h1>
          <div className="w-full flex gap-x-8 py-8">
            {colors.map((color, index) => (
              <div key={index} className="grid grid-cols-1 gap-5 w-full">
                {colorVariants.map((variant, i) => (
                  <span
                    key={(index + 1) * i}
                    style={{ backgroundColor: `var(--${color}-${variant})`, color: `var(--${color}-${variant}-foreground` }}
                    className="h-12 w-auto rounded flex items-center justify-center"
                  >
                    {color + "-" + variant}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-center text-3xl">Components</h1>
          <div className="flex space-x-8 bg-secondary-500 p-5">
            {Object.entries(buttonVariants).map(([key, values], index) => (
              <div key={index}>
                <h2 className="text-2xl">Button {key}</h2>
                <div className="flex space-x-5 flex-wrap">
                  {values.map((variant, index) =>
                    buttonVariants.variant.includes(variant) ? (
                      <Button key={index} variant={variant as any} className="">
                        {variant}
                      </Button>
                    ) : (
                      <Button key={index} size={variant as any} className="">
                        {variant}
                      </Button>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
