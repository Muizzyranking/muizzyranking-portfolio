"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/motion";

/** Horizontal, snap-scrolling screenshot strip. Click → full lightbox with
 *  close icon, backdrop + ESC close, and prev/next when there's more than one. */
export default function ScreenshotGallery({ screenshots, title }: { screenshots: string[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      else if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % screenshots.length));
      else if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + screenshots.length) % screenshots.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, screenshots.length]);

  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (screenshots.length === 0) return null;

  return (
    <>
      {/* Strip — horizontal scroll with snap points. data-cursor-clip lets
          the custom cursor clamp its wrap to the strip's visible bounds. */}
      <div data-cursor-clip className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-3">
        {screenshots.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Open screenshot ${i + 1} of ${screenshots.length}`}
            className="group relative aspect-[16/10] w-[86%] shrink-0 snap-center overflow-hidden border border-border rounded-[var(--radius-md)] bg-bg-elevated sm:w-[30rem]"
          >
            <Image
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              fill
              sizes="(min-width: 640px) 30rem, 86vw"
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
              quality={90}
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open !== null && (
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label={`Screenshot ${open + 1} of ${screenshots.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
          >
            <m.div
              initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-[16/10] w-full max-w-4xl overflow-hidden border border-border rounded-[var(--radius-lg)] bg-black"
            >
              <Image src={screenshots[open]} alt={`${title} screenshot ${open + 1}`} fill sizes="90vw" className="object-contain" quality={95} />
            </m.div>

            {/* close icon */}
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close screenshot"
              className="absolute top-4 right-4 flex size-10 items-center justify-center border border-white/15 text-white/80 transition-colors duration-150 hover:border-white/40 hover:text-white sm:top-6 sm:right-6"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* prev / next */}
            {screenshots.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen((open - 1 + screenshots.length) % screenshots.length);
                  }}
                  aria-label="Previous screenshot"
                  className="absolute left-2 flex size-10 items-center justify-center border border-white/15 text-white/80 transition-colors duration-150 hover:border-white/40 hover:text-white sm:left-6"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M9 2 4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen((open + 1) % screenshots.length);
                  }}
                  aria-label="Next screenshot"
                  className="absolute right-2 flex size-10 items-center justify-center border border-white/15 text-white/80 transition-colors duration-150 hover:border-white/40 hover:text-white sm:right-6"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="m5 2 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[0.7rem] text-white/60">
                  {open + 1} / {screenshots.length}
                </p>
              </>
            )}
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
