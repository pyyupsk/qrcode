import "@/styles/globals.css"

import type { Metadata } from "next"

import { Open_Sans as FontSans } from "next/font/google"

import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "QR Code Studio - Generate Beautiful QR Codes",
  description: "Create customized QR codes for URLs, text, and files with advanced options",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

const sans = FontSans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={sans.variable}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
