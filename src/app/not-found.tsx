import type { Metadata } from "next";
import AnimatedLink from "@/components/ui/AnimatedLink";

export const metadata: Metadata = {
  title: "404 — Not Found",
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="container-main"
        style={{ textAlign: "center", maxWidth: "480px" }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            marginBlockEnd: "1.5rem",
          }}
        >
          404
        </p>

        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            margin: 0,
            marginBlockEnd: "1rem",
          }}
        >
          Nothing here.
        </h1>

        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--color-text-secondary)",
            lineHeight: 1.8,
            margin: 0,
            marginBlockEnd: "0.5rem",
          }}
        >
          This page does not exist. Unlike my Neovim config, this was not
          intentional.
        </p>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: "var(--color-text-muted)",
            margin: 0,
            marginBlockEnd: "2.5rem",
            fontStyle: "italic",
          }}
        >
          (the config is also not intentional, it just happened)
        </p>

        <AnimatedLink
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            paddingInline: "1.5rem",
            paddingBlock: "0.75rem",
            backgroundColor: "var(--color-accent)",
            color: "var(--color-background)",
            fontWeight: 600,
            fontSize: "0.875rem",
            borderRadius: "var(--radius-md)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.04em",
          }}
        >
          ← Go home
        </AnimatedLink>
      </div>
    </div>
  );
}
