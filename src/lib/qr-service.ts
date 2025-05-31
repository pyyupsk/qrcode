import QRCode from "qrcode"

import type { QRCodeOptions } from "@/types"

export const generateQRCode = async (input: string, options: QRCodeOptions): Promise<string> => {
  const qr = await QRCode.toDataURL(input, {
    errorCorrectionLevel: options.errorCorrectionLevel,
    margin: options.margin,
    color: {
      dark: options.darkColor,
      light: options.lightColor,
    },
    rendererOpts: {
      quality: 1,
    },
    width: options.resolution,
  })

  return qr
}

export const downloadQRCode = (qrCode: string, resolution: number): void => {
  const link = document.createElement("a")
  link.href = qrCode
  link.download = `qrcode_${new Date().getTime()}_${resolution}x${resolution}.png`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
