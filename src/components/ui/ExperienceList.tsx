"use client";

import { AnimatePresence, m } from "framer-motion";
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
    <m.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
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
        <m.div
          animate={{ scaleX: isOpen ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
            gridTemplateColumns: "4rem 1fr auto",
            gap: "1.5rem",
            alignItems: "center",
            paddingBlock: "1.75rem",
            paddingInline: "1rem",
            backgroundColor: isOpen
              ? "color-mix(in srgb, var(--color-accent) 4%, var(--color-surface))"
              : "transparent",
            borderRadius: isOpen
              ? "var(--radius-md) var(--radius-md) 0 0"
              : "0",
            transition: "background-color 0.3s ease",
          }}
        >
          {/* Index — large, architectural */}
          <m.span
            animate={{
              color: isOpen ? "var(--color-accent)" : "var(--color-border)",
            }}
            transition={{ duration: 0.25 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1.6rem",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              userSelect: "none",
              display: "block",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </m.span>

          {/* Company + role */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                flexWrap: "wrap",
                marginBlockEnd: "0.35rem",
              }}
            >
              <m.span
                animate={{
                  color: isOpen
                    ? "var(--color-accent)"
                    : "var(--color-text-primary)",
                }}
                transition={{ duration: 0.25 }}
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                {exp.company}
              </m.span>

              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
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

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                {exp.role}
              </span>
            </div>
          </div>

          {/* Right — period + toggle */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "0.6rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                color: "var(--color-accent)",
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
              }}
            >
              {exp.period.start} — {exp.period.end}
            </span>

            {/* Toggle icon */}
            <m.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                border: `1px solid ${isOpen ? "var(--color-accent)" : "var(--color-border)"}`,
                transition: "border-color 0.25s ease",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.9rem",
                  lineHeight: 1,
                  color: isOpen
                    ? "var(--color-accent)"
                    : "var(--color-text-muted)",
                  transition: "color 0.25s ease",
                  display: "block",
                  marginTop: "-1px",
                }}
              >
                +
              </span>
            </m.div>
          </div>
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                paddingInline: "1rem",
                paddingBlockEnd: "2rem",
                paddingBlockStart: "0.25rem",
                backgroundColor:
                  "color-mix(in srgb, var(--color-accent) 4%, var(--color-surface))",
                borderRadius: "0 0 var(--radius-md) var(--radius-md)",
              }}
            >
              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background:
                    "linear-gradient(to right, var(--color-accent-dim), var(--color-border-subtle), transparent)",
                  marginBlockEnd: "1.75rem",
                }}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "4rem 1fr",
                  gap: "1.5rem",
                }}
              >
                <div />
                <div>
                  <p className="mono-label" style={{ marginBlockEnd: "1rem" }}>
                    Highlights
                  </p>

                  <ul
                    style={{
                      margin: 0,
                      padding: 0,
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.85rem",
                      marginBlockEnd: "2rem",
                    }}
                  >
                    {exp.highlights.map((highlight, i) => (
                      <m.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: i * 0.06,
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1rem 1fr",
                          gap: "0.75rem",
                          fontSize: "0.9rem",
                          color: "var(--color-text-primary)",
                          lineHeight: 1.7,
                        }}
                      >
                        <span
                          style={{
                            color: "var(--color-accent)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.7rem",
                            paddingTop: "0.35rem",
                            userSelect: "none",
                          }}
                        >
                          ↳
                        </span>
                        {highlight}
                      </m.li>
                    ))}
                  </ul>

                  <p
                    className="mono-label"
                    style={{ marginBlockEnd: "0.75rem" }}
                  >
                    Stack
                  </p>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}
                  >
                    {exp.stack.map((tech, i) => (
                      <m.span
                        key={tech}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.2 }}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--color-accent)",
                          backgroundColor: "var(--color-accent-subtle)",
                          padding: "0.25rem 0.6rem",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--color-accent-dim)",
                        }}
                      >
                        {tech}
                      </m.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Bottom line — last item only */}
      {last && (
        <div
          style={{
            height: "1px",
            backgroundColor: "var(--color-border-subtle)",
          }}
        />
      )}
    </m.div>
  );
}

export default function ExperienceList({
  experiences,
}: {
  experiences: Experience[];
}) {
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
