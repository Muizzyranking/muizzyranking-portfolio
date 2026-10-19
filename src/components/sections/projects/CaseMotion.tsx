"use client";

import { m, useInView } from "framer-motion";
import { type CSSProperties, type ReactNode, useRef } from "react";
import { EASE, SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";

/** Fade-and-rise on mount. Children render on the server and are passed
 *  through as props, so async MDX stays out of the client bundle. */
export function CaseFade({
  delay = 0,
  y = 12,
  className,
  style,
  children,
}: {
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: EASE }}
      className={className}
      style={style}
    >
      {children}
    </m.div>
  );
}

/** Fade-and-rise once the element scrolls into view. */
export function CaseInView({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE }}
      className={className}
    >
      {children}
    </m.div>
  );
}

/** Stagger container for the challenge cards. */
export function CaseStagger({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <m.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={SCROLL_REVEAL} className={className}>
      {children}
    </m.div>
  );
}

/** One challenge card: staggered entry + hover lift on the client, with
 *  server-rendered children inside. */
export function CaseItem({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <m.div
      variants={staggerItem}
      whileHover={{ y: -2, borderColor: "var(--color-accent-dim)" }}
      transition={{ duration: 0.25, ease: EASE }}
      className={className}
    >
      {children}
    </m.div>
  );
}

/** Slide in from the right (sidebar mount). */
export function CaseSidebar({ children }: { children: ReactNode }) {
  return (
    <m.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6, ease: EASE }}>
      {children}
    </m.div>
  );
}

/** Draws the top hairline from the left on mount. */
export function CaseRule({ top, style, className }: { top: string; style?: CSSProperties; className?: string }) {
  return (
    <m.div
      aria-hidden="true"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 1.1, ease: EASE }}
      className={`absolute origin-left ${className ?? ""}`}
      style={{ top, height: 1, ...style }}
    />
  );
}
