"use client"

import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useDropzone } from "react-dropzone"

import type { QRCodeScannerProps } from "@/types"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { loadImageFromUrl, loadImageFromFile, scanQRCode } from "@/lib/scan-service"
import { cn } from "@/lib/utils"

export function QRCodeScanner({ onScanResult, loading }: Readonly<QRCodeScannerProps>) {
  const [inputFile, setInputFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>("")
  const [pastedFile, setPastedFile] = useState<File | null>(null)

  const handleScan = async (image: HTMLImageElement) => {
    try {
      const result = await scanQRCode(image)
      onScanResult(result)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to scan QR code",
        variant: "destructive",
      })
    }
  }

  const handleReset = () => {
    setInputFile(null)
    setImageUrl("")
    setPastedFile(null)
  }

  const handleSubmit = async () => {
    try {
      let image: HTMLImageElement | null = null

      if (inputFile) image = await loadImageFromFile(inputFile)
      if (imageUrl) image = await loadImageFromUrl(imageUrl)
      if (pastedFile) image = await loadImageFromFile(pastedFile)

      if (!image) {
        toast({
          title: "Error",
          description: "No image selected",
          variant: "destructive",
        })
        return
      }

      await handleScan(image)
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to scan QR code",
        variant: "destructive",
      })
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) setPastedFile(file)
    },
    disabled: loading || !!imageUrl || !!pastedFile,
  })

  return (
    <div className="mt-3.5 space-y-6">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="file">Upload QR Code Image</Label>
        <Input
          id="file"
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0]
            if (file) setInputFile(file)
          }}
          disabled={loading || !!imageUrl || !!pastedFile}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="url">QR Code Image URL</Label>
        <Input
          id="url"
          type="url"
          placeholder="https://example.com/qr-code.jpg"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          disabled={loading || !!inputFile || !!pastedFile}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label>Drop QR Code Image Here</Label>
        <div
          className="flex h-[170px] items-center justify-center rounded-lg border-2 border-dashed"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div
            className={cn("flex h-full w-full cursor-pointer items-center justify-center", {
              "cursor-not-allowed opacity-50": loading || !!inputFile || !!imageUrl,
            })}
          >
            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <p className="text-muted-foreground text-center">
                {!pastedFile
                  ? "Drop your QR code image here or click to browse"
                  : "Image ready to scan"}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex w-full items-center gap-2">
        <Button onClick={handleReset} className="w-full" disabled={loading} variant="outline">
          Clear Selection
        </Button>
        <Button onClick={handleSubmit} className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Decoding QR Code...
            </>
          ) : (
            "Decode QR Code"
          )}
        </Button>
      </div>
    </div>
  )
}
