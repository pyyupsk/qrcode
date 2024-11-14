"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { QRCodeForm } from "./qr-code-form";
import { QRCodeDisplay } from "./qr-code-display";
import { validateQRInput } from "@/lib/validation";
import { generateQRCode } from "@/lib/qr-service";
import type { ActiveTab, QRCodeOptions, ScanResult } from "@/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link, FileText, ScanLine } from "lucide-react";
import { QRCodeScanner } from "./qr-code-scanner";
import dynamic from "next/dynamic";

const ResultDisplay = dynamic(() =>
  import("./result-display").then((mod) => mod.ResultDisplay),
);

export function QRCodeGenerator() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("url");
  const [qrCode, setQrCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [resolution, setResolution] = useState<number>(1024);
  const [result, setResult] = useState<ScanResult>({} as ScanResult);

  const handleGenerate = async (input: string, options: QRCodeOptions) => {
    if (activeTab === "scan") {
      toast({
        title: "Error",
        description: "Cannot generate QR code when selecting 'Scan'",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
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
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleScanResult = (result: ScanResult) => {
    if (!result) return;
    setResult(result);
  };

  const handleReset = () => {
    setQrCode("");
    setResult({} as ScanResult);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card className="p-4 lg:p-6">
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

      <Card className="p-4 lg:p-6">
        <div className="flex h-full flex-col items-center justify-center">
          {activeTab !== "scan" ? (
            <div className="p-4 lg:p-6">
              <QRCodeDisplay qrCode={qrCode} resolution={resolution} />
            </div>
          ) : (
            <ResultDisplay result={result} onReset={handleReset} />
          )}
        </div>
      </Card>
    </div>
  );
}
