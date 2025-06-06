"use client"

import { Copy, ScanText, Delete } from "lucide-react"
import Image from "next/image"

import type { ResultDisplayProps } from "@/types"

import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

import { Textarea } from "./ui/textarea"

export function ResultDisplay({ result, onReset }: Readonly<ResultDisplayProps>) {
  const { data, image, width, height, format, timestamp } = result

  if (!data) {
    return (
      <div className="text-muted-foreground text-center">
        <ScanText className="mx-auto mb-4 h-96 w-80 opacity-20" />
        <p>Scan a QR code to see its contents here</p>
      </div>
    )
  }

  const onCopy = () => {
    void navigator.clipboard.writeText(result.data)
    toast({
      title: "Copied to clipboard",
      description: "QR code data copied to clipboard",
    })
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
        <div className="text-muted-foreground ml-4">
          <p>
            <strong>Image Format:</strong> {format}
          </p>
          <p>
            <strong>Image Size:</strong> {width} x {height} pixels
          </p>
          <p>
            <strong>Scanned At:</strong> {new Date(timestamp).toLocaleString()}
          </p>
        </div>
      </div>
      <Textarea value={result.data} readOnly rows={4} className="mb-6" />
      <div className="flex gap-2">
        <Button onClick={onReset} variant="outline">
          <Delete className="mr-2 h-4 w-4" />
          Clear Results
        </Button>
        <Button onClick={onCopy}>
          <Copy className="mr-2 h-4 w-4" />
          Copy Content
        </Button>
      </div>
    </div>
  )
}
