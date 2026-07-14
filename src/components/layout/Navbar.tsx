"use client";

import { m, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { label: "about", href: "/about" },
  { label: "projects", href: "/projects" },
  { label: "tools", href: "/tools" },
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
        className="fixed top-0 left-0 right-0 z-[100] h-16 flex items-center justify-between px-[clamp(1.5rem,5vw,4rem)] transition-[background,border-color,backdrop-filter] duration-[350ms] ease-out"
        style={{
          borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
          background: scrolled ? "rgba(14,14,14,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        }}
      >
        <div className="container-main h-full flex items-center justify-between">
          {/* ── LOGO ── */}
          <Link
            href="/"
            className="font-mono text-[0.88rem] font-semibold tracking-[-0.01em] text-text-primary transition-colors duration-200 no-underline flex items-center gap-0 hover:text-accent"
          >
            muizzy
            <span className="text-accent">ranking.</span>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav className="flex items-center gap-1" aria-label="Primary navigation">
            {/* Links — hidden on mobile via CSS */}
            <ul className="nav-desktop-links hidden sm:flex items-center gap-0 list-none m-0 p-0">
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
                    className="flex items-center"
                  >
                    {i > 0 && <span className="font-mono text-[0.65rem] text-accent px-3 select-none">/</span>}
                    <Link
                      href={href}
                      className="font-mono text-[0.72rem] tracking-[0.1em] no-underline py-[0.4rem] px-5 rounded-sm transition-[color,background] duration-200 block relative"
                      style={{
                        color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                      }}
                    >
                      {label}
                      {isActive && (
                        <m.span
                          layoutId="nav-underline"
                          className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </m.li>
                );
              })}
            </ul>

            {/* Resume CTA — opens PDF in new tab */}
            <m.a
              href="/Muiz-Oyebowale-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="nav-resume-btn hidden sm:inline-flex items-center gap-[0.4rem] font-mono text-[0.72rem] tracking-[0.1em] text-accent no-underline border border-accent-dim py-[0.4rem] px-4 ml-3 rounded-sm transition-[background,color] duration-200 hover:bg-accent hover:text-white"
            >
              résumé
              {/* external link icon */}
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                <path d="M4.5 1.5h5v5M9.5 1.5L5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </m.a>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="nav-hamburger sm:hidden bg-transparent border-0 cursor-pointer p-2 text-text-secondary ml-2"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((o) => !o)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                {mobileOpen ? (
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                ) : (
                  <>
                    <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
        animate={mobileOpen ? { opacity: 1, y: 0, pointerEvents: "auto" } : { opacity: 0, y: -8, pointerEvents: "none" }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-16 left-0 right-0 z-[99] flex flex-col gap-1 px-[clamp(1.5rem,5vw,4rem)] py-6 border-b border-border"
        style={{
          background: "rgba(14,14,14,0.97)",
          backdropFilter: "blur(16px)",
        }}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            className="font-mono text-[0.9rem] tracking-[0.1em] text-text-secondary no-underline py-3 border-b border-border-subtle transition-colors duration-200 hover:text-text-primary"
          >
            {label}
          </Link>
        ))}
        <a href="/Muiz-Oyebowale-Resume.pdf" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.9rem] tracking-[0.1em] text-accent no-underline py-3 mt-1">
          résumé ↗
        </a>
      </m.div>
    </>
  );
}
