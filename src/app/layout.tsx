import "@/styles/globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { GlobalLayout } from "@/contexts/GlobalLayout";
import { Navbar } from "@/components/molecules/navbar/Navbar";
import { INavMenu } from "@/lib/types/navbar";
import { NavigationContent } from "@/components/molecules/navbar/NavigationContent";

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
          menus: [
            { key: "marmar 1", href: "/marmar/1" },
            { key: "marmar 2", href: "/marmar/1" },
            { key: "marmar 3", href: "/marmar/1" },
            { key: "marmar 4", href: "/marmar/1" },
            { key: "marmar 5", href: "/marmar/1" },
            { key: "marmar 6", href: "/marmar/1" },
          ],
        },
        {
          key: "Granite",
          href: "/stone/granite",
          menus: [
            {
              key: "granite 1",
              menus: [
                { key: "granite 1,2" },
                { key: "granite 1,3" },
                {
                  key: "granite 1,4",
                  menus: [
                    { key: "granite 1.4.1" },
                    { key: "granite 1.4.2" },
                    { key: "granite 1.4.3" },
                    { key: "granite 1.4.4" },
                  ],
                },
                { key: "granite 2" },
                { key: "granite 2" },
              ],
            },
            { key: "granite 2" },
            { key: "granite 3" },
            { key: "granite 4" },
            { key: "granite 5" },
            { key: "granite 6" },
            { key: "granite 7" },
            { key: "granite 8" },
            { key: "granite 1" },
          ],
        },
      ],
    },
  ];
  return (
    <html lang="en" dir="rtl" suppressHydrationWarning>
      <body
        dir="rtl"
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
