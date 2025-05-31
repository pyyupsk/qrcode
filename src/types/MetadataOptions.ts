import type { Metadata } from "next"

export type MetadataOptions = {
  additionalMetadata?: Partial<Metadata>
  description: string
  image?: string
  title: string
}
