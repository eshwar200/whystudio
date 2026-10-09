import { ImageResponse } from "next/og";

export const alt = "WHY Venture Studio — What are you building?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#FFFFFF", color: "#0E0E0E", padding: 64, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, opacity: 0.7 }}>
          <span>WHY VENTURE STUDIO</span>
          <span>INDIA</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 0.9, letterSpacing: -4 }}>WHAT ARE YOU</div>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 900, lineHeight: 0.9, letterSpacing: -4 }}>
            <span style={{ background: "#0B50FF", color: "#FFFFFF", padding: "0 16px" }}>BUILDING?</span>
          </div>
        </div>
        <div style={{ fontSize: 26, opacity: 0.8 }}>Infrastructure for India&apos;s next generation of founders.</div>
      </div>
    ),
    size,
  );
}
