"use client";

import Image from "next/image";
import { Download, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { QRCodeDisplayProps } from "@/types";
import { downloadQRCode } from "@/lib/qr-service";

export function QRCodeDisplay({ qrCode, resolution }: QRCodeDisplayProps) {
  if (!qrCode) {
    return (
      <div className="text-center text-muted-foreground">
        <QrCode className="mx-auto mb-4 h-96 w-80 opacity-20" />
        <p>Generated QR code will appear here</p>
      </div>
    );
  }

  const onDownload = () => {
    if (!qrCode) return;
    downloadQRCode(qrCode, resolution);
  };

  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 text-center text-muted-foreground">
        Resolution: {resolution}
      </p>
      <div className="mb-6">
        <Image
          src={qrCode}
          alt="Generated QR Code"
          className="mx-auto w-80"
          width={resolution}
          height={resolution}
        />
      </div>
      <Button onClick={onDownload}>
        <Download className="mr-2 h-4 w-4" />
        Download QR Code
      </Button>
    </div>
  );
}
