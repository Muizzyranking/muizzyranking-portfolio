"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import {
  fadeUp,
  SCROLL_REVEAL,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";

export default function Origin() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(4.5rem, 9vw, 7rem) 0",
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
          Origin
          <span
            style={{
              display: "inline-block",
              width: "32px",
              height: "1px",
              background: "var(--color-border)",
            }}
          />
        </m.p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "5rem",
            alignItems: "start",
          }}
          className="origin-grid"
        >
          {/* LEFT — large pull quote */}
          <m.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <blockquote
              style={{
                borderLeft: "2px solid var(--color-accent)",
                paddingLeft: "1.5rem",
                margin: 0,
              }}
            >
              <p
                style={{
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.25,
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                  fontStyle: "italic",
                }}
              >
                &ldquo;I didn&apos;t pick engineering. Engineering picked me —
                and then I had a lot of questions about why.&rdquo;
              </p>
              <cite
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: "var(--color-text-muted)",
                  letterSpacing: "0.08em",
                  fontStyle: "normal",
                }}
              >
                — me, being dramatic about it
              </cite>
            </blockquote>

            {/* Year marker */}
            <m.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{ marginTop: "3rem" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  marginBottom: "0.4rem",
                }}
              >
                Started writing code
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "var(--color-accent)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                ~2021
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: "var(--color-text-muted)",
                  marginTop: "0.25rem",
                }}
              >
                {/* Auto-calculated — nice touch */}
                {new Date().getFullYear() - 2021}+ years of breaking and fixing
                things
              </p>
            </m.div>
          </m.div>

          {/* RIGHT — prose blocks */}
          <m.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {[
              {
                text: `It started with curiosity, the way most things do. I wanted to understand
                  how things worked — not the surface of it, but the actual mechanism
                  underneath. What was the computer actually doing? Why did this line of code
                  produce that result? The questions didn't stop, and at some point I realised
                  I was an engineer.`,
              },
              {
                text: `I started with C. It wasn’t the most forgiving place to begin,
                 but it taught me the fundamentals properly — and made picking up new
                 languages feel a lot less intimidating.`,
              },
              
              {
                text: `Backend engineering felt like a natural home. I like the parts nobody sees.
                  The performance work, the data modelling, the failure modes, the 3am alerts
                  that teach you more about a system than a week of reading docs. I like that
                  it's mostly invisible — if you did it right, nobody knows you were there.`,
              },
              {
                text: `Now I'm pointing that same obsession at AI and ML. Not because it's a trend.
                  Because I started pulling the thread and couldn't stop. The intersection of
                  systems engineering and intelligence is the most interesting problem space
                  I've encountered. I'm still early. I'm paying attention.`,
                accent: true,
              },
            ].map(({ text, accent }, _) => (
              <m.p
                key={text.slice(0, 30)}
                variants={staggerItem}
                style={{
                  color: accent
                    ? "var(--color-text-primary)"
                    : "var(--color-text-secondary)",
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                  fontWeight: accent ? 500 : 400,
                  padding: accent ? "1rem 1.25rem" : undefined,
                  background: accent ? "var(--color-accent-subtle)" : undefined,
                  borderLeft: accent
                    ? "2px solid var(--color-accent-dim)"
                    : undefined,
                  borderRadius: accent
                    ? "0 var(--radius-sm) var(--radius-sm) 0"
                    : undefined,
                }}
              >
                {text.trim()}
              </m.p>
            ))}
          </m.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .origin-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
