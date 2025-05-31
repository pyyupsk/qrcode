export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://qrcode.pyyupsk.vercel.app"
    : "http://localhost:3000"
