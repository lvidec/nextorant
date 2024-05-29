import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nextorant",
  description: "Restorant application for ordering food",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body
        suppressHydrationWarning
        className={cn(
          "flex min-h-screen flex-col m-12",
          inter.className
        )}
      >
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
