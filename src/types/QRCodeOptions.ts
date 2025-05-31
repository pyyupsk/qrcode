import type { QRCodeErrorCorrectionLevel } from "qrcode"

export type QRCodeOptions = {
  errorCorrectionLevel: QRCodeErrorCorrectionLevel
  margin: number
  resolution: number
  darkColor: string
  lightColor: string
}
