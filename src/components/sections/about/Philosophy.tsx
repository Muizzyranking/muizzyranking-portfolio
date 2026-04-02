"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import {
  fadeUp,
  SCROLL_REVEAL,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";

const VALUES = [
  {
    title: "I listen — actually",
    body: "Not the kind of listening where you're composing your reply. The kind where you catch the thing behind the thing they said. Details most people scroll past.",
  },
  {
    title: "Slow to start, thorough to finish",
    body: "I ask questions that feel annoying in the moment and save time in the long run. You want this person on your team before the architecture is decided, not after.",
  },
  {
    title: "I write code for the next person",
    body: "That person is often me, six months later. So: clear naming, honest comments, no clever tricks that only make sense at 2am.",
  },
  {
    title: "Disagreement is a feature",
    body: "I'll push back if something doesn't make sense. Respectfully. Persistently. I'll also change my mind the moment I see a better argument — ego doesn't survive good evidence.",
  },
  {
    title: "Perfectionist, managed",
    body: "I want everything to be right. I've learned to ship anyway. The tension between those two things produces most of my best work.",
  },
  {
    title: "Terminal-first, everything-else-second",
    body: "If a tool doesn't have a CLI, I'm suspicious of it. If it does, I've probably already aliased it to three letters.",
  },
];

export default function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(4.5rem, 9vw, 7rem) 0",
        background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <div className="container-main">
        {/* Eyebrow */}
        <m.p
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
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
          <span style={{ color: "var(--color-accent)", opacity: 0.7 }}>
            [ ]
          </span>
          How I think
          <span
            style={{
              display: "inline-block",
              width: "32px",
              height: "1px",
              background: "var(--color-border)",
            }}
          />
        </m.p>

        <m.div
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            marginBottom: "4rem",
            padding: "2.5rem 3rem",
            background: "var(--color-background)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              right: "2rem",
              top: "50%",
              transform: "translateY(-50%)",
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(5rem, 12vw, 9rem)",
              fontWeight: 700,
              color: "var(--color-accent)",
              opacity: 0.04,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            WHY
          </div>

          <div style={{ position: "relative", maxWidth: "72ch" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
                marginBottom: "1.25rem",
              }}
            >
              Core operating principle
            </p>

            <h2
              style={{
                fontSize: "clamp(1.6rem, 3.2vw, 2.25rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                color: "var(--color-text-primary)",
                marginBottom: "1.25rem",
              }}
            >
              I ask why until it makes sense.
            </h2>

            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.8,
                marginBottom: "1rem",
              }}
            >
              Not because I&apos;m difficult. Because I genuinely cannot move
              forward until I understand the thing underneath the thing. The
              root cause. The actual reason a decision was made. The constraint
              that nobody documented but everyone assumed.
            </p>

            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.8,
                marginBottom: "1rem",
              }}
            >
              It makes me slower sometimes. It makes the work better, always.
              And once in a while, the why reveals that we&apos;re solving the
              wrong problem entirely — which is the most valuable discovery you
              can make before you&apos;ve written any code.
            </p>

            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: "var(--color-text-muted)",
                marginTop: "0.5rem",
              }}
            >
              {"// apologies in advance to my future Product Managers."}
            </p>
          </div>
        </m.div>

        {/* ── VALUES GRID */}
        <m.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ marginBottom: "2rem" }}
        >
          <h3
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--color-text-primary)",
              marginBottom: "1.5rem",
            }}
          >
            Working style
          </h3>
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1px",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}
        >
          {VALUES.map(({ title, body }) => (
            <m.div
              key={title}
              variants={staggerItem}
              style={{
                background: "var(--color-background)",
                padding: "1.75rem",
                borderRight: "1px solid var(--color-border)",
                borderBottom: "1px solid var(--color-border)",
                transition: "background 0.2s",
              }}
              whileHover={
                { backgroundColor: "var(--color-surface-raised)" } as never
              }
            >
              <div
                style={{
                  width: "20px",
                  height: "2px",
                  background: "var(--color-accent)",
                  marginBottom: "1rem",
                  borderRadius: "1px",
                }}
              />
              <p
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                  marginBottom: "0.6rem",
                  lineHeight: 1.35,
                }}
              >
                {title}
              </p>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.7,
                }}
              >
                {body}
              </p>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
