"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { QRCodeForm } from "./qr-code-form";
import { QRCodeDisplay } from "./qr-code-display";
import { validateQRInput } from "@/lib/validation";
import { generateQRCode, downloadQRCode } from "@/lib/qr-service";
import type { ActiveTab, QRCodeOptions, ScanResult } from "@/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link, FileText, ScanLine } from "lucide-react";
import { QRCodeScanner } from "./qr-code-scanner";
import { ResultDisplay } from "./result-display";

export function QRCodeGenerator() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("url");
  const [qrCode, setQrCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [resolution, setResolution] = useState<number>(1024);
  const [result, setResult] = useState<ScanResult>({} as ScanResult);

  const handleGenerate = async (input: string, options: QRCodeOptions) => {
    try {
      setLoading(true);

      if (activeTab === "scan") {
        toast({
          title: "Error",
          description: "Cannot generate QR code when selecting 'Scan'",
          variant: "destructive",
        });
        return;
      }

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

  const handleScanResult = (result: ScanResult) => {
    if (!result) return;
    setResult(result);
  };

  const handleDownload = () => {
    if (!qrCode) return;
    downloadQRCode(qrCode, resolution);
  };

  const handleReset = () => {
    setQrCode("");
    setResult({} as ScanResult);
  };

  const handleCopy = () => {
    if (!result) return;
    void navigator.clipboard.writeText(result.data);
  };

  return (
    <div className="grid h-[522px] gap-8 md:grid-cols-2">
      <Card className="p-6">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as ActiveTab)}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="url">
              <Link className="mr-2 h-4 w-4" />
              URL
            </TabsTrigger>
            <TabsTrigger value="text">
              <FileText className="mr-2 h-4 w-4" />
              Text
            </TabsTrigger>
            <TabsTrigger value="scan">
              <ScanLine className="mr-2 h-4 w-4" />
              Scan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="url">
            <QRCodeForm onGenerate={handleGenerate} loading={loading} />
          </TabsContent>

          <TabsContent value="text">
            <QRCodeForm onGenerate={handleGenerate} loading={loading} />
          </TabsContent>

          <TabsContent value="scan">
            <QRCodeScanner onScanResult={handleScanResult} loading={loading} />
          </TabsContent>
        </Tabs>
      </Card>

      <Card className="p-6">
        <div className="flex h-full flex-col items-center justify-center">
          {activeTab !== "scan" ? (
            <div className="p-6">
              <QRCodeDisplay
                qrCode={qrCode}
                resolution={resolution}
                onDownload={handleDownload}
              />
            </div>
          ) : (
            <ResultDisplay
              result={result}
              onReset={handleReset}
              onCopy={handleCopy}
            />
          )}
        </div>
      </Card>
    </div>
  );
}
