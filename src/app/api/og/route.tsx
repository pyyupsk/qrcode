import { ImageResponse } from "next/og"

import { BASE_URL } from "@/constants/domain"

export const runtime = "edge"
export const contentType = "image/png"
export const alt =
  "QR Code Studio - Create, customize, and scan QR codes with advanced features and real-time preview"

export async function GET() {
  try {
    const res = await fetch(
      `${BASE_URL}/api/generate?text=${BASE_URL}&level=H&margin=2&dark=#000000&light=#ffffff&size=512`,
    )
    const { qrCode } = (await res.json()) as { qrCode: string }

    return new ImageResponse(
      (
        <div
          style={{
            width: "1200px",
            height: "630px",
            display: "flex",
            position: "relative",
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
            overflow: "hidden",
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: `
                radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 60% 30%, rgba(34, 197, 94, 0.06) 0%, transparent 50%)
              `,
            }}
          />

          {/* Geometric Shapes */}
          <div
            style={{
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: "300px",
              height: "300px",
              background:
                "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))",
              borderRadius: "50%",
              filter: "blur(1px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-50px",
              left: "-50px",
              width: "200px",
              height: "200px",
              background:
                "linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(59, 130, 246, 0.08))",
              borderRadius: "50%",
              filter: "blur(1px)",
            }}
          />

          {/* Main Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              height: "100%",
              padding: "80px",
              position: "relative",
            }}
          >
            {/* Left Content */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flex: 1,
                maxWidth: "650px",
              }}
            >
              {/* Badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "rgba(59, 130, 246, 0.1)",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                  borderRadius: "50px",
                  padding: "8px 20px",
                  fontSize: "16px",
                  color: "#60a5fa",
                  marginBottom: "24px",
                  fontWeight: 500,
                }}
              >
                ✨ Modern QR Code Generator
              </div>

              {/* Title */}
              <div
                style={{
                  display: "flex",
                  fontSize: "72px",
                  fontWeight: 800,
                  color: "white",
                  lineHeight: 1.1,
                  marginBottom: "24px",
                }}
              >
                QR Code Studio
              </div>

              {/* Subtitle */}
              <div
                style={{
                  display: "flex",
                  fontSize: "24px",
                  color: "#94a3b8",
                  lineHeight: 1.5,
                  marginBottom: "32px",
                  fontWeight: 400,
                }}
              >
                Create, customize, and scan QR codes with advanced features and real-time preview
              </div>

              {/* Features */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "24px",
                  fontSize: "16px",
                  color: "#cbd5e1",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#22c55e",
                    }}
                  />
                  Privacy-First
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#3b82f6",
                    }}
                  />
                  Open Source
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#a855f7",
                    }}
                  />
                  API Ready
                </div>
              </div>
            </div>

            {/* Right Content - QR Code */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* QR Code Container with Glow Effect */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "240px",
                  height: "240px",
                  background: "white",
                  borderRadius: "24px",
                  padding: "20px",
                  boxShadow: `
                    0 25px 50px -12px rgba(0, 0, 0, 0.25),
                    0 0 0 1px rgba(255, 255, 255, 0.1),
                    0 0 60px rgba(59, 130, 246, 0.3)
                  `,
                  position: "relative",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrCode}
                  alt="QR code preview"
                  width={200}
                  height={200}
                  style={{
                    borderRadius: "8px",
                    filter: "contrast(1.1)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Gradient Line */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "4px",
              background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #22c55e, #f59e0b)",
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e) {
    console.error("Error generating OG image:", e)
    return new Response("Failed to generate OG image", { status: 500 })
  }
}
