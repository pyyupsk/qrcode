import type { QRCodeErrorCorrectionLevel } from "qrcode";

export interface QRCodeOptions {
  errorCorrectionLevel: QRCodeErrorCorrectionLevel;
  margin: number;
  resolution: number;
  darkColor: string;
  lightColor: string;
}
