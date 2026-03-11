import type { Metadata } from "next";
import AnimatedLink from "@/components/ui/AnimatedLink";

export const metadata: Metadata = {
  title: "404 — Not Found",
};

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Grid texture */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(var(--color-border-subtle) 1px, transparent 1px),
          linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        opacity: 0.4,
        pointerEvents: "none",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "480px", width: "100%", padding: "0 1.5rem" }}>

        {/* Accent rule */}
        <div style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, var(--color-accent), transparent)",
          marginBlockEnd: "3rem",
        }} />

        {/* 404 label */}
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.72rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--color-text-muted)",
          margin: "0 0 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}>
          <span style={{ color: "var(--color-accent)", opacity: 0.6 }}>[ 404 ]</span>
          Page not found
        </p>

        {/* Heading */}
        <h1 style={{
          fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 0.95,
          margin: "0 0 1.75rem",
        }}>
          <span style={{ color: "var(--color-accent)", display: "block" }}>Nothing</span>
          <span style={{ color: "var(--color-text-primary)", display: "block" }}>here.</span>
        </h1>

        {/* Copy */}
        <p style={{
          fontSize: "0.95rem",
          color: "var(--color-text-secondary)",
          lineHeight: 1.8,
          margin: "0 0 0.6rem",
        }}>
          This page does not exist. Unlike my Neovim config, this was not intentional.
        </p>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.72rem",
          color: "var(--color-text-muted)",
          margin: "0 0 2.5rem",
          fontStyle: "italic",
        }}>
          <span style={{ color: "var(--color-accent)" }}>$</span> — the config is also not intentional. it just happened.
        </p>

        {/* CTA */}
        <AnimatedLink
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            paddingInline: "1.5rem",
            paddingBlock: "0.8rem",
            backgroundColor: "var(--color-accent)",
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.85rem",
            borderRadius: "var(--radius-md)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.04em",
            textDecoration: "none",
          }}
        >
          ← Go home
        </AnimatedLink>

        {/* Bottom rule */}
        <div style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, var(--color-accent), transparent)",
          marginBlockStart: "3rem",
        }} />
      </div>
    </div>
  );
}
