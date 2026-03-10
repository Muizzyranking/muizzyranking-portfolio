"use client";

import { motion } from "framer-motion";
import type { Experience } from "@/lib/experience";

function Section({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutMe({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <div
      style={{
        paddingBlockStart: "clamp(6rem, 14vw, 10rem)",
        paddingBlockEnd: "8rem",
      }}
    >
      <div className="container-main">
        {/* ── Opening ── */}
        <Section>
          <div
            style={{
              marginBlockEnd: "8rem",
              paddingBlockEnd: "5rem",
              borderBottom: "1px solid var(--color-border-subtle)",
            }}
          >
            <p className="mono-label" style={{ marginBlockEnd: "1.5rem" }}>
              About
            </p>

            <h1
              style={{
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                margin: 0,
                marginBlockEnd: "2rem",
              }}
            >
              I build the parts
              <br />
              <span style={{ color: "var(--color-text-secondary)" }}>
                nobody sees.
              </span>
            </h1>

            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.85,
                margin: 0,
                maxWidth: "52ch",
              }}
            >
              Backend engineer based in Lagos. I care about systems that handle
              real users, real money, and real failure modes — the kind of work
              that has to be correct, not just functional.
            </p>
          </div>
        </Section>

        {/* ── How I think ── */}
        <Section>
          <div style={{ marginBlockEnd: "8rem" }}>
            <p className="mono-label" style={{ marginBlockEnd: "1.5rem" }}>
              How I think
            </p>

            <div className="about-two-col">
              <div>
                <h2
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    margin: 0,
                    marginBlockEnd: "1.5rem",
                    lineHeight: 1.2,
                  }}
                >
                  I ask why until
                  <br />
                  it makes sense.
                </h2>

                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.9,
                    margin: 0,
                    marginBlockEnd: "1.25rem",
                  }}
                >
                  Not because I am difficult — because I genuinely cannot move
                  forward until I understand the thing underneath the thing. It
                  makes me slower sometimes. It makes the work better always.
                </p>

                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.9,
                    margin: 0,
                  }}
                >
                  I am a good listener. The kind that actually pays attention,
                  not the kind that is waiting for their turn to talk. I notice
                  details most people skip. I am also very bad at small talk,
                  but I will happily go deep on distributed systems, history, or
                  why the sky is actually not blue.{" "}
                  <span
                    style={{
                      color: "var(--color-text-muted)",
                      fontStyle: "italic",
                    }}
                  >
                    (It is. I just wanted to see if you were paying attention.)
                  </span>
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {[
                  {
                    label: "Naturally curious",
                    sub: "about everything, annoyingly",
                  },
                  {
                    label: "Detail oriented",
                    sub: "the diff is always in the details",
                  },
                  {
                    label: "Quietly observant",
                    sub: "I noticed. I just didn't say anything.",
                  },
                  {
                    label: "Overconfident",
                    sub: "usually justified, occasionally not",
                  },
                  { label: "Dad joke enthusiast", sub: "you have been warned" },
                ].map((trait) => (
                  <div
                    key={trait.label}
                    style={{
                      padding: "1rem 1.25rem",
                      backgroundColor: "var(--color-surface)",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--color-border-subtle)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {trait.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        color: "var(--color-text-muted)",
                        letterSpacing: "0.04em",
                        textAlign: "right",
                        fontStyle: "italic",
                      }}
                    >
                      {trait.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── The craft ── */}
        <Section>
          <div
            style={{
              marginBlockEnd: "8rem",
              paddingBlockEnd: "5rem",
              borderBottom: "1px solid var(--color-border-subtle)",
            }}
          >
            <p className="mono-label" style={{ marginBlockEnd: "1.5rem" }}>
              The craft
            </p>

            <div className="about-two-col">
              <div>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.9,
                    margin: 0,
                    marginBlockEnd: "1.25rem",
                  }}
                >
                  I gravitate toward backend work because I like things that are
                  correct, not just things that look correct. APIs, background
                  workers, authentication systems, database schemas — the parts
                  that have to hold up under pressure, edge cases, and users
                  doing exactly what you told them not to do.
                </p>

                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.9,
                    margin: 0,
                    marginBlockEnd: "1.25rem",
                  }}
                >
                  I have built CLI tools that only I use, written configurations
                  that took longer to tune than the projects they configured,
                  and spent entire evenings making something work correctly even
                  though nobody would ever know it was wrong. That is just how
                  the brain is wired.
                </p>

                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.9,
                    margin: 0,
                  }}
                >
                  I still use Neovim. Not as a statement — I just genuinely have
                  not found a reason to stop. The config is never finished. I am
                  okay with that.
                </p>
              </div>

              <div
                style={{
                  padding: "1.5rem",
                  backgroundColor: "var(--color-surface)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--color-border-subtle)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "1.5rem",
                    right: "1.5rem",
                    height: "1px",
                    background:
                      "linear-gradient(to right, var(--color-accent), transparent)",
                  }}
                />

                <p className="mono-label" style={{ marginBlockEnd: "1.25rem" }}>
                  Things I enjoy building
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                  }}
                >
                  {[
                    "API systems with real security requirements",
                    "Background job pipelines",
                    "CLI tools and developer tooling",
                    "Database schemas that age well",
                    "Configurations dialed in just right",
                    "Systems that fail gracefully",
                  ].map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1rem 1fr",
                        gap: "0.75rem",
                        fontSize: "0.875rem",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        style={{
                          color: "var(--color-accent)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.7rem",
                          paddingTop: "0.15rem",
                        }}
                      >
                        ↳
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Experience timeline ── */}
        <Section>
          <div style={{ marginBlockEnd: "8rem" }}>
            <p className="mono-label" style={{ marginBlockEnd: "2.5rem" }}>
              Experience
            </p>

            <div style={{ position: "relative" }}>
              {/* Vertical line */}
              <div
                style={{
                  position: "absolute",
                  left: "7rem",
                  top: 0,
                  bottom: 0,
                  width: "1px",
                  backgroundColor: "var(--color-border-subtle)",
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "3rem",
                }}
              >
                {experiences.map((exp, i) => (
                  <motion.div
                    key={exp.company}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      delay: i * 0.1,
                      duration: 0.5,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "7rem 1fr",
                      gap: "2.5rem",
                      alignItems: "start",
                      position: "relative",
                    }}
                  >
                    {/* Period */}
                    <div style={{ textAlign: "right", paddingRight: "2rem" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          color: "var(--color-accent)",
                          letterSpacing: "0.06em",
                          lineHeight: 1.6,
                          display: "block",
                        }}
                      >
                        {exp.period.start}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          color: "var(--color-text-muted)",
                          letterSpacing: "0.06em",
                          display: "block",
                        }}
                      >
                        {exp.period.end}
                      </span>
                    </div>

                    {/* Dot on the line */}
                    <div
                      style={{
                        position: "absolute",
                        left: "calc(7rem - 3px)",
                        top: "0.35rem",
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        backgroundColor: "var(--color-accent)",
                        border: "2px solid var(--color-background)",
                      }}
                    />

                    {/* Content */}
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          flexWrap: "wrap",
                          marginBlockEnd: "0.3rem",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.975rem",
                            fontWeight: 600,
                            color: "var(--color-text-primary)",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {exp.company}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.6rem",
                            color: "var(--color-text-muted)",
                            backgroundColor: "var(--color-surface)",
                            padding: "0.15rem 0.5rem",
                            borderRadius: "var(--radius-sm)",
                            border: "1px solid var(--color-border-subtle)",
                          }}
                        >
                          {exp.type}
                        </span>
                      </div>

                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.75rem",
                          color: "var(--color-text-muted)",
                          display: "block",
                          marginBlockEnd: "0.5rem",
                        }}
                      >
                        {exp.role}
                      </span>

                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--color-text-secondary)",
                          lineHeight: 1.75,
                          margin: 0,
                        }}
                      >
                        {exp.summary}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── Where I'm going ── */}
        <Section>
          <div
            style={{
              marginBlockEnd: "8rem",
              paddingBlockEnd: "5rem",
              borderBottom: "1px solid var(--color-border-subtle)",
            }}
          >
            <p className="mono-label" style={{ marginBlockEnd: "1.5rem" }}>
              Where I'm going
            </p>

            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                margin: 0,
                marginBlockEnd: "1.5rem",
                lineHeight: 1.2,
              }}
            >
              The interesting problems
              <br />
              <span style={{ color: "var(--color-text-secondary)" }}>
                are in AI and finance.
              </span>
            </h2>

            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.9,
                margin: 0,
                marginBlockEnd: "1.25rem",
              }}
            >
              I have always been drawn to systems where correctness is not
              optional — financial systems, data pipelines, infrastructure that
              other infrastructure depends on. The intersection of AI and
              backend engineering is where I am pointing my learning right now.
              Statistics has always been a quiet interest. It is becoming a
              louder one.
            </p>

            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.9,
                margin: 0,
              }}
            >
              There is also something larger I think about — Africa building its
              own software, its own AI, its own technical infrastructure. Not as
              a trend to observe. As a direction to contribute to. That ambition
              shapes the kind of engineer I am trying to become.
            </p>
          </div>
        </Section>

        {/* ── The human part ── */}
        <Section>
          <div>
            <p className="mono-label" style={{ marginBlockEnd: "1.5rem" }}>
              Outside the terminal
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
                gap: "1rem",
              }}
            >
              {[
                {
                  title: "Games",
                  body: "Serious about them. Will not elaborate.",
                },
                {
                  title: "Comics & Animation",
                  body: "Marvel, DC, the whole universe. I watch, I do not read. The distinction matters to nobody but me.",
                },
                {
                  title: "Hobby hopping",
                  body: "I have started many things. I have intentions about all of them. Time is a finite resource.",
                },
                {
                  title: "Going out",
                  body: "I love it. I also dread it. Both are true simultaneously. I have made peace with this.",
                },
                {
                  title: "History & Science",
                  body: "Earth, space, how things actually work. The world is more interesting when you ask why.",
                },
                {
                  title: "Dad jokes",
                  body: "Not everyone gets them. The right people always do. You know who you are.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    padding: "1.25rem",
                    backgroundColor: "var(--color-surface)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-border-subtle)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--color-accent)",
                      margin: 0,
                      marginBlockEnd: "0.5rem",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
