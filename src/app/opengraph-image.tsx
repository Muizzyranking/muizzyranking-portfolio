import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Muiz Oyebowale · Backend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        background: "#faf8f4",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 84px",
        color: "#1c1917",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "84px",
          right: "84px",
          width: "14px",
          height: "14px",
          borderRadius: "999px",
          background: "#55702f",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          fontFamily: "monospace",
          fontSize: "22px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#625c4a",
        }}
      >
        <span>muizzyranking.me</span>
        <span style={{ width: "48px", height: "1px", background: "#e3ded4" }} />
        <span style={{ color: "#55702f" }}>backend engineer</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "28px",
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            fontSize: "104px",
            color: "#1c1917",
          }}
        >
          Muiz Oyebowale
        </div>
        <div
          style={{
            fontSize: "30px",
            lineHeight: 1.5,
            color: "#4a463f",
            maxWidth: "800px",
            fontFamily: "sans-serif",
          }}
        >
          Designs and builds APIs, data pipelines, and distributed systems in Python and Django.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "monospace",
          fontSize: "20px",
          letterSpacing: "0.1em",
          color: "#625c4a",
        }}
      >
        <span>projects · writing · about</span>
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "999px", background: "#55702f" }} />
          muizzyranking.me
        </span>
      </div>
    </div>,
    { ...size },
  );
}
