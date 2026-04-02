"use client";

import { m, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { label: "about", href: "/about" },
  { label: "projects", href: "/projects" },
  { label: "writing", href: "/blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  return (
    <>
      <m.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: "clamp(1.5rem, 5vw, 4rem)",
          borderBottom: scrolled
            ? "1px solid var(--color-border)"
            : "1px solid transparent",
          background: scrolled ? "rgba(14,14,14,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          transition:
            "background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease",
        }}
      >
        <div
          className="container-main"
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* ── LOGO ── */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.88rem",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--color-text-primary)",
              transition: "color 0.2s ease",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-text-primary)";
            }}
          >
            muizzyranking
            <span style={{ color: "var(--color-accent)" }}>.</span>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
            aria-label="Primary navigation"
          >
            {/* Links — hidden on mobile via CSS */}
            <ul
              className="nav-desktop-links"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.125rem",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {NAV_LINKS.map(({ label, href }, i) => {
                const isActive = pathname.startsWith(href);
                return (
                  <m.li
                    key={href}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.15 + i * 0.08,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {i > 0 && (
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          color: "var(--color-accent)",
                          paddingInline: "0.75rem",
                          userSelect: "none",
                        }}
                      >
                        /
                      </span>
                    )}
                    <Link
                      href={href}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        letterSpacing: "0.1em",
                        color: isActive
                          ? "var(--color-text-primary)"
                          : "var(--color-text-secondary)",
                        textDecoration: "none",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "var(--radius-sm)",
                        transition: "color 0.2s, background 0.2s",
                        display: "block",
                        position: "relative",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "var(--color-text-primary)";
                        (e.currentTarget as HTMLElement).style.background =
                          "var(--color-surface)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "var(--color-text-muted)";
                        (e.currentTarget as HTMLElement).style.background =
                          "transparent";
                      }}
                    >
                      {label}
                      { isActive && <m.span
                        layoutId="nav-underline"
                        style={{
                          position: "absolute",
                          bottom: -2,
                          left: 0,
                          right: 0,
                          height: "1px",
                          backgroundColor: "var(--color-accent)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      /> }
                    </Link>
                  </m.li>
                );
              })}
            </ul>

            {/* Resume download CTA */}
            <m.a
              href="/resume.pdf"
              download
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="nav-resume-btn"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                color: "var(--color-accent)",
                textDecoration: "none",
                border: "1px solid var(--color-accent-dim)",
                padding: "0.4rem 1rem",
                borderRadius: "var(--radius-sm)",
                marginLeft: "0.75rem",
                transition: "background 0.2s, color 0.2s",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
              onHoverStart={(e) => {
                (e.target as HTMLElement).style.background =
                  "var(--color-accent)";
                (e.target as HTMLElement).style.color = "#fff";
              }}
              onHoverEnd={(e) => {
                (e.target as HTMLElement).style.background = "transparent";
                (e.target as HTMLElement).style.color = "var(--color-accent)";
              }}
            >
              résumé
              {/* down arrow icon */}
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5.5 1v7M2 5.5l3.5 3.5L9 5.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </m.a>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="nav-hamburger"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((o) => !o)}
              style={{
                display: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem",
                color: "var(--color-text-secondary)",
                marginLeft: "0.5rem",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                {mobileOpen ? (
                  <path
                    d="M4 4l12 12M16 4L4 16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                ) : (
                  <>
                    <line
                      x1="3"
                      y1="6"
                      x2="17"
                      y2="6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="3"
                      y1="10"
                      x2="17"
                      y2="10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="3"
                      y1="14"
                      x2="17"
                      y2="14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </>
                )}
              </svg>
            </button>
          </nav>
        </div>
      </m.header>

      {/* ── MOBILE MENU ── */}
      <m.div
        initial={false}
        animate={
          mobileOpen
            ? { opacity: 1, y: 0, pointerEvents: "auto" }
            : { opacity: 0, y: -8, pointerEvents: "none" }
        }
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: "64px",
          left: 0,
          right: 0,
          zIndex: 99,
          background: "rgba(14,14,14,0.97)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--color-border)",
          padding: "1.5rem clamp(1.5rem, 5vw, 4rem)",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
        }}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.9rem",
              letterSpacing: "0.1em",
              color: "var(--color-text-secondary)",
              textDecoration: "none",
              padding: "0.75rem 0",
              borderBottom: "1px solid var(--color-border-subtle)",
              transition: "color 0.2s",
            }}
          >
            {label}
          </Link>
        ))}
        <a
          href="/resume.pdf"
          download
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.9rem",
            letterSpacing: "0.1em",
            color: "var(--color-accent)",
            textDecoration: "none",
            padding: "0.75rem 0",
            marginTop: "0.25rem",
          }}
        >
          résumé ↓
        </a>
      </m.div>

      <style>{`
        @media (max-width: 640px) {
          .nav-desktop-links { display: none !important; }
          .nav-resume-btn { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
