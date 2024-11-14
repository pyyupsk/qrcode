import type { ActiveTab } from "@/types";
import { z } from "zod";

const urlSchema = z.string().url();

export const validateQRInput = (
  input: string,
  type: ActiveTab,
): string | null => {
  if (!input) {
    return "Please provide input data";
  }

  const dataSize = new Blob([input]).size;
  if (dataSize > 2953) {
    return "Data size exceeds the limit for QR Code";
  }

  if (type === "url") {
    const urlValidation = urlSchema.safeParse(input);
    if (!urlValidation.success) {
      return "Please provide a valid URL";
    }
  }

  return null;
};
