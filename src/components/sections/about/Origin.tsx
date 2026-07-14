"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";

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
          className="eyebrow"
          style={{ marginBottom: "3rem" }}
        >
          Origin
          <span className="eyebrow__rule" />
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
          <m.div variants={fadeUp} custom={1} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <blockquote
              style={{
                borderLeft: "2px solid var(--color-accent)",
                paddingLeft: "1.5rem",
                margin: 0,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.2,
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                  fontStyle: "italic",
                }}
              >
                &ldquo;I didn&apos;t pick engineering. Engineering picked me — and then I had a lot of questions about why.&rdquo;
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
                text: `It started with curiosity, the way most things do. I wanted to understand how things worked — not the surface, but the actual mechanism underneath. I started with C, which wasn't the most forgiving place to begin, but it taught me the fundamentals properly. The questions never really stopped.`,
              },
              {
                text: `Backend engineering felt like a natural home. I like the parts nobody sees — the performance work, the data modelling, the failure modes, the 3am alerts that teach you more about a system than a week of reading docs. If you did it right, nobody knows you were there.`,
              },
              {
                text: `Now I'm pointing the same obsession at AI and ML. Not because it's a trend — because I started pulling the thread and couldn't stop. The intersection of systems engineering and intelligence is the most interesting problem space I've encountered. I'm still early. I'm paying attention.`,
                accent: true,
              },
            ].map(({ text, accent }) => (
              <m.p
                key={text.slice(0, 30)}
                variants={staggerItem}
                style={{
                  color: accent ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                  fontWeight: accent ? 500 : 400,
                  padding: accent ? "1rem 1.25rem" : undefined,
                  background: accent ? "var(--color-accent-subtle)" : undefined,
                  borderLeft: accent ? "2px solid var(--color-accent-dim)" : undefined,
                  borderRadius: accent ? "0 var(--radius-sm) var(--radius-sm) 0" : undefined,
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
