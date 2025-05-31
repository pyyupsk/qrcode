import type { ScanResult } from "./ScanResult"

export type QRCodeScannerProps = {
  onScanResult: (_result: ScanResult) => void
  loading: boolean
}
