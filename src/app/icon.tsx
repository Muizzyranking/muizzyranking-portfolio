import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "32px",
          height: "32px",
          background: "#151515",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
          position: "relative",
        }}
      >
        <span
          style={{
            fontFamily: "serif",
            fontSize: "14px",
            fontWeight: 700,
            color: "#9fbf6b",
            letterSpacing: "-0.05em",
            lineHeight: 1,
          }}
        >
          MO
        </span>

        <div
          style={{
            position: "absolute",
            bottom: "4px",
            right: "4px",
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: "#9fbf6b",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
