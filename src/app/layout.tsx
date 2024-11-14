import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code Studio - Generate Beautiful QR Codes",
  description:
    "Create customized QR codes for URLs, text, and files with advanced options",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={GeistSans.variable}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
