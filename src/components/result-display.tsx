"use client";

import { Copy, ScanText, Delete } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ResultDisplayProps } from "@/types";
import { Textarea } from "./ui/textarea";
import Image from "next/image";

export function ResultDisplay({ result, onReset, onCopy }: ResultDisplayProps) {
  const { data, image, width, height, format, timestamp } = result;

  if (!data) {
    return (
      <div className="text-center text-muted-foreground">
        <ScanText className="mx-auto mb-4 h-96 w-80 opacity-20" />
        <p>QR code data will appear here</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 flex w-full">
        <Image
          src={image.src}
          alt="QR Code Image"
          className="w-72"
          width={image.width}
          height={image.height}
        />
        <div className="ml-4 text-muted-foreground">
          <p>
            <strong>Format:</strong> {format}
          </p>
          <p>
            <strong>Dimensions:</strong> {width} x {height} px
          </p>
          <p>
            <strong>Timestamp:</strong> {new Date(timestamp).toLocaleString()}
          </p>
        </div>
      </div>
      <Textarea value={result.data} readOnly rows={4} className="mb-6" />
      <div className="flex gap-2">
        <Button onClick={onReset} variant="outline">
          <Delete className="mr-2 h-4 w-4" />
          Reset result output
        </Button>
        <Button onClick={onCopy}>
          <Copy className="mr-2 h-4 w-4" />
          Copy to clipboard
        </Button>
      </div>
    </div>
  );
}
