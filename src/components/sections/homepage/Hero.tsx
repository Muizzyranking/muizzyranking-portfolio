"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fadeUp } from "@/lib/motion";
import "@/styles/homepage/hero.css";

const LINES = [
  "pushing to production.",
  "tests passed.",
  "deploy succeeded.",
  "anyway. welcome.",
];

export default function Hero() {
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

  return (
    <section className="hero-section">
      <div className="hero-grid-bg" />
      <m.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="hero-rule"
      />

      <div className="container-main hero-container">
        <div className="hero-content">
          <m.p custom={0} initial="hidden" animate="visible" variants={fadeUp} className="hero-role">
            <span className="hero-role-bracket"> Backend Engineer</span>
            <span className="hero-role-line" />
          </m.p>

          <m.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp} className="hero-title">
            <span className="hero-title-name">
              <span className="hero-title-accent">Muiz </span>Oyebowale
            </span>
          </m.h1>

          <m.div custom={2} initial="hidden" animate="visible" variants={fadeUp} className="hero-tagline">
            <p className="hero-subtitle">
              I build the parts nobody sees, and that's exactly how I like it. I&apos;ve got your back<span className="hero-subtitle-accent">(end)</span>.
            </p>
            <p className="hero-subtitle-aside">
              <span className="hero-subtitle-aside-marker">{"//"}</span>
              not all heroes wear capes. some just write clean commits.
            </p>
          </m.div>

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
      </div>

      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }} className="hero-scroll">
        <span className="hero-scroll-text">scroll</span>
        <m.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="hero-scroll-line" />
      </m.div>
    </section>
  );
}
