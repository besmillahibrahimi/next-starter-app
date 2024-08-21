import { RecursiveKeyValuePair, ResolvableTo } from "tailwindcss/types/config";

const BorderColor: ResolvableTo<RecursiveKeyValuePair> = {
  border: "hsl(var(--border-primary))",
  primary: "hsl(var(--border-primary))",
  secondary: "hsl(var(--border-secondary))",
  tertiary: "hsl(var(--border-tertiary))",

  disabled: {
    DEFAULT: "hsl(var(--gray-300))",
    subtle: "hsl(var(--gray-200))",
  },
  brand: {
    DEFAULT: "hsl(var(--brand-500))",
    alt: "hsl(var(--brand-600))",
  },
  error: {
    DEFAULT: "hsl(var(--error-500))",
    subtle: "hsl(var(--error-300))",
  },
};

export default BorderColor;
