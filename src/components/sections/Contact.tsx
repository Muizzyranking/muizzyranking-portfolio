"use client";

import { m } from "framer-motion";
import { useState } from "react";

const links = [
  {
    label: "Email",
    href: "mailto:oyebowaleabdulmuiz@gmail.com",
    mono: "oyebowaleabdulmuiz@gmail.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/Muizzyranking",
    mono: "github.com/Muizzyranking",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/muizzyrankin",
    mono: "linkedin.com/in/muizzyrankin",
  },
  {
    label: "Twitter / X",
    href: "https://x.com/muizzyranking",
    mono: "x.com/muizzyranking",
  },
];

function ContactLink({
  link,
  isLast,
}: {
  link: (typeof links)[0];
  index: number;
  isLast: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      {/* Top border with reveal */}
      <div style={{ position: "relative", height: "1px" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "var(--color-border-subtle)",
          }}
        />
        <m.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "var(--color-accent)",
            transformOrigin: "left",
          }}
        />
      </div>

      <a
        href={link.href}
        target={link.href.startsWith("mailto") ? undefined : "_blank"}
        rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "grid",
          gridTemplateColumns: "5rem 1fr auto",
          alignItems: "center",
          gap: "1.5rem",
          paddingBlock: "1.25rem",
          paddingInline: "1rem",
          backgroundColor: hovered
            ? "color-mix(in srgb, var(--color-accent) 4%, var(--color-surface))"
            : "transparent",
          borderRadius: "var(--radius-sm)",
          textDecoration: "none",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
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
            whiteSpace: "nowrap",
          }}
        >
          {link.label}
        </span>

        {/* Mono value */}
        <m.span
          animate={{
            color: hovered
              ? "var(--color-accent)"
              : "var(--color-text-secondary)",
          }}
          transition={{ duration: 0.2 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {link.mono}
        </m.span>

        {/* Arrow */}
        <m.span
          animate={{
            x: hovered ? 5 : 0,
            opacity: hovered ? 1 : 0.2,
            color: hovered ? "var(--color-accent)" : "var(--color-text-muted)",
          }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: "1rem", flexShrink: 0 }}
        >
          →
        </m.span>
      </a>

      {/* Bottom border on last item */}
      {isLast && (
        <div style={{ position: "relative", height: "1px" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "var(--color-border-subtle)",
            }}
          />
          <m.div
            animate={{ scaleX: hovered ? 1 : 0 }}
            initial={{ scaleX: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "var(--color-accent)",
              transformOrigin: "left",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function Contact() {
  return (
    <section className="section">
      <div className="container-main">
        <div className="contact-grid">
          {/* Left — heading + blurb */}
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="mono-label"
              style={{
                marginBlockEnd: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  color: "var(--color-accent)",
                  opacity: 0.6,
                  whiteSpace: "nowrap",
                }}
              >
                [ 06 ]
              </span>
              Contact
            </p>

            <h2
              style={{
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                margin: "0 0 1.5rem",
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
                margin: "0 0 2rem",
                maxWidth: "44ch",
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
                paddingBlock: "0.8rem",
                backgroundColor: "var(--color-accent)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.85rem",
                borderRadius: "var(--radius-md)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.04em",
                textDecoration: "none",
                transition: "opacity 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.88";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              ↓ Download Resume
            </a>
          </m.div>

          {/* Right — links */}
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {links.map((link, i) => (
              <ContactLink
                key={link.label}
                link={link}
                index={i}
                isLast={i === links.length - 1}
              />
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
}
