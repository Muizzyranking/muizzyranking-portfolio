"use client";

import { m, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { fadeUp, SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";

const DAD_JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "I told my computer I needed a break. Now it won't stop sending me Kit-Kat ads.",
  "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
  "Why did the developer go broke? Because he used up all his cache.",
  "I'm reading a book about anti-gravity. It's impossible to put down.",
];

export default function HumanSide() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const [joke, setJoke] = useState<string>("Hold on, while I think of a good one...");

  useEffect(() => {
    const randomJoke = DAD_JOKES[Math.floor(Math.random() * DAD_JOKES.length)];
    setJoke(randomJoke);
  }, []);

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
          <span style={{ color: "var(--color-accent)", opacity: 0.7 }}>[ ]</span>
          The human side
          <span
            style={{
              display: "inline-block",
              width: "32px",
              height: "1px",
              background: "var(--color-border)",
            }}
          />
        </m.p>

        <m.h2
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            marginBottom: "3rem",
          }}
        >
          Not just a résumé
        </m.h2>

        {/* Bento grid */}
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
        >
          <m.div
            variants={staggerItem}
            style={{
              gridColumn: "span 7",
              background: "var(--color-background)",
              padding: "2rem",
              borderRight: "1px solid var(--color-border)",
              borderBottom: "1px solid var(--color-border)",
            }}
            className="bento-wide"
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
                marginBottom: "0.75rem",
              }}
            >
              Watching
            </p>
            <p
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
                lineHeight: 1.35,
              }}
            >
              Marvel. DC. Animations. Sci-fi. Any superhero film that exists.
            </p>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--color-text-muted)",
                lineHeight: 1.7,
              }}
            >
              I watch everything — live action, animated, sequels that probably shouldn&apos;t exist. I have opinions about which Spider-Man was
              objectively the best. They are correct.
            </p>
            <div
              style={{
                marginTop: "1.25rem",
                display: "flex",
                gap: "0.4rem",
                flexWrap: "wrap",
              }}
            >
              {["MCU", "DCEU", "Into the Spider-Verse", "Arcane", "Invincible", "Studio Ghibli"].map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    color: "var(--color-text-muted)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-sm)",
                    padding: "0.22rem 0.55rem",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </m.div>

          <m.div
            variants={staggerItem}
            style={{
              gridColumn: "span 5",
              background: "var(--color-accent-subtle)",
              padding: "2rem",
              borderBottom: "1px solid var(--color-border)",
            }}
            className="bento-narrow"
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-accent-dim)",
                marginBottom: "0.75rem",
              }}
            >
              Editor of choice
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "2rem",
                fontWeight: 700,
                color: "var(--color-accent)",
                letterSpacing: "-0.04em",
                marginBottom: "0.5rem",
                lineHeight: 1,
              }}
            >
              Neovim
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                color: "var(--color-text-muted)",
                lineHeight: 1.65,
                marginBottom: "1rem",
              }}
            >
              Still. In 2026.
              <br />
              Config: I'm done this time, I promise.
              <br />
              Regrets: zero.
            </p>
            {/* Mini terminal block */}
            <div
              style={{
                background: "var(--color-background)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                padding: "0.6rem 0.8rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
              }}
            >
              <span style={{ color: "var(--color-accent)" }}>$</span>
              <span style={{ color: "var(--color-text-muted)" }}> nvim .</span>
              <br />
              <span style={{ color: "var(--color-text-muted)", opacity: 0.5 }}># home. sweet. home.</span>
            </div>
          </m.div>

          <m.div
            variants={staggerItem}
            style={{
              gridColumn: "span 5",
              background: "var(--color-background)",
              padding: "2rem",
              borderRight: "1px solid var(--color-border)",
            }}
            className="bento-narrow"
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
                marginBottom: "0.75rem",
              }}
            >
              Free sample
            </p>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
                fontStyle: "italic",
                marginBottom: "1rem",
              }}
            >
              &ldquo;{joke}&rdquo;
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                color: "var(--color-text-muted)",
              }}
            >
              {"// there are more where that came from."}
              <br />
              {"// you have been warned."}
            </p>
          </m.div>

          <m.div
            variants={staggerItem}
            style={{
              gridColumn: "span 7",
              background: "var(--color-background)",
              padding: "2rem",
            }}
            className="bento-wide"
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
                marginBottom: "0.75rem",
              }}
            >
              Good conversation topics
            </p>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
                marginBottom: "1.25rem",
              }}
            >
              I&apos;m bad at small talk. I&apos;m very good at the kind of conversation that starts with &ldquo;wait, but why does that work?&rdquo;
              and ends ninety minutes later with everyone slightly smarter.
            </p>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {[
                "Distributed systems",
                "History of computing",
                "How things fail",
                "Why anything works at all",
                "The philosophy of debugging",
                "Bad dad jokes",
              ].map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    color: "var(--color-text-muted)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-sm)",
                    padding: "0.22rem 0.55rem",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </m.div>
        </m.div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .bento-wide, .bento-narrow {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
}
