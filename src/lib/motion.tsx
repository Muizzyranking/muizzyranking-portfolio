import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.09,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export const scaleUp = {
  rest: { scale: 1 },
  hover: { scale: 1.015, transition: { duration: 0.25, ease: "easeOut" } },
};

/** Card hover — subtle lift + accent-dim border (used in Selected work, Roadmap, Values). */
export const hoverLift: Variants = {
  rest: {
    y: 0,
    borderColor: "var(--color-border)",
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
  hover: {
    y: -2,
    borderColor: "var(--color-accent-dim)",
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Trace line under inline links — scaleX 0→1 from left on hover. */
export const traceUnderline: Variants = {
  rest: { scaleX: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  hover: { scaleX: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

/** Arrow chevron — nudges right on hover. Pair with the "→" character. */
export const arrowNudge: Variants = {
  rest: { x: 0, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
  hover: { x: 4, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
};

/** Blinking terminal cursor. */
export const cursorBlink = {
  animate: { opacity: [1, 0, 1] },
  transition: { repeat: Infinity, duration: 1, times: [0, 0.5, 0.5] },
} as const;

export const SCROLL_REVEAL = { once: true, margin: "-80px" } as const;
