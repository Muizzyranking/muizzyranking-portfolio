"use client";

import { motion } from "framer-motion";

const links = [
  {
    label: "Email",
    value: "muiz@example.com", // replace with your actual email
    href: "mailto:muiz@example.com",
    mono: "muiz@example.com",
  },
  {
    label: "GitHub",
    value: "Muizzyranking",
    href: "https://github.com/Muizzyranking",
    mono: "github.com/Muizzyranking",
  },
  {
    label: "LinkedIn",
    value: "Muiz Oyebowale",
    href: "https://linkedin.com/in/muizzyranking", // replace with actual
    mono: "linkedin.com/in/muizzyranking",
  },
  {
    label: "Twitter / X",
    value: "@muizzyranking",
    href: "https://x.com/muizzyranking", // replace with actual
    mono: "x.com/muizzyranking",
  },
];

export default function Contact() {
  return (
    <section className="section">
      <div className="container-main">
        <div className="contact-grid">
          {/* Left — heading + blurb */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="mono-label" style={{ marginBlockEnd: "1rem" }}>
              Contact
            </p>

            <h2
              style={{
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                margin: 0,
                marginBlockEnd: "1.5rem",
              }}
            >
              Let's talk about
              <br />
              <span style={{ color: "var(--color-text-secondary)" }}>
                something interesting.
              </span>
            </h2>

            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.85,
                margin: 0,
                marginBlockEnd: "2rem",
              }}
            >
              Open to backend engineering roles, interesting problems, and
              conversations about systems, AI, or why Neovim is still relevant
              in {new Date().getFullYear()}.{" "}
              <span
                style={{
                  color: "var(--color-text-muted)",
                  fontStyle: "italic",
                }}
              >
                (It is.)
              </span>
            </p>

            {/* Resume download */}

            <a
              href="/resume.pdf"
              download
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                paddingInline: "1.5rem",
                paddingBlock: "0.75rem",
                backgroundColor: "var(--color-accent)",
                color: "var(--color-background)",
                fontWeight: 600,
                fontSize: "0.875rem",
                borderRadius: "var(--radius-md)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.04em",
                transition: "opacity 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.85";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              ↓ Download Resume
            </a>
          </motion.div>

          {/* Right — links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {links.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
                style={{
                  display: "grid",
                  gridTemplateColumns: "5rem 1fr auto",
                  alignItems: "center",
                  gap: "1.5rem",
                  paddingBlock: "1.25rem",
                  paddingInline: "1rem",
                  borderTop: "1px solid var(--color-border-subtle)",
                  borderBottom:
                    i === links.length - 1
                      ? "1px solid var(--color-border-subtle)"
                      : "none",
                  transition: "background-color 0.2s ease",
                  borderRadius: "var(--radius-sm)",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-surface)";
                  const arrow = e.currentTarget.querySelector(
                    ".link-arrow",
                  ) as HTMLElement;
                  const mono = e.currentTarget.querySelector(
                    ".link-mono",
                  ) as HTMLElement;
                  if (arrow) {
                    arrow.style.opacity = "1";
                    arrow.style.transform = "translateX(3px)";
                    arrow.style.color = "var(--color-accent)";
                  }
                  if (mono) mono.style.color = "var(--color-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  const arrow = e.currentTarget.querySelector(
                    ".link-arrow",
                  ) as HTMLElement;
                  const mono = e.currentTarget.querySelector(
                    ".link-mono",
                  ) as HTMLElement;
                  if (arrow) {
                    arrow.style.opacity = "0.25";
                    arrow.style.transform = "translateX(0)";
                    arrow.style.color = "var(--color-text-muted)";
                  }
                  if (mono) mono.style.color = "var(--color-text-muted)";
                }}
              >
                {/* Label */}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {link.label}
                </span>

                {/* Value */}
                <span
                  className="link-mono"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    color: "var(--color-text-muted)",
                    transition: "color 0.2s ease",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {link.mono}
                </span>

                {/* Arrow */}
                <span
                  className="link-arrow"
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-text-muted)",
                    opacity: 0.25,
                    transition:
                      "opacity 0.2s ease, transform 0.2s ease, color 0.2s ease",
                    flexShrink: 0,
                  }}
                >
                  →
                </span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
