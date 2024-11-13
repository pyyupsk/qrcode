import type { Dispatch, SetStateAction } from "react";
import type { ActiveTab } from "./ActiveTab";
import type { QRCodeOptions } from "./QRCodeOptions";

export interface QRCodeFormProps {
  onGenerate: (input: string, options: QRCodeOptions) => Promise<void>;
  loading: boolean;
  tab: ActiveTab;
  setTab: Dispatch<SetStateAction<ActiveTab>>;
}
