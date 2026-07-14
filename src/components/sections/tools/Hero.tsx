"use client";

import { m } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export default function ToolsHero() {
  return (
    <section
      style={{
        position: "relative",
        paddingTop: "clamp(6rem, 14vw, 10rem)",
        paddingBottom: "clamp(3rem, 6vw, 5rem)",
        borderBottom: "1px solid var(--color-border-subtle)",
        overflow: "hidden",
      }}
    >
      {/* Top rule */}
      <m.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        style={{
          position: "absolute",
          top: "clamp(6rem, 14vw, 10rem)",
          left: "clamp(1.5rem, 5vw, 4rem)",
          right: "clamp(1.5rem, 5vw, 4rem)",
          height: "1px",
          background: "linear-gradient(to right, var(--color-accent), var(--color-border), transparent)",
          transformOrigin: "left",
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
          opacity: 0.35,
          pointerEvents: "none",
          maskImage: "radial-gradient(ellipse 80% 100% at 50% 0%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 100% at 50% 0%, black 30%, transparent 100%)",
        }}
      />

      <div className="container-main" style={{ position: "relative", zIndex: 2 }}>
        <m.p custom={0} initial="hidden" animate="visible" variants={fadeUp} className="eyebrow" style={{ marginBottom: "2.5rem" }}>
          <span className="eyebrow__mark">~/tools</span>
          <span className="eyebrow__rule" />
          daily driver
        </m.p>

        <m.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.6rem, 7vw, 5.25rem)",
            fontWeight: 600,
            letterSpacing: "-0.045em",
            lineHeight: 0.95,
            marginBottom: "1.75rem",
            maxWidth: "16ch",
          }}
        >
          What I <em style={{ fontStyle: "italic", color: "var(--color-accent)", fontWeight: 500 }}>reach for.</em>
        </m.h1>

        <m.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.65,
            maxWidth: "54ch",
            marginBottom: "2rem",
          }}
        >
          The languages, frameworks, and tools I&apos;d install on a fresh machine within the first hour. Not a buzzword list — what I actually use,
          ranked roughly by how often I touch it.
        </m.p>
      </div>
    </section>
  );
}
