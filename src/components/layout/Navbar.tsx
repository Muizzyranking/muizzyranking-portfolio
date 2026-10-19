"use client";

import { m, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CommandPalette from "@/components/layout/CommandPalette";
import MobileMenu from "@/components/layout/MobileMenu";
import MusicPopover from "@/components/music/MusicPopover";
import { useMusic } from "@/components/music/MusicProvider";
import { site } from "@/lib/site";

export default function Navbar({ projects, posts }: { projects: { slug: string; title: string }[]; posts: { slug: string; title: string }[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { scrollY } = useScroll();
  const { playback, panel, togglePanel } = useMusic();
  const musicActive = playback === "playing";
  const musicSpin = musicActive && panel !== "open";

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
            className="font-mono text-[0.85rem] font-medium tracking-tight text-text-primary transition-colors duration-150 hover:text-text-secondary"
          >
            muizzy<span className="text-accent italic">ranking</span>.
          </Link>

          <nav className="hidden md:flex items-center gap-0.5" aria-label="Primary navigation">
            {site.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="relative px-2.5 py-2 font-mono text-[0.76rem] font-semibold leading-none lowercase tracking-[0.06em] transition-colors duration-150"
                  style={{ color: active ? "var(--color-text-primary)" : "var(--color-text-muted)" }}
                >
                  {item.label}
                  {active && (
                    <m.span
                      layoutId="nav-underline"
                      className="absolute inset-x-2.5 -bottom-px h-px bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <div className="relative">
              <button
                type="button"
                onClick={togglePanel}
                aria-label={panel === "open" ? "Minimize music player" : "Open music player"}
                aria-expanded={panel === "open"}
                data-music-trigger
                title="Music"
                className={`inline-flex h-8 w-8 items-center justify-center transition-colors duration-150 ${
                  panel === "open" || musicActive ? "text-accent" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {musicSpin ? (
                  <span className="flex h-3.5 items-end gap-[2.5px]" aria-hidden="true">
                    {[0, 1, 2, 3].map((i) => (
                      <span key={i} className="music-bar w-[2.5px] rounded-full bg-accent" style={{ animationDelay: `${i * 0.25}s` }} />
                    ))}
                  </span>
                ) : (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                )}
              </button>
              <MusicPopover />
            </div>

            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Search"
              className="inline-flex h-8 items-center gap-1.5 border border-border bg-surface-raised px-2.5 text-text-muted transition-colors duration-150 hover:border-text-secondary hover:text-text-primary"
            >
              <svg
                width="12"
                height="12"
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
              <kbd className="hidden sm:inline font-mono text-[0.68rem]" aria-label="Keyboard shortcut">
                ⌘K
              </kbd>
            </button>

            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex h-8 items-center gap-1.5 border border-border bg-surface-raised px-3 font-mono text-[0.72rem] lowercase text-text-secondary transition-colors duration-150 hover:border-text-secondary hover:text-text-primary"
            >
              résumé
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M4 1h5v5M9 1 4 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="md:hidden inline-flex h-8 w-8 items-center justify-center text-text-secondary transition-colors duration-150 hover:text-text-primary"
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
