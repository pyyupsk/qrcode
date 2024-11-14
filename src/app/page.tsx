import { QRCodeGenerator } from "@/components/qr-code-generator";
import { generateMetadata } from "@/lib/metadata";
import { QrCode } from "lucide-react";

export const metadata = generateMetadata({
  description:
    "Generate and scan QR codes with customized and advanced options",
  title: "QR Code Studio",
});

export default function Page() {
  return (
    <main className="grid min-h-screen place-items-center items-center py-12">
      <div className="container">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <QrCode className="h-12 w-12 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight md:text-4xl">
              QR Code Studio
            </h1>
          </div>
          <p className="text-base text-muted-foreground md:text-lg">
            Generate/Scan QR codes with customized, and advanced options
          </p>
        </div>
        <QRCodeGenerator />
      </div>
    </main>
  );
}
