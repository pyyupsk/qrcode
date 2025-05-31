import { QrCode } from "lucide-react"

import { QRCodeGenerator } from "@/components/qr-code-generator"
import { generateMetadata } from "@/lib/metadata"

export const metadata = generateMetadata({
  description: "Create, customize, and scan QR codes with advanced features and real-time preview",
  title: "QR Code Studio",
})

export default function Page() {
  return (
    <main className="grid min-h-screen place-items-center items-center py-12">
      <div className="container">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <QrCode className="text-primary h-12 w-12" />
            <h1 className="text-2xl font-bold tracking-tight md:text-4xl">QR Code Studio</h1>
          </div>
          <p className="text-muted-foreground text-base md:text-lg">
            Create stunning QR codes with advanced customization options
          </p>
        </div>
        <QRCodeGenerator />
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm md:text-base">
            Your data stays private - everything runs in your browser. Check out the{" "}
            <a
              href="https://github.com/pyyupsk/qrcode"
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:text-muted-foreground underline transition-colors duration-200"
            >
              open source code
            </a>
            {""}.
          </p>
        </div>
      </div>
    </main>
  )
}
