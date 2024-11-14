import type { Metadata } from "next";

export interface MetadataOptions {
  additionalMetadata?: Partial<Metadata>;
  description: string;
  image?: string;
  title: string;
}
