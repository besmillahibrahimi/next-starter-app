import "@/styles/globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { GlobalLayout } from "@/contexts/GlobalLayout";
import { Navbar } from "@/components/molecules/navbar/Navbar";
import { INavMenu } from "@/lib/types/navbar";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--lato-font-family",
});

export const metadata: Metadata = {
  title: "Next Start App",
  description:
    "This started app is created to help you not configure theming, i18n, and others from scratch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("global layout");
  const menus: INavMenu[] = [
    {
      key: "category",
      menus: [
        {
          key: "Marble",
          href: "/stone/marble",
        },
        {
          key: "Marmar",
          href: "/stone/marmar",
        },
        {
          key: "Granite",
          href: "/stone/granite",
        },
      ],
    },
  ];
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-primary text-fg-primary font-lato antialiased",
          lato.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar menus={menus} />
          <GlobalLayout>{children}</GlobalLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
