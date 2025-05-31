"use client"

import type { QRCodeErrorCorrectionLevel } from "qrcode"

import { Loader2 } from "lucide-react"
import { useState } from "react"

import type { QRCodeFormProps, QRCodeOptions } from "@/types"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { TabsContent } from "@/components/ui/tabs"

import { ColorPicker } from "./color-picker"

export function QRCodeForm({ onGenerate, loading }: Readonly<QRCodeFormProps>) {
  const [input, setInput] = useState<string>("")
  const [errorLevel, setErrorLevel] = useState<QRCodeErrorCorrectionLevel>("M")
  const [darkColor, setDarkColor] = useState<string>("#000000")
  const [lightColor, setLightColor] = useState<string>("#FFFFFF")
  const [margin, setMargin] = useState<number[]>([1])
  const [resolution, setResolution] = useState<number>(1024)

  const handleSubmit = async () => {
    const options: QRCodeOptions = {
      errorCorrectionLevel: errorLevel,
      margin: margin[0] ?? 1,
      resolution,
      darkColor,
      lightColor,
    }

    await onGenerate(input, options)
  }

  return (
    <div className="space-y-6">
      <div>
        <TabsContent value="url">
          <Label htmlFor="url">Enter URL</Label>
          <Input
            id="url"
            placeholder="https://example.com"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mt-1"
          />
        </TabsContent>

        <TabsContent value="text">
          <Label htmlFor="text">Enter Text</Label>
          <Input
            id="text"
            placeholder="Enter your text here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mt-1"
          />
        </TabsContent>
      </div>

      {/* Options Section */}
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <Label>Error Correction Level</Label>
          <Select
            value={errorLevel}
            onValueChange={(value) => setErrorLevel(value as QRCodeErrorCorrectionLevel)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="L">L (Low) (~7%)</SelectItem>
              <SelectItem value="M">M (Medium) (~15%)</SelectItem>
              <SelectItem value="Q">Q (Quartile) (~25%)</SelectItem>
              <SelectItem value="H">H (High) (~30%)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2">
          <Label>Margin Size</Label>
          <Slider value={margin} onValueChange={setMargin} min={0} max={5} step={1} />
        </div>

        <div className="flex flex-col space-y-2">
          <Label>Resolution</Label>
          <Select
            value={String(resolution)}
            onValueChange={(value) => setResolution(Number(value))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="256">256x256</SelectItem>
              <SelectItem value="512">512x512</SelectItem>
              <SelectItem value="1024">1024x1024</SelectItem>
              <SelectItem value="2048">2048x2048</SelectItem>
              <SelectItem value="4096">4096x4096</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex space-x-4">
          <div className="flex w-full flex-col space-y-2">
            <Label>QR Code Color</Label>
            <ColorPicker color={darkColor} setColor={setDarkColor} className="w-full" />
          </div>

          <div className="flex w-full flex-col space-y-2">
            <Label>Background Color</Label>
            <ColorPicker color={lightColor} setColor={setLightColor} className="w-full" />
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate QR Code"
          )}
        </Button>
      </div>
    </div>
  )
}
