"use client";

import { m, useReducedMotion, useScroll } from "framer-motion";

export default function ReadingProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  if (reduce) return null;

  return (
    <m.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        zIndex: 80,
        backgroundColor: "var(--color-accent)",
        transformOrigin: "0%",
        scaleX: scrollYProgress,
      }}
    />
  );
}
