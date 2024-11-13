"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { QRCodeForm } from "./qr-code-form";
import { QRCodeDisplay } from "./qr-code-display";
import { validateQRInput } from "@/lib/validation";
import { generateQRCode, downloadQRCode } from "@/lib/qr-service";
import type { ActiveTab, QRCodeOptions } from "@/types";

export function QRCodeGenerator() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("url");
  const [qrCode, setQrCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [resolution, setResolution] = useState<number>(1024);

  const handleGenerate = async (input: string, options: QRCodeOptions) => {
    try {
      setLoading(true);

      const validationError = validateQRInput(input, activeTab);
      if (validationError) {
        toast({
          title: "Error",
          description: validationError,
          variant: "destructive",
        });
        return;
      }

      const qr = await generateQRCode(input, options);
      setQrCode(qr);
      setResolution(options.resolution);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!qrCode) return;
    downloadQRCode(qrCode, resolution);
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="p-6">
        <QRCodeForm
          onGenerate={handleGenerate}
          loading={loading}
          tab={activeTab}
          setTab={setActiveTab}
        />
      </Card>

      <Card className="p-6">
        <div className="flex h-full flex-col items-center justify-center">
          <QRCodeDisplay
            qrCode={qrCode}
            resolution={resolution}
            onDownload={handleDownload}
          />
        </div>
      </Card>
    </div>
  );
}
