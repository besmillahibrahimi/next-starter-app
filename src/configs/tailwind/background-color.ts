import { RecursiveKeyValuePair, ResolvableTo } from "tailwindcss/types/config";

const BackgroundColor: ResolvableTo<RecursiveKeyValuePair> = {
  background: "hsl(var(--background))",
  primary: {
    DEFAULT: "var(--bg-primary)",
    alt: "var(--bg-primary_alt)",
    hover: "hsl(var(--bg-primary_hover))",
    solid: "hsl(var(--bg-primary-solid))",
  },
  secondary: {
    DEFAULT: "hsl(var(--bg-secondary))",
    alt: "hsl(var(--bg-secondary_alt))",
    hover: "hsl(var(--bg-secondary_hover))",
    subtle: "hsl(var(--bg-secondary_sublte))",
    solid: "hsl(var(--bg-secondary-solid))",
  },
  tertiary: "hsl(var(--bg-tertiary))",
  quaternary: "hsl(var(--bg-quaternary))",

  active: "hsl(var(--bg-active))",
  disabled: {
    DEFAULT: "hsl(var(--bg-disabled))",
    subtle: "hsl(var(--bg-disabled_subtle))",
  },
  overlay: "hsl(var(--bg-overlay))",
  brand: {
    primary: {
      DEFAULT: "hsl(var(--bg-brand-primary))",
      alt: "hsl(var(--bg-brand-primary_alt))",
    },
    secondary: "hsl(var(--bg-brand-secondary))",
    solid: {
      DEFAULT: "hsl(var(--bg-brand-solid))",
      hover: "hsl(var(--bg-brand-solid_hover))",
    },
    section: {
      DEFAULT: "hsl(var(--bg-brand-section))",
      subtle: "hsl(var(--bg-brand-section_subtle))",
    },
    error: {
      primary: "hsl(var(--bg-error-primary))",
      secondary: "hsl(var(--bg-error-secondary))",
      solid: "hsl(var(--bg-error-solid))",
    },
    warning: {
      primary: "hsl(var(--bg-warning-primary))",
      secondary: "hsl(var(--bg-warning-secondary))",
      solid: "hsl(var(--bg-warning-solid))",
    },
    success: {
      primary: "hsl(var(--bg-success-primary))",
      secondary: "hsl(var(--bg-success-secondary))",
      solid: "hsl(var(--bg-success-solid))",
    },
  },
};

export default BackgroundColor;
