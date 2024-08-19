import { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";

export const TypographyExtends: ResolvableTo<
  KeyValuePair<
    string,
    | string
    | [fontSize: string, lineHeight: string]
    | [
        fontSize: string,
        configuration: Partial<{
          lineHeight: string;
          letterSpacing: string;
          fontWeight: string | number;
        }>
      ]
  >
> = {
  /***************************************
                Font
    ****************************************/
  "display-2xl": [
    "var(--font-size-display-2xl)",
    {
      lineHeight: "var(--line-height-display-2xl)",
      letterSpacing: "var(--letter-spacing-display-2xl)",
    },
  ],
  "display-xl": [
    "var(--font-size-display-xl)",
    {
      lineHeight: "var(--line-height-display-xl)",
      letterSpacing: "var(--letter-spacing-display-xl)",
    },
  ],
  "display-lg": [
    "var(--font-size-display-lg)",
    {
      lineHeight: "var(--line-height-display-lg)",
      letterSpacing: "var(--letter-spacing-display-lg)",
    },
  ],
  "display-md": [
    "var(--font-size-display-md)",
    {
      lineHeight: "var(--line-height-display-md)",
      letterSpacing: "var(--letter-spacing-display-md)",
    },
  ],
  "display-sm": [
    "var(--font-size-display-sm)",
    { lineHeight: "var(--line-height-display-sm)" },
  ],
  "display-xs": [
    "var(--font-size-display-xs)",
    { lineHeight: "var(--line-height-display-xs)" },
  ],
  "text-xl": [
    "var(--font-size-text-xl)",
    { lineHeight: "var(--line-height-text-xl)" },
  ],
  "text-lg": [
    "var(--font-size-text-lg)",
    { lineHeight: "var(--line-height-text-lg)" },
  ],
  "text-md": [
    "var(--font-size-text-md)",
    { lineHeight: "var(--line-height-text-md)" },
  ],
  "text-sm": [
    "var(--font-size-text-sm)",
    { lineHeight: "var(--line-height-text-sm)" },
  ],
  "text-xs": [
    "var(--font-size-text-xs)",
    { lineHeight: "var(--line-height-text-xs)" },
  ],

  /***************************************
                Font Weight
    ****************************************/
  //   regular: "var(--weight-regular)",
  //   medium: "var(--weight-medium)",
  //   semibold: "var(--weight-semibold)",
  //   bold: "var(--weight-bold)",
};
