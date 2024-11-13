import type { QRCodeOptions } from "./QRCodeOptions";

export interface QRCodeFormProps {
  onGenerate: (input: string, options: QRCodeOptions) => Promise<void>;
  loading: boolean;
}
