import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { ColorExtends } from "./src/configs/tailwind/colors-extend";
import { SpaceExtend } from "./src/configs/ui/space/space-extend";
import { WidthExtend } from "./src/configs/ui/width/width-extend";
import { SpacingExtend } from "./src/configs/ui/spacing/spacing-extend";
import { RadiusExtend } from "./src/configs/ui/radius/radius-extend";
import { FontWeightExtend } from "./src/configs/ui/typography/fontWeight-extends";
import { TypographyExtends } from "./src/configs/ui/typography/typography-extends";
import TextColor from "./src/configs/tailwind/text-color";
import BorderColor from "./src/configs/tailwind/border-color";
import BackgroundColor from "./src/configs/tailwind/background-color";
import { ShadowExtend } from "./src/configs/ui/shadow/shadow-extend";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  prefix: "",
  theme: {
    // textColor: TextColor,
    //borderColor: BorderColor,
    // backgroundColor: BackgroundColor,

    container: {
      center: true,
      padding: {
        "padding-mobile": "1rem",
        "padding-desktop": "2rem",
      },
    },
    extend: {
      screens: {
        xs: "0px",
        sm: "480px",
        md: "780px",
        lg: "900px",
        xl: "1024px",
        "2xl": "1536px",
      },
      fontFamily: {
        lato: ["var(--lato-font-family)", ...fontFamily.sans],
      },
      textColor: TextColor,
      backgroundColor: BackgroundColor,
      borderColor: BorderColor,
      ringColor: BorderColor,
      fontSize: TypographyExtends, //usage: text-display-2xl  text-text-sm
      fontWeight: FontWeightExtend, //usage: font-regular
      colors: ColorExtends,
      borderRadius: RadiusExtend, //usage: rounded-md
      spacing: SpacingExtend, //usage : border-spacing-0
      gap: SpaceExtend,
      padding: SpaceExtend,
      margin: SpaceExtend,
      space: SpaceExtend, //usage: space-x-none
      width: WidthExtend,
      boxShadow: ShadowExtend, //usage: shadow-xs

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
