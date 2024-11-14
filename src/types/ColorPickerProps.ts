import type { Dispatch, SetStateAction } from "react";

export interface ColorPickerProps {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  className?: string;
}
