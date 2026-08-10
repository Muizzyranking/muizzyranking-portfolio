"use client";

import { m, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CommandPalette from "@/components/layout/CommandPalette";
import MobileMenu from "@/components/layout/MobileMenu";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { site } from "@/lib/site";

export default function Navbar({ projects, posts }: { projects: { slug: string; title: string }[]; posts: { slug: string; title: string }[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "k" || !(e.metaKey || e.ctrlKey)) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
      e.preventDefault();
      setPaletteOpen((o) => !o);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 8);
  });

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`site-header fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out ${scrolled ? "site-header--scrolled" : ""}`}
      >
        <div className="container-main flex h-14 items-center justify-between gap-4">
          <Link
            href="/"
            className="text-[0.95rem] font-semibold tracking-tight text-text-primary transition-colors duration-150 hover:text-text-secondary"
          >
            muizzy<span className="inline-block italic px-[0.12em] rounded-sm bg-accent text-background">ranking</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
            {site.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="relative rounded-sm px-3 py-2 text-[0.9rem] font-semibold lowercase transition-colors duration-150"
                  style={{ color: active ? "var(--color-text-primary)" : "var(--color-text-secondary)" }}
                >
                  {item.label}
                  {active && (
                    <m.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-px h-px bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Search"
              className="inline-flex h-8 items-center gap-2 rounded-md border border-border px-2.5 text-text-secondary transition-colors duration-150 hover:text-text-primary hover:border-border"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span className="hidden sm:inline font-mono text-[0.62rem] uppercase tracking-[0.1em]">search</span>
              <kbd
                className="hidden lg:inline-flex items-center rounded-sm border border-border px-1 py-px font-mono text-[0.6rem] text-text-muted"
                aria-label="Keyboard shortcut"
              >
                ⌘K
              </kbd>
            </button>

            <ThemeToggle />

            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1 rounded-md border border-border px-3 h-8 text-xs font-medium text-text-secondary transition-colors duration-150 hover:text-text-primary hover:border-border"
            >
              Résumé
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M4 1h5v5M9 1 4 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-md text-text-secondary transition-colors duration-150 hover:text-text-primary hover:bg-bg-elevated"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                {mobileOpen ? (
                  <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                ) : (
                  <>
                    <line x1="2" y1="5.5" x2="16" y2="5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="2" y1="9.5" x2="16" y2="9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="2" y1="13.5" x2="16" y2="13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} projects={projects} posts={posts} />
    </>
  );
}
