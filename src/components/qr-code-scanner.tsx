"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  loadImageFromUrl,
  loadImageFromFile,
  scanQRCode,
} from "@/lib/scan-service";
import type { QRCodeScannerProps } from "@/types";
import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";

export function QRCodeScanner({ onScanResult, loading }: QRCodeScannerProps) {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [pastedFile, setPastedFile] = useState<File | null>(null);

  const handleScan = async (image: HTMLImageElement) => {
    try {
      const result = await scanQRCode(image);
      onScanResult(result);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to scan QR code",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setInputFile(null);
    setImageUrl("");
    setPastedFile(null);
  };

  const handleSubmit = async () => {
    try {
      let image: HTMLImageElement | null = null;

      if (inputFile) image = await loadImageFromFile(inputFile);
      if (imageUrl) image = await loadImageFromUrl(imageUrl);
      if (pastedFile) image = await loadImageFromFile(pastedFile);

      if (!image) {
        toast({
          title: "Error",
          description: "No image selected",
          variant: "destructive",
        });
        return;
      }

      await handleScan(image);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to scan QR code",
        variant: "destructive",
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) void setPastedFile(file);
    },
    disabled: loading || !!imageUrl || !!pastedFile,
  });

  return (
    <div className="mt-3.5 space-y-6">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="file">Upload Image</Label>
        <Input
          id="file"
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) setInputFile(file);
          }}
          disabled={loading || !!imageUrl || !!pastedFile}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="url">Image URL</Label>
        <Input
          id="url"
          type="url"
          placeholder="https://example.com/qr-code.png"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          disabled={loading || !!inputFile || !!pastedFile}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label>Drag and Drop Image</Label>
        <div
          className="flex h-[170px] items-center justify-center rounded-lg border-2 border-dashed"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div
            className={cn(
              "flex h-full w-full cursor-pointer items-center justify-center",
              {
                "cursor-not-allowed opacity-50":
                  loading || !!inputFile || !!imageUrl,
              },
            )}
          >
            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <p className="text-muted-foreground text-center">
                {!pastedFile
                  ? "Drag & Drop an image here or click to select"
                  : "Image selected"}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex w-full items-center gap-2">
        <Button
          onClick={handleReset}
          className="w-full"
          disabled={loading}
          variant="outline"
        >
          Reset Image Selection
        </Button>
        <Button onClick={handleSubmit} className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scanning...
            </>
          ) : (
            "Scan QR Code"
          )}
        </Button>
      </div>
    </div>
  );
}
