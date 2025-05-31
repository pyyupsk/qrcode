import type { QRCodeOptions } from "./QRCodeOptions"

export type QRCodeFormProps = {
  onGenerate: (_input: string, _options: QRCodeOptions) => Promise<void>
  loading: boolean
}
