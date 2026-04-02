"use client";
import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { SOCIAL_ICONS } from "@/components/ui/icons";
import { EMAIL, SOCIALS } from "@/lib/data";
import { fadeUp, SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";

const socialsArray = (Object.keys(SOCIALS) as Array<keyof typeof SOCIALS>).map((key) => ({
  ...SOCIALS[key],
  icon: SOCIAL_ICONS[key],
}));

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);

  return (
    <section
      ref={ref}
      id="contact"
      style={{
        padding: "clamp(5rem, 10vw, 8rem) 0",
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border-subtle)",
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
            marginBottom: "2rem",
          }}
        >
          <span style={{ color: "var(--color-accent)", opacity: 0.7 }}>[ ]</span>
          Contact
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
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          <div>
            <m.h2
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
              }}
            >
              Let&apos;s build something <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>interesting.</em>
            </m.h2>

            <m.p
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{
                color: "var(--color-text-secondary)",
                fontSize: "0.95rem",
                lineHeight: 1.78,
                maxWidth: "42ch",
                marginBottom: "1.75rem",
              }}
            >
              Open to backend roles, AI/ML adjacent work, interesting problems, conversations about systems, AI, conversations that don&apos;t start
              with &ldquo;circle back,&rdquo; or why Neovim is still relevant in {new Date().getFullYear()}.{" "}
              <span
                style={{
                  color: "var(--color-text-muted)",
                  fontStyle: "italic",
                }}
              >
                (It is.)
              </span>
            </m.p>

            <m.div variants={fadeUp} custom={3} initial="hidden" animate={inView ? "visible" : "hidden"}>
              <a
                href={`mailto:${EMAIL}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.88rem",
                  color: "var(--color-accent)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--color-accent-dim)",
                  paddingBottom: "0.15rem",
                  transition: "opacity 0.2s",
                  letterSpacing: "0.04em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.65";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                }}
              >
                {EMAIL} →
              </a>
            </m.div>
          </div>

          {/* ── RIGHT — social links */}
          <div>
            <m.p
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.63rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                marginBottom: "1.25rem",
              }}
            >
              Find me online
            </m.p>

            <m.div
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {socialsArray.map(({ name, handle, href, icon }) => (
                <m.a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={staggerItem}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.875rem",
                    padding: "0.875rem 1rem",
                    background: "var(--color-background)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    textDecoration: "none",
                    color: "var(--color-text-secondary)",
                    transition: "border-color 0.2s",
                  }}
                  onHoverStart={(e) => {
                    const link = (e.target as HTMLElement).closest("a");
                    if (link) {
                      link.style.borderColor = "var(--color-accent-dim)";
                    }
                  }}
                  onHoverEnd={(e) => {
                    const link = (e.target as HTMLElement).closest("a");
                    if (link) {
                      link.style.borderColor = "var(--color-border)";
                    }
                  }}
                >
                  {/* Icon box */}
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-sm)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-accent)",
                      flexShrink: 0,
                    }}
                  >
                    {icon}
                  </div>

                  <div>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        color: "var(--color-text-primary)",
                        marginBottom: "0.1rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {name}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {handle}
                    </p>
                  </div>

                  <span
                    style={{
                      marginLeft: "auto",
                      color: "var(--color-text-muted)",
                      fontSize: "0.82rem",
                    }}
                  >
                    →
                  </span>
                </m.a>
              ))}
            </m.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
