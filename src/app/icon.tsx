import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "32px",
        height: "32px",
        background: "#881600",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "7px",
        position: "relative",
      }}
    >
      <span
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontStyle: "italic",
          fontSize: "17px",
          fontWeight: 700,
          color: "#fff6f2",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          marginTop: "-2px",
        }}
      >
        m
      </span>

      <div
        style={{
          position: "absolute",
          bottom: "5px",
          right: "5px",
          width: "4px",
          height: "4px",
          borderRadius: "50%",
          background: "#fbbf24",
        }}
      />
    </div>,
    { ...size },
  );
}
