import jsQR from "jsqr"

import type { ScanResult } from "@/types"

import { generateQRCode } from "./qr-service"

export async function loadImageFromUrl(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const res = fetch(url)
    res
      .then((res) => res.blob())
      .then((blob) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = URL.createObjectURL(blob)
      })
      .catch(reject)
  })
}

export async function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = e.target?.result as string
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export async function scanQRCode(image: HTMLImageElement): Promise<ScanResult> {
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  if (!context) throw new Error("Could not create canvas context")

  canvas.width = image.width
  canvas.height = image.height
  context.drawImage(image, 0, 0)

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
  const code = jsQR(imageData.data, imageData.width, imageData.height)

  if (!code) throw new Error("No QR code found in image")

  const data = code.data
  const format = detectFormat(data)
  const timestamp = new Date().toISOString()

  const qrcodeImage = new Image()
  qrcodeImage.src = image.src // Default to the original image

  // If the image is not a square, maybe the image is not only a QR code
  // so we need to show it as a QR code
  // let's try to generate it from the data
  if (image.width !== image.height) {
    const qrcode = await generateQRCode(data, {
      resolution: 512,
      errorCorrectionLevel: "L",
      margin: 2,
      darkColor: "#000000",
      lightColor: "#FFFFFF",
    })

    qrcodeImage.src = qrcode
  }

  await new Promise((resolve) => {
    qrcodeImage.onload = resolve
  })

  return {
    data,
    image: qrcodeImage,
    width: qrcodeImage.width,
    height: qrcodeImage.height,
    format,
    timestamp,
  }
}

const formatPatterns: Record<string, RegExp> = {
  Email:
    /^[a-zA-Z0-9.!#$%& *+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  Contact: /^(tel:|MATMSG:|BEGIN:VCARD|MAILTO:|SMS:|smsto:|mms:|mmsto:)/,
  JSON: /^\s*({(?:[^{}]|"[^"]*")*}|\[(?:[^[\]]|"[^"]*")*\])\s*$/,
  Phone: /^(?:\(\d{3}\)\s?|\d{3}-)\d{3}-\d{4}$/,
  URL: /^http/,
  WiFi: /^WIFI/,
  GeoLocation: /^geo:/,
  Text: /.*/,
  Other: /./,
}

function detectFormat(data: string): ScanResult["format"] {
  for (const [format, pattern] of Object.entries(formatPatterns)) {
    if (pattern.test(data)) return format as ScanResult["format"]
  }
  return "Other"
}
