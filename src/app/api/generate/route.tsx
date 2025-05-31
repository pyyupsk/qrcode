import { NextResponse } from "next/server"
import { z } from "zod"

import { generateQRCode } from "@/lib/qr-service"

const querySchema = z.object({
  text: z.string().min(1),
  level: z.enum(["L", "M", "Q", "H"]).default("H"),
  margin: z.coerce.number().min(0).max(10).default(4),
  dark: z.string().default("#000000"),
  light: z.string().default("#ffffff"),
  size: z.coerce.number().min(100).max(2000).default(512),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const params = Object.fromEntries(searchParams)
    const { text, level, margin, dark, light, size } = querySchema.parse(params)

    const qrCode = await generateQRCode(text, {
      errorCorrectionLevel: level,
      margin,
      darkColor: dark,
      lightColor: light,
      resolution: size,
    })

    return NextResponse.json({ qrCode })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 },
      )
    }

    console.error("QR code generation error:", error)
    return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 })
  }
}
