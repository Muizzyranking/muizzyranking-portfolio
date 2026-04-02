"use client";

import { m, type Variants } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const LINES = [
  "currently rewriting my Neovim config.",
  "it was fine.",
  "it is not fine.",
  "anyway. welcome.",
];

const META = [
  { label: "Status", value: "Open to work", pulse: true },
  { label: "Pivoting", value: "Backend → AI/ML" },
  { label: "Editor", value: "Neovim. Always." },
  { label: "Dad jokes", value: "∞ remaining" },
];

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);

  const [displayed, setDisplayed] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  const target = LINES.slice(0, lineIdx + 1).join(" ");

  useEffect(() => {
    if (done) return;
    if (charIdx < target.length) {
      const timeout = setTimeout(
        () => {
          setDisplayed(target.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        },
        charIdx < LINES[0].length ? 45 : 38,
      );
      return () => clearTimeout(timeout);
    }
    if (lineIdx < LINES.length - 1) {
      const pause = setTimeout(() => {
        setLineIdx((l) => l + 1);
      }, 1500 + lineIdx * 350);
      return () => clearTimeout(pause);
    }
    setDone(true);
  }, [charIdx, lineIdx, target, done]);

  useEffect(() => {
    const hero = glowRef.current?.parentElement;
    if (!hero) return;
    const handleMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      glowRef.current.style.background = `radial-gradient(700px circle at ${x}% ${y}%, color-mix(in srgb, var(--color-accent) 9%, transparent), transparent 65%)`;
    };
    hero.addEventListener("mousemove", handleMove);
    return () => hero.removeEventListener("mousemove", handleMove);
  }, []);

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
      }}
    >
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          transition: "background 0.15s ease",
          zIndex: 0,
        }}
      />

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
          maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* top rule — slides in from left */}
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
          background: "linear-gradient(to right, var(--color-accent), var(--color-border), transparent)",
          transformOrigin: "left",
          zIndex: 1,
        }}
      />

      <div
        className="container-main"
        style={{ position: "relative", zIndex: 2, width: "100%" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 0,
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* ── LEFT — main content */}
          <div style={{ maxWidth: "820px" }}>
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
              }}
            >
              <span style={{ color: "var(--color-accent)", opacity: 0.7 }}>[  ]</span>
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

            <m.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              style={{
                fontSize: "clamp(3.2rem, 9vw, 7rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 0.93,
                margin: "0 0 2rem",
              }}
            >
              <span style={{ color: "var(--color-accent)", display: "block" }}>
                Muiz
              </span>
              <span
                style={{
                  color: "var(--color-text-primary)",
                  display: "block",
                  fontStyle: "italic",
                }}
              >
                Oyebowale
              </span>
            </m.h1>
            <m.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              style={{
                fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)",
                color: "var(--color-text-primary)",
                lineHeight: 1.55,
                maxWidth: "48ch",
                margin: "0 0 0.5rem",
                fontWeight: 500,
              }}
            >
              I build the systems that hold everything together —
              <br />
              <span style={{ color: "var(--color-text-secondary)", fontWeight: 400 }}>
                now teaching them to think.
              </span>
            </m.p>

            <m.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              style={{ margin: "0 0 3rem", minHeight: "1.6rem" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.76rem",
                  color: "var(--color-text-muted)",
                }}
              >
                <span style={{ color: "var(--color-accent)", marginRight: "0.5rem" }}>$</span>
                {displayed}
                <m.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 0.5] }}
                  style={{ marginLeft: "2px", display: "inline-block" }}
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
              style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", alignItems: "center" }}
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
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition: "opacity 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.85";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                View Projects →
              </Link>

              <Link
                href="/about"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  paddingInline: "1.5rem",
                  paddingBlock: "0.8rem",
                  background: "transparent",
                  color: "var(--color-text-secondary)",
                  fontSize: "0.85rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border)",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  fontFamily: "var(--font-mono)",
                  transition: "border-color 0.2s, color 0.2s, transform 0.2s",
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

          <m.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              paddingLeft: "3.5rem",
              alignSelf: "stretch",
              justifyContent: "center",
              minWidth: "155px",
            }}
            className="hero-meta"
          >
            {META.map(({ label, value, pulse }) => (
              <div key={label}>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
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
                    fontSize: "0.78rem",
                    color: "var(--color-text-secondary)",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  {pulse && (
                    <m.span
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      style={{
                        display: "inline-block",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "var(--color-accent)",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  {value}
                </p>
              </div>
            ))}
          </m.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
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
            fontSize: "0.6rem",
            letterSpacing: "0.22em",
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
            background: "linear-gradient(to bottom, var(--color-accent), transparent)",
          }}
        />
      </m.div>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-meta {
            flex-direction: row !important;
            flex-wrap: wrap;
            padding-left: 0 !important;
            padding-top: 2.5rem;
            gap: 1.75rem !important;
            align-self: auto !important;
            justify-content: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}
