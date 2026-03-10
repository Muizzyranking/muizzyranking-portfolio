"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Experience } from "@/lib/experience";

function ExperienceRow({
  exp,
  index,
  isOpen,
  onToggle,
  last,
}: {
  exp: Experience;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  last: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{ position: "relative" }}
    >
      {/* Top line */}
      <div style={{ position: "relative", height: "1px" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "var(--color-border-subtle)",
          }}
        />
        <motion.div
          animate={{ scaleX: isOpen ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "var(--color-accent)",
            transformOrigin: "left",
          }}
        />
      </div>

      {/* Row button */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3rem 1fr auto",
            gap: "1.5rem",
            alignItems: "center",
            paddingBlock: "1.75rem",
            paddingInline: "1rem",
            backgroundColor: isOpen ? "var(--color-surface)" : "transparent",
            borderRadius: isOpen ? "var(--radius-md)" : "0",
            transition: "background-color 0.25s ease",
          }}
        >
          {/* Index */}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              color: isOpen ? "var(--color-accent)" : "var(--color-text-muted)",
              transition: "color 0.25s ease",
              userSelect: "none",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Company + role */}
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
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: isOpen
                    ? "var(--color-accent)"
                    : "var(--color-text-primary)",
                  transition: "color 0.25s ease",
                }}
              >
                {exp.company}
              </span>

              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.06em",
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

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--color-text-muted)",
                }}
              >
                {exp.role}
              </span>

              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--color-text-muted)",
                  opacity: 0.6,
                }}
              >
                {exp.location}
              </span>
            </div>
          </div>

          {/* Right — period + toggle */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                color: "var(--color-accent)",
                letterSpacing: "0.06em",
                whiteSpace: "nowrap",
              }}
            >
              {exp.period.start} — {exp.period.end}
            </span>

            <motion.span
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              style={{
                display: "inline-block",
                fontFamily: "var(--font-mono)",
                fontSize: "1rem",
                color: isOpen
                  ? "var(--color-accent)"
                  : "var(--color-text-muted)",
                lineHeight: 1,
                transition: "color 0.25s ease",
              }}
            >
              +
            </motion.span>
          </div>
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                paddingInline: "1rem",
                paddingBlockEnd: "2rem",
                paddingBlockStart: "0.25rem",
                backgroundColor: "var(--color-surface)",
                borderRadius: `0 0 var(--radius-md) var(--radius-md)`,
              }}
            >
              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  backgroundColor: "var(--color-border-subtle)",
                  marginBlockEnd: "1.5rem",
                  marginInline: "0",
                }}
              />

              {/* Highlights */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "3rem 1fr",
                  gap: "1.5rem",
                }}
              >
                <div />
                <div>
                  <p
                    className="mono-label"
                    style={{ marginBlockEnd: "1rem" }}
                  >
                    Highlights
                  </p>

                  <ul
                    style={{
                      margin: 0,
                      padding: 0,
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                      marginBlockEnd: "1.75rem",
                    }}
                  >
                    {exp.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: i * 0.05,
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1rem 1fr",
                          gap: "0.75rem",
                          fontSize: "0.875rem",
                          color: "var(--color-text-secondary)",
                          lineHeight: 1.65,
                        }}
                      >
                        <span
                          style={{
                            color: "var(--color-accent)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.7rem",
                            paddingTop: "0.3rem",
                            userSelect: "none",
                          }}
                        >
                          ↳
                        </span>
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Stack */}
                  <p
                    className="mono-label"
                    style={{ marginBlockEnd: "0.75rem" }}
                  >
                    Stack
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.4rem",
                    }}
                  >
                    {exp.stack.map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: i * 0.04,
                          duration: 0.2,
                        }}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          letterSpacing: "0.06em",
                          color: "var(--color-accent)",
                          backgroundColor: "var(--color-accent-subtle)",
                          padding: "0.25rem 0.6rem",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--color-accent-dim)",
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom line — only on last item or when closed */}
      {last && (
        <div
          style={{
            height: "1px",
            backgroundColor: "var(--color-border-subtle)",
          }}
        />
      )}
    </motion.div>
  );
}

export default function ExperienceList({ experiences }: { experiences: Experience[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div>
      {experiences.map((exp, i) => (
        <ExperienceRow
          key={i}
          exp={exp}
          index={i}
          isOpen={openIndex === i}
          onToggle={() => toggle(i)}
          last={i === experiences.length - 1}
        />
      ))}
    </div>
  );
}
