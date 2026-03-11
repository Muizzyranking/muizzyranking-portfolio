import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{
      width: 32,
      height: 32,
      background: "#100d0c",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    }}>
      {/* Top-left corner accent */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 8,
        height: 1,
        background: "#b85c45",
        display: "flex",
      }} />
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1,
        height: 8,
        background: "#b85c45",
        display: "flex",
      }} />

      {/* Bottom-right corner accent */}
      <div style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 8,
        height: 1,
        background: "#b85c45",
        display: "flex",
      }} />
      <div style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 1,
        height: 8,
        background: "#b85c45",
        display: "flex",
      }} />

      {/* [ m ] text */}
      <span style={{
        fontFamily: "monospace",
        fontSize: 16,
        fontWeight: 700,
        color: "#f5f0e8",
        letterSpacing: "-0.5px",
        display: "flex",
        alignItems: "center",
        gap: 1,
        lineHeight: 1,
      }}>
        <span style={{ color: "#b85c45" }}>[</span>
        m
        <span style={{ color: "#b85c45" }}>]</span>
      </span>
    </div>,
    { ...size }
  );
}
