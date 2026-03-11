"use client";

import { m, type Variants } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const LINES = [
  "currently rewriting my Neovim config.",
  "it was fine.",
  "it is not fine.",
];

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      glowRef.current.style.background = `radial-gradient(700px circle at ${x}% ${y}%, color-mix(in srgb, var(--color-accent) 8%, transparent), transparent 65%)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (lineIndex >= LINES.length - 1) return;
    const t = setTimeout(
      () => setLineIndex((i) => i + 1),
      1800 + lineIndex * 600,
    );
    return () => clearTimeout(t);
  }, [lineIndex]);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "clamp(5rem, 12vw, 8rem)",
        paddingBottom: "clamp(5rem, 12vw, 8rem)",
        contentVisibility: "auto",
      }}
    >
      {/* Ambient mouse glow */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          transition: "background 0.12s ease",
          zIndex: 0,
        }}
      />

      {/* Grid — committed, not shy */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(var(--color-border-subtle) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          opacity: 0.55,
          pointerEvents: "none",
          zIndex: 0,
          maskImage:
            "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* Horizontal rule — architectural top anchor */}
      <m.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          position: "absolute",
          top: "clamp(5rem, 12vw, 8rem)",
          left: "clamp(1.5rem, 5vw, 4rem)",
          right: "clamp(1.5rem, 5vw, 4rem)",
          height: "1px",
          background: `linear-gradient(to right, var(--color-accent), var(--color-border), transparent)`,
          transformOrigin: "left",
          zIndex: 1,
        }}
      />

      <div
        className="container-main"
        style={{ position: "relative", zIndex: 2, width: "100%" }}
      >
        {/* Two-column schematic layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gridTemplateRows: "auto",
            gap: "0",
            alignItems: "start",
          }}
        >
          {/* LEFT — main content */}
          <div style={{ maxWidth: "820px" }}>
            {/* Eyebrow with bracket notation */}
            <m.p
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                margin: "0 0 1.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                flexWrap: "nowrap",
              }}
            >
              <span
                style={{
                  color: "var(--color-accent)",
                  opacity: 0.6,
                  whiteSpace: "nowrap",
                }}
              >
                [ 01 ]
              </span>
              Backend Engineer
              <span
                style={{
                  display: "inline-block",
                  width: "32px",
                  height: "1px",
                  background: "var(--color-border)",
                  verticalAlign: "middle",
                }}
              />
            </m.p>

            {/* Name — accent on first name, secondary on last */}
            <m.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              style={{
                fontSize: "clamp(3.2rem, 9vw, 7rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                margin: "0 0 2rem",
                fontFamily: "var(--font-display, inherit)",
              }}
            >
              <span style={{ color: "var(--color-accent)", display: "block" }}>
                Muiz
              </span>
              <span
                style={{ color: "var(--color-text-primary)", display: "block" }}
              >
                Oyebowale
              </span>
            </m.h1>

            {/* One-liner — bigger, bolder */}
            <m.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              style={{
                fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)",
                color: "var(--color-text-primary)",
                lineHeight: 1.55,
                maxWidth: "48ch",
                margin: "0 0 0.6rem",
                fontWeight: 500,
              }}
            >
              I build the parts of software nobody sees —
              <br />
              <span
                style={{
                  color: "var(--color-text-secondary)",
                  fontWeight: 400,
                }}
              >
                and I&apos;m fine with that.
              </span>
            </m.p>

            {/* Typewriter dry humor */}
            <m.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              style={{ margin: "0 0 3rem", minHeight: "1.4rem" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.76rem",
                  color: "var(--color-text-muted)",
                }}
              >
                <span
                  style={{
                    color: "var(--color-accent)",
                    marginRight: "0.5rem",
                  }}
                >
                  $
                </span>
                {LINES.slice(0, lineIndex + 1).join(" ")}
                <m.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    times: [0, 0.5, 0.5],
                  }}
                  style={{ marginLeft: "2px" }}
                >
                  ▋
                </m.span>
              </span>
            </m.div>

            {/* CTAs */}
            <m.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              style={{
                display: "flex",
                gap: "0.875rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Link
                href="/projects"
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
                  transition: "opacity 0.2s, transform 0.2s",
                  letterSpacing: "0.02em",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.88";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                View Projects
                <span style={{ opacity: 0.7 }}>→</span>
              </Link>

              <Link
                href="/about"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  paddingInline: "1.5rem",
                  paddingBlock: "0.8rem",
                  backgroundColor: "transparent",
                  color: "var(--color-text-secondary)",
                  fontWeight: 400,
                  fontSize: "0.85rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border)",
                  transition: "border-color 0.2s, color 0.2s, transform 0.2s",
                  letterSpacing: "0.02em",
                  textDecoration: "none",
                  fontFamily: "var(--font-mono)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-accent)";
                  e.currentTarget.style.color = "var(--color-text-primary)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.color = "var(--color-text-secondary)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                who&apos;s behind this →
              </Link>
            </m.div>
          </div>

          {/* RIGHT — vertical metadata column */}
          <m.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              paddingLeft: "3rem",
              alignSelf: "stretch",
              justifyContent: "center",
              minWidth: "140px",
            }}
          >
            {[
              { label: "Focus", value: "Backend" },
              { label: "Stack", value: "Py / TS" },
              { label: "Status", value: "Open" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--color-text-muted)",
                    margin: "0 0 0.25rem",
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.82rem",
                    color: "var(--color-text-secondary)",
                    margin: 0,
                  }}
                >
                  {value}
                </p>
              </div>
            ))}
          </m.div>
        </div>
      </div>

      {/* Scroll indicator — labeled */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
          }}
        >
          scroll
        </span>
        <m.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "40px",
            background:
              "linear-gradient(to bottom, var(--color-accent), transparent)",
          }}
        />
      </m.div>
    </section>
  );
}
