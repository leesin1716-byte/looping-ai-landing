import { ImageResponse } from "next/og";

export const alt = "Looping Ai — Ideas to web, in days.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: 80,
          color: "#EDEDF2",
          backgroundColor: "#07070C",
          backgroundImage:
            "radial-gradient(circle at 18% 20%, rgba(139,92,246,0.40), transparent 45%), radial-gradient(circle at 86% 82%, rgba(34,211,238,0.30), transparent 45%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 9999,
              background: "linear-gradient(135deg, #8b5cf6, #22d3ee)",
            }}
          />
          <div style={{ fontSize: 38, fontWeight: 700 }}>Looping Ai</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 48,
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 1.05,
            backgroundImage: "linear-gradient(100deg, #a78bfa, #22d3ee 55%, #e879f9)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          <div>Ideas to web,</div>
          <div>in days.</div>
        </div>

        <div style={{ marginTop: 30, fontSize: 34, color: "#9CA3AF" }}>
          Landing · AI Web · Dashboard
        </div>
      </div>
    ),
    { ...size },
  );
}
