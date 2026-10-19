"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";

const VALUES = [
  {
    title: "I notice the small things",
    body: "The edge case mentioned in passing. The error nobody documented. The flow a user will never admit to following. Systems break in the small places first, so that's where I start looking.",
  },
  {
    title: "Careful where it counts",
    body: "Money that moves exactly once. Migrations that can be rolled back. Tests around the paths where failure isn't an option. If what I'm building has consequences, the care shows.",
  },
  {
    title: "Readable over clever",
    body: "The next person to read my code is often me, six months from now. Clear names, honest comments, solutions that stay boring under pressure — cleverness is a tool, not a default.",
  },
  {
    title: "Straight talk, handled with care",
    body: "If something doesn't add up, I'll say so — kindly, with reasons behind it. And on good evidence, I change my mind quickly. Disagreements surface problems sooner; nobody needs to defend a fudge for six months.",
  },
];

export default function HowIWork() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(4.5rem, 9vw, 7rem) 0",
        background: "var(--color-bg-elevated)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <div className="container-main">
        <m.p
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="eyebrow"
          style={{ marginBottom: "3rem" }}
        >
          How I work
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
            HOW
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
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 3.2vw, 2.25rem)",
                fontWeight: 600,
                letterSpacing: "-0.035em",
                lineHeight: 1.15,
                color: "var(--color-text-primary)",
                marginBottom: "1.25rem",
              }}
            >
              I understand the problem before writing a single line of code.
            </h2>

            <p style={{ fontSize: "0.95rem", color: "var(--color-text-secondary)", lineHeight: 1.8, marginBottom: "1rem" }}>
              I don&apos;t just write code — I build solutions, and the coding is simply the means to the end. That end is something that works, holds
              up and actually matches what was needed. So before anything gets built, I make sure the problem itself is understood: what we are
              solving, who it is for, and what it costs to get it wrong.
            </p>

            <p style={{ fontSize: "0.95rem", color: "var(--color-text-secondary)", lineHeight: 1.8, marginBottom: "1rem" }}>
              Most wasted effort I have seen did not come from hard problems — it came from solving the wrong one really well. Digging into the why
              first keeps the work honest: the requirements sharpen, the edge cases surface early, and the right implementation almost follows on its
              own.
            </p>

            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: "0.5rem" }}>
              {"// code is the means. the solution is the end."}
            </p>
          </div>
        </m.div>

        {/* ── Working style grid ── */}
        <m.div variants={fadeUp} custom={2} initial="hidden" animate={inView ? "visible" : "hidden"} style={{ marginBottom: "2rem" }}>
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
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "1px",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}
          className="how-i-work-grid"
        >
          {VALUES.map(({ title, body }, idx) => (
            <m.div
              key={title}
              variants={staggerItem}
              data-idx={idx}
              style={{
                background: "var(--color-background)",
                padding: "1.75rem",
                borderRight: "1px solid var(--color-border)",
                borderBottom: "1px solid var(--color-border)",
                transition: "background 0.2s",
              }}
              whileHover={{ backgroundColor: "var(--color-surface-raised)" } as never}
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

      <style>{`
        .how-i-work-grid > [data-idx="0"] { grid-column: span 7; }
        .how-i-work-grid > [data-idx="1"] { grid-column: span 5; }
        .how-i-work-grid > [data-idx="2"] { grid-column: span 5; }
        .how-i-work-grid > [data-idx="3"] { grid-column: span 7; }

        @media (max-width: 760px) {
          .how-i-work-grid > [data-idx] { grid-column: span 12 !important; }
        }
      `}</style>
    </section>
  );
}
