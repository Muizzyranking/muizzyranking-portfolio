"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { fadeUp } from "@/lib/motion";
import "@/styles/homepage/hero.css";

const LINES = ["currently rewriting my Neovim config.", "it was fine.", "it is not fine.", "anyway. welcome."];

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
      const pause = setTimeout(() => setLineIdx((l) => l + 1), 1500 + lineIdx * 350);
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
    <section className="hero-section">
      <div ref={glowRef} className="hero-glow" />
      <div className="hero-grid-bg" />
      <m.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="hero-rule"
      />

      <div className="container-main hero-container">
        <div className="hero-grid">
          {/* LEFT */}
          <div className="hero-content">
            <m.p custom={0} initial="hidden" animate="visible" variants={fadeUp} className="hero-role">
              <span className="hero-role-bracket">[ ]</span>
              Backend Engineer
              <span className="hero-role-line" />
            </m.p>

            <m.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp} className="hero-title">
              <span className="hero-title-accent">Muiz</span>
              <span className="hero-title-name">Oyebowale</span>
            </m.h1>

            <m.p custom={2} initial="hidden" animate="visible" variants={fadeUp} className="hero-subtitle">
              I build the systems that hold everything together —
              <br />
              <span className="hero-subtitle-muted">now teaching them to think.</span>
            </m.p>

            <m.div custom={3} initial="hidden" animate="visible" variants={fadeUp} className="hero-terminal">
              <span className="hero-terminal-inner">
                <span className="hero-terminal-prompt">$</span>
                {displayed}
                <m.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 0.5] }}
                  className="hero-terminal-cursor"
                >
                  ▋
                </m.span>
              </span>
            </m.div>

            <m.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="hero-ctas">
              <Link href="/projects" className="hero-btn-primary">
                View Projects →
              </Link>
              <Link href="/about" className="hero-btn-secondary">
                who&apos;s behind this →
              </Link>
            </m.div>
          </div>

          {/* RIGHT — meta */}
          <m.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="hero-meta"
          >
            {META.map(({ label, value, pulse }) => (
              <div key={label}>
                <p className="hero-meta-item-label">{label}</p>
                <p className="hero-meta-item-value">
                  {pulse && (
                    <m.span
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="hero-meta-pulse"
                    />
                  )}
                  {value}
                </p>
              </div>
            ))}
          </m.div>
        </div>
      </div>

      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }} className="hero-scroll">
        <span className="hero-scroll-text">scroll</span>
        <m.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="hero-scroll-line" />
      </m.div>
    </section>
  );
}
