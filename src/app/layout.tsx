import "@/styles/globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { GlobalLayout } from "@/contexts/GlobalLayout";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--lato-font-family",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("global layout");
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-primary text-fg-primary font-lato antialiased",
          lato.variable
        )}
      >
        <GlobalLayout>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </GlobalLayout>
      </body>
    </html>
  );
}
