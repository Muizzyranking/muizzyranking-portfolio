"use client";

import { m, type Variants } from "framer-motion";
import Image from "next/image";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const STATS = [
  { label: "Role", value: "Backend Engineer" },
  { label: "Experience", value: "~4 years" },
  { label: "Primary lang", value: "Python / TS" },
  { label: "Availability", value: "Open" },
];

export default function AboutHero() {
  return (
    <section
      style={{
        position: "relative",
        paddingTop: "clamp(6rem, 14vw, 10rem)",
        paddingBottom: "clamp(4rem, 8vw, 6rem)",
        borderBottom: "1px solid var(--color-border-subtle)",
        overflow: "hidden",
      }}
    >
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
          zIndex: 1,
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
        {/* Page label */}
        <m.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "3rem",
          }}
        >
          <span style={{ color: "var(--color-accent)", opacity: 0.7 }}>~/about</span>
          <span
            style={{
              display: "inline-block",
              width: "32px",
              height: "1px",
              background: "var(--color-border)",
            }}
          />
          the full picture
        </m.p>

        {/* Two-column: text left, avatar right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "4rem",
            alignItems: "start",
          }}
          className="about-hero-grid"
        >
          {/* LEFT */}
          <div>
            {/* Name */}
            <m.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              style={{
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 0.93,
                marginBottom: "1.75rem",
              }}
            >
              <span style={{ color: "var(--color-accent)", display: "block" }}>Muiz</span>
              <span style={{ color: "var(--color-text-primary)", display: "block", fontStyle: "italic" }}>Oyebowale</span>
            </m.h1>

            {/* Opening line — personality first */}
            <m.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              style={{
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                color: "var(--color-text-secondary)",
                lineHeight: 1.65,
                maxWidth: "52ch",
                marginBottom: "2.5rem",
                fontWeight: 400,
              }}
            >
              Backend engineer. Reluctant perfectionist. Avid consumer of superhero films and bad dad jokes.{" "}
              <span style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>Currently teaching myself to teach machines.</span>
            </m.p>

            {/* Stat pills */}
            <m.div custom={3} initial="hidden" animate="visible" variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {STATS.map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-sm)",
                    overflow: "hidden",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                  }}
                >
                  <span
                    style={{
                      padding: "0.3rem 0.6rem",
                      background: "var(--color-surface)",
                      color: "var(--color-text-muted)",
                      letterSpacing: "0.08em",
                      borderRight: "1px solid var(--color-border)",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      padding: "0.3rem 0.7rem",
                      color: "var(--color-text-secondary)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </m.div>
          </div>

          {/* RIGHT — avatar */}
          <m.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="about-avatar"
            style={{
              width: "260px",
              aspectRatio: "1",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              position: "relative",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <Image src="/muizzy.jpeg" alt="Muiz Oyebowale" fill sizes="(max-width: 700px) 85vw, 260px" style={{ objectFit: "cover" }} quality={90} />

            {[
              { top: "10px", left: "10px", borderTop: "1px solid", borderLeft: "1px solid" },
              { top: "10px", right: "10px", borderTop: "1px solid", borderRight: "1px solid" },
              { bottom: "10px", left: "10px", borderBottom: "1px solid", borderLeft: "1px solid" },
              { bottom: "10px", right: "10px", borderBottom: "1px solid", borderRight: "1px solid" },
            ].map((s, _) => (
              <div
                key={JSON.stringify(s)}
                style={{
                  position: "absolute",
                  width: "16px",
                  height: "16px",
                  borderColor: "var(--color-accent-dim)",
                  ...s,
                }}
              />
            ))}

            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                opacity: 0.6,
              }}
            >
              muizzyranking
            </p>
          </m.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .about-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .about-avatar {
            width: 90% !important;
            max-width: 320px !important;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
