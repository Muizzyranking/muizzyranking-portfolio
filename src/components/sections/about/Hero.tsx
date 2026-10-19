"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { fadeUp } from "@/lib/motion";

const PARAGRAPHS = [
  {
    text: "It started with curiosity, like most things do. I wanted to know how things worked. Not the surface, but the mechanism underneath. I started with C, which isn't the friendliest place to begin, but it taught me the fundamentals properly. The questions never really stopped.",
  },
  {
    text: "Backend engineering felt like a natural home. I like the parts nobody sees: the performance work, the data modelling, the failure modes, the 3am alerts that teach you more about a system than a week of reading docs. If you did it right, nobody knows you were there.",
  },
  {
    text: "People who know me call me muizzy. You're welcome to too. Now I'm pointing the same obsession at AI and ML. The intersection of systems and intelligence is the most interesting problem space I've found, and I'm still early in it. I'm paying attention.",
    accent: true,
  },
];

export default function AboutHero() {
  return (
    <section
      style={{
        position: "relative",
        paddingTop: "clamp(6rem, 14vw, 10rem)",
        paddingBottom: "clamp(4rem, 8vw, 6rem)",
        borderBottom: "1px solid var(--color-border-subtle)",
        overflow: "hidden",
      }}
    >
      <div className="container-main text-center">
        <m.p custom={0} initial="hidden" animate="visible" variants={fadeUp} className="eyebrow" style={{ marginBottom: "2.5rem" }}>
          who am i
        </m.p>

        <m.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.8rem, 7vw, 5rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "var(--color-text-primary)",
            marginBottom: "2.5rem",
          }}
        >
          <span className="inline-block italic px-[0.12em] rounded-sm bg-accent text-background">Muiz</span> <span>Oyebowale</span>
        </m.h1>

        {/* Bio + avatar */}
        <div className="about-hero-grid">
          <div className="about-hero-bio">
            {PARAGRAPHS.map(({ text, accent }, idx) => (
              <m.p
                key={text.slice(0, 24)}
                custom={2 + idx}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                style={{
                  color: accent ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                  fontSize: accent ? "0.98rem" : "1.02rem",
                  lineHeight: 1.75,
                  fontWeight: accent ? 500 : 400,
                  padding: accent ? "1.1rem 1.4rem" : undefined,
                  background: accent ? "var(--color-accent-subtle)" : undefined,
                  borderLeft: accent ? "2px solid var(--color-accent-dim)" : undefined,
                  borderRadius: accent ? "0 var(--radius-sm) var(--radius-sm) 0" : undefined,
                  marginBottom: "1.25rem",
                }}
              >
                {text.trim()}
              </m.p>
            ))}
          </div>

          <m.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="about-avatar"
            style={{
              width: "100%",
              maxWidth: 320,
              aspectRatio: "1",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
              position: "relative",
              overflow: "hidden",
              margin: "0 auto",
            }}
          >
            <Image
              src="/muizzy.jpg"
              alt="Muiz Oyebowale"
              fill
              sizes="(max-width: 760px) 85vw, 320px"
              style={{ objectFit: "cover", objectPosition: "center center" }}
              quality={90}
            />

            {[
              { top: "10px", left: "10px", borderTop: "1px solid", borderLeft: "1px solid" },
              { top: "10px", right: "10px", borderTop: "1px solid", borderRight: "1px solid" },
              { bottom: "10px", left: "10px", borderBottom: "1px solid", borderLeft: "1px solid" },
              { bottom: "10px", right: "10px", borderBottom: "1px solid", borderRight: "1px solid" },
            ].map((s, _) => (
              <div
                key={JSON.stringify(s)}
                style={{
                  position: "absolute",
                  width: "16px",
                  height: "16px",
                  borderColor: "var(--color-accent-dim)",
                  ...s,
                }}
              />
            ))}

            <p
              style={{
                position: "absolute",
                bottom: "8px",
                left: 0,
                right: 0,
                textAlign: "center",
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-background)",
                opacity: 0.85,
                background: "var(--color-text-primary)",
                padding: "0.25rem 0",
              }}
            >
              muizzyranking
            </p>
          </m.div>
        </div>
      </div>

      <style>{`
        .about-hero-grid {
          display: grid;
          grid-template-areas: "bio photo";
          grid-template-columns: minmax(0, 1fr) 320px;
          column-gap: 3.5rem;
          row-gap: 2.5rem;
          align-items: start;
          max-width: 880px;
          margin: 0 auto;
          text-align: left;
        }
        .about-hero-bio {
          grid-area: bio;
        }
        .about-avatar {
          grid-area: photo;
        }
        @media (max-width: 760px) {
          .about-hero-grid {
            grid-template-areas: "photo" "bio";
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
