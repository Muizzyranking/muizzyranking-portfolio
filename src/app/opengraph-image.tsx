import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div style={{
      width: 1200,
      height: 630,
      background: "#100d0c",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "72px 80px",
      position: "relative",
    }}>
      {/* Grid texture */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "linear-gradient(#2a1f18 1px, transparent 1px), linear-gradient(90deg, #2a1f18 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        opacity: 0.5,
        display: "flex",
      }} />

      {/* Accent glow — top left */}
      <div style={{
        position: "absolute",
        top: -120,
        left: -80,
        width: 480,
        height: 480,
        background: "radial-gradient(circle, rgba(184,92,69,0.14) 0%, transparent 70%)",
        display: "flex",
      }} />

      {/* Top accent line */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 80,
        right: 80,
        height: 1,
        background: "linear-gradient(to right, #b85c45, #332620, transparent)",
        display: "flex",
      }} />

      {/* Content */}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 0 }}>

        {/* Eyebrow */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 32,
        }}>
          <span style={{
            fontFamily: "monospace",
            fontSize: 13,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#b85c45",
            opacity: 0.7,
          }}>[ dev ]</span>
          <span style={{
            fontFamily: "monospace",
            fontSize: 13,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#5c4e43",
          }}>Backend Engineer</span>
        </div>

        {/* Name — stacked like hero */}
        <span style={{
          fontFamily: "monospace",
          fontSize: 80,
          fontWeight: 700,
          color: "#b85c45",
          letterSpacing: "-4px",
          lineHeight: 0.95,
          display: "block",
          marginBottom: 4,
        }}>
          Muiz
        </span>
        <span style={{
          fontFamily: "monospace",
          fontSize: 80,
          fontWeight: 700,
          color: "#f5f0e8",
          letterSpacing: "-4px",
          lineHeight: 0.95,
          display: "block",
          marginBottom: 36,
        }}>
          Oyebowale
        </span>

        {/* Tagline */}
        <span style={{
          fontSize: 20,
          color: "#c4ad93",
          lineHeight: 1.6,
          maxWidth: 580,
          display: "block",
        }}>
          I build the parts of software nobody sees — and I'm fine with that.
        </span>
      </div>

      {/* Bottom — domain */}
      <div style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <span style={{
          fontFamily: "monospace",
          fontSize: 13,
          color: "#5c4e43",
          letterSpacing: "0.08em",
        }}>
          muizzyranking.dev
        </span>
        <span style={{
          fontFamily: "monospace",
          fontSize: 13,
          color: "#b85c45",
          letterSpacing: "0.08em",
          opacity: 0.5,
        }}>
          :wq
        </span>
      </div>
    </div>,
    { ...size }
  );
}
