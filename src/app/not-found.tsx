"use client";

// app/not-found.tsx
// Personality 404 — terminal-style, dry humor, consistent with the rest of the site.
// Uses Next.js not-found convention (file must be named not-found.tsx at app root).

import { m } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const LINES = [
  { text: "$ cd /this-page", delay: 0 },
  { text: "bash: cd: /this-page: No such file or directory", delay: 600, error: true },
  { text: "$ ls -la", delay: 1200 },
  { text: "total 0", delay: 1800, muted: true },
  { text: "$ find . -name 'what-you-were-looking-for'", delay: 2400 },
  { text: "find: nothing. not here. not anywhere.", delay: 3200, error: true },
  { text: "$ echo $?", delay: 4000 },
  { text: "404", delay: 4600, accent: true },
  { text: "$ _", delay: 5200, cursor: true },
];

const SUGGESTIONS = [
  { label: "go home", href: "/" },
  { label: "see projects", href: "/projects" },
  { label: "read about me", href: "/about" },
  { label: "see writing", href: "/blog" },
];

export default function NotFound() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    LINES.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay);
    });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(var(--color-border-subtle) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          opacity: 0.4,
          pointerEvents: "none",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* Giant 404 bg number */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(12rem, 30vw, 24rem)",
          fontWeight: 700,
          color: "var(--color-accent)",
          opacity: 0.03,
          letterSpacing: "-0.06em",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          whiteSpace: "nowrap",
        }}
      >
        404
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "640px",
        }}
      >
        {/* Terminal window */}
        <m.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            marginBottom: "2rem",
          }}
        >
          {/* Window chrome */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1rem",
              borderBottom: "1px solid var(--color-border)",
              background: "var(--color-surface-raised)",
            }}
          >
            {["#ff5f57", "#ffbd2e", "#28c940"].map((color) => (
              <div
                key={color}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: color,
                  opacity: 0.7,
                }}
              />
            ))}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--color-text-muted)",
                marginLeft: "0.5rem",
                letterSpacing: "0.08em",
              }}
            >
              muiz@portfolio: ~/not-found
            </span>
          </div>

          {/* Terminal body */}
          <div
            style={{
              padding: "1.25rem 1.25rem 1.5rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              lineHeight: 2,
              minHeight: "240px",
            }}
          >
            {LINES.slice(0, visibleLines).map((line, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0",
                  color: line.error
                    ? "var(--color-error)"
                    : line.accent
                    ? "var(--color-accent)"
                    : line.muted
                    ? "var(--color-text-muted)"
                    : "var(--color-text-secondary)",
                }}
              >
                {line.cursor ? (
                  <>
                    <span style={{ color: "var(--color-accent)", marginRight: "0.5rem" }}>$</span>
                    <m.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        times: [0, 0.5, 0.5],
                      }}
                      style={{
                        display: "inline-block",
                        width: "7px",
                        height: "14px",
                        background: "var(--color-text-muted)",
                        verticalAlign: "text-bottom",
                      }}
                    />
                  </>
                ) : (
                  <span>{line.text}</span>
                )}
              </m.div>
            ))}
          </div>
        </m.div>

        {/* Heading */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "2rem", textAlign: "center" }}
        >
          <h1
            style={{
              fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "var(--color-text-primary)",
              marginBottom: "0.5rem",
            }}
          >
            Nothing here.{" "}
            <span
              style={{ color: "var(--color-accent)", fontStyle: "italic" }}
            >
              Genuinely.
            </span>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.6,
            }}
          >
            // the page you&apos;re looking for doesn&apos;t exist.
            <br />
            // it might never have. or it moved. probably moved.
          </p>
        </m.div>

        {/* Navigation suggestions */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.5rem",
          }}
        >
          {SUGGESTIONS.map(({ label, href }, i) => (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0.75rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                color:
                  i === 0
                    ? "#fff"
                    : "var(--color-text-secondary)",
                background:
                  i === 0
                    ? "var(--color-accent)"
                    : "transparent",
                border: i === 0
                  ? "none"
                  : "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                textDecoration: "none",
                transition: "opacity 0.15s, border-color 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                if (i === 0) {
                  el.style.opacity = "0.85";
                } else {
                  el.style.borderColor = "var(--color-accent-dim)";
                  el.style.color = "var(--color-text-primary)";
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                if (i === 0) {
                  el.style.opacity = "1";
                } else {
                  el.style.borderColor = "var(--color-border)";
                  el.style.color = "var(--color-text-secondary)";
                }
              }}
            >
              {label}
            </Link>
          ))}
        </m.div>
      </div>
    </div>
  );
}
