import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        background: "#c9a84c",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        border: "1px solid #2a2a2a",
      }}
    >
      <span
        style={{
          fontFamily: "monospace",
          fontSize: 13,
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "-0.5px",
        }}
      >
        M.
      </span>
    </div>,
    { ...size }
  );
}
