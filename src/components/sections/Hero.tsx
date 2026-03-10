"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth) * 100;
      const y = (clientY / innerHeight) * 100;
      glowRef.current.style.background = `radial-gradient(600px circle at ${x}% ${y}%, color-mix(in srgb, var(--color-accent) 6%, transparent), transparent 70%)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
      {/* Ambient glow that follows mouse */}
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

      {/* Subtle grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(var(--color-border-subtle) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          opacity: 0.3,
          pointerEvents: "none",
          zIndex: 0,
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      <div
        className="container-main"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div style={{ maxWidth: "780px" }}>
          {/* Eyebrow */}
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              marginBottom: "1.5rem",
              margin: 0,
              marginBlockEnd: "1.5rem",
            }}
          >
            Backend Engineer
          </motion.p>

          {/* Name */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginBlock: 0,
              marginBlockEnd: "1.5rem",
            }}
          >
            Muiz{" "}
            <span style={{ color: "var(--color-text-secondary)" }}>
              Oyebowale
            </span>
          </motion.h1>

          {/* One-liner */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
              maxWidth: "52ch",
              marginBlock: 0,
              marginBlockEnd: "0.75rem",
            }}
          >
            I build the parts of software nobody sees —
            <br />
            <span style={{ color: "var(--color-text-primary)" }}>
              and I&apos;m fine with that.
            </span>
          </motion.p>

          {/* Dry humor sub-line */}
          <motion.p
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              color: "var(--color-text-muted)",
              marginBlock: 0,
              marginBlockEnd: "3rem",
            }}
          >
            {/* the ones who get it, get it */}
            currently rewriting my Neovim config. it was fine.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
          >
            <Link
              href="/projects"
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
                transition: "opacity 0.2s ease, transform 0.2s ease",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.85";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              View Projects
            </Link>

            <Link
              href="/about"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                paddingInline: "1.5rem",
                paddingBlock: "0.75rem",
                backgroundColor: "transparent",
                color: "var(--color-text-primary)",
                fontWeight: 500,
                fontSize: "0.875rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
                transition: "border-color 0.2s ease, transform 0.2s ease",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              About Me
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
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
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "48px",
            background:
              "linear-gradient(to bottom, var(--color-accent), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
