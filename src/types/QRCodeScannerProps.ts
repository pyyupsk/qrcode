import type { ScanResult } from "./ScanResult";

export interface QRCodeScannerProps {
  onScanResult: (result: ScanResult) => void;
  loading: boolean;
}
