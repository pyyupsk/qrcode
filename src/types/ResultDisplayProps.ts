import type { ScanResult } from "./ScanResult";

export interface ResultDisplayProps {
  result: ScanResult;
  onReset: () => void;
  onCopy: () => void;
}
