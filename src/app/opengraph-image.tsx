import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #061020 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px" }}>
          <div style={{ width: 56, height: 56, background: "hsl(220,100%,50%)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 900, fontSize: 28 }}>D</span>
          </div>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 32 }}>DON SEO</span>
        </div>

        <h1 style={{ color: "#fff", fontSize: 64, fontWeight: 800, lineHeight: 1.1, margin: "0 0 24px 0", maxWidth: 800 }}>
          Rank Higher.{" "}
          <span style={{ color: "hsl(220,100%,60%)" }}>Grow Faster.</span>
        </h1>

        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 28, margin: "0 0 48px 0", maxWidth: 700 }}>
          Data-driven SEO & Content Marketing for DACH Businesses. Measurable Results, Guaranteed.
        </p>

        <div style={{ display: "flex", gap: "40px" }}>
          {[["100+", "Clients"], ["3x", "Avg. Traffic Growth"], ["4.9/5", "Rating"]].map(([val, label]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ color: "hsl(220,100%,60%)", fontSize: 36, fontWeight: 800 }}>{val}</span>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 18 }}>{label}</span>
            </div>
          ))}
        </div>

        <div style={{ position: "absolute", bottom: 60, right: 80, color: "rgba(255,255,255,0.4)", fontSize: 22 }}>
          don-seo.com
        </div>
      </div>
    ),
    { ...size }
  );
}
