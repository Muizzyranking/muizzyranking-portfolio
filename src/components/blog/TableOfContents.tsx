"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import type { TocItem } from "@/types";

function useActiveHeading(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (ids.length === 0) return;
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting entry.
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -65% 0px", threshold: 0 },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function TocList({ items, active, onClick }: { items: TocItem[]; active: string | null; onClick?: () => void }) {
  if (items.length === 0) {
    return (
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.72rem",
          color: "var(--color-text-muted)",
        }}
      >
        {"// no headings yet"}
      </p>
    );
  }
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.55rem" }}>
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <li key={item.id} style={{ paddingLeft: item.level === 3 ? "1rem" : 0 }}>
            <a
              href={`#${item.id}`}
              onClick={onClick}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: item.level === 3 ? "0.74rem" : "0.78rem",
                letterSpacing: "0.02em",
                color: isActive ? "var(--color-accent)" : "var(--color-text-muted)",
                lineHeight: 1.5,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "baseline",
                gap: "0.45rem",
                paddingBlock: "0.1rem",
                transition: "color 0.18s",
                borderLeft: isActive ? "2px solid var(--color-accent)" : "2px solid transparent",
                paddingLeft: "0.6rem",
                marginLeft: "-0.6rem",
              }}
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)";
              }}
            >
              {item.text}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const ids = items.map((i) => i.id);
  const active = useActiveHeading(ids);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sticky sidebar */}
      <aside
        className="toc-desktop"
        aria-label="On this page"
        style={{
          position: "sticky",
          top: "5.5rem",
          alignSelf: "start",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
            marginBottom: "1rem",
          }}
        >
          On this page
        </p>
        <TocList items={items} active={active} />
      </aside>

      {/* Mobile bottom-right pill button */}
      {items.length > 0 && (
        <button
          type="button"
          className="toc-mobile-trigger"
          aria-label="Open table of contents"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            zIndex: 50,
            display: "none",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.6rem 1rem",
            background: "var(--color-bg-elevated)",
            border: "1px solid var(--color-border)",
            borderRadius: "999px",
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <span aria-hidden style={{ color: "var(--color-accent)" }}>
            ☰
          </span>
          contents
        </button>
      )}

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setMobileOpen(false)}
            className="toc-mobile-overlay"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 60,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <m.div
              initial={{ y: 32 }}
              animate={{ y: 0 }}
              exit={{ y: 32 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxHeight: "75vh",
                overflowY: "auto",
                background: "var(--color-background)",
                borderTop: "1px solid var(--color-border)",
                padding: "1.5rem clamp(1.25rem, 5vw, 2.5rem) 2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--color-text-muted)",
                  }}
                >
                  On this page
                </p>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--color-text-muted)",
                    fontSize: "1rem",
                    cursor: "pointer",
                    padding: "0.25rem 0.5rem",
                  }}
                >
                  ✕
                </button>
              </div>
              <TocList items={items} active={active} onClick={() => setMobileOpen(false)} />
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .toc-desktop { display: none !important; }
          .toc-mobile-trigger { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
}
