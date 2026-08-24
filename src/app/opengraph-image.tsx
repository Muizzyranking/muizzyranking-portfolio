import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Muiz Oyebowale · Backend-heavy fullstack engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        background: "#fffdf9",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 84px",
        color: "#191512",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "48px",
          left: "48px",
          width: "44px",
          height: "44px",
          borderTop: "3px solid #881600",
          borderLeft: "3px solid #881600",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "48px",
          right: "48px",
          width: "44px",
          height: "44px",
          borderBottom: "3px solid #881600",
          borderRight: "3px solid #881600",
          display: "flex",
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
          color: "#6d655a",
        }}
      >
        <span style={{ color: "#881600" }}>muizzyranking.me</span>
        <span style={{ width: "48px", height: "1px", background: "#e9e4da" }} />
        <span>backend-heavy fullstack engineer</span>
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
            color: "#191512",
            display: "flex",
          }}
        >
          Muiz&nbsp;<span style={{ fontStyle: "italic", color: "#881600" }}>Oyebowale</span>
        </div>
        <div
          style={{
            fontSize: "30px",
            lineHeight: 1.5,
            color: "#463f37",
            maxWidth: "820px",
            fontFamily: "sans-serif",
          }}
        >
          I build the part of the software nobody sees — and that&apos;s exactly how I like it.
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
          color: "#6d655a",
        }}
      >
        <span>projects · writing · about</span>
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "999px", background: "#881600" }} />
          muizzyranking.me
        </span>
      </div>
    </div>,
    { ...size },
  );
}
