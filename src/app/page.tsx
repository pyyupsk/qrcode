import { QRCodeGenerator } from "@/components/qr-code-generator";
import { QrCode } from "lucide-react";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center items-center">
      <div className="container">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <QrCode className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">
              QR Code Studio
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Generate customized QR codes for URLs, text, and files with advanced
            options
          </p>
        </div>
        <QRCodeGenerator />
      </div>
    </main>
  );
}
