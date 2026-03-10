import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        background: "#0e0e0e",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        position: "relative",
      }}
    >
      {/* Grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(#1f1f1f 1px, transparent 1px), linear-gradient(90deg, #1f1f1f 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          opacity: 0.3,
        }}
      />

      {/* Accent glow */}
      <div
        style={{
          position: "absolute",
          top: -100,
          left: -100,
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 14,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#c9a84c",
            marginBottom: 24,
            display: "block",
          }}
        >
          Backend Engineer
        </span>

        <span
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#f0ece4",
            letterSpacing: "-3px",
            lineHeight: 1.05,
            marginBottom: 24,
            display: "block",
          }}
        >
          Muiz Oyebowale
        </span>

        <span
          style={{
            fontSize: 22,
            color: "#b8b0a4",
            lineHeight: 1.6,
            maxWidth: 600,
            display: "block",
            marginBottom: 48,
          }}
        >
          I build the parts of software nobody sees — and I&apos;m fine with that.
        </span>

        <span
          style={{
            fontFamily: "monospace",
            fontSize: 14,
            color: "#5a5550",
            display: "block",
          }}
        >
          muizzyranking.dev
        </span>
      </div>
    </div>,
    { ...size }
  );
}
