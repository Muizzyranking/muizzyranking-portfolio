"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MUSIC_TRACKS, useMusic } from "@/components/music/MusicProvider";
import { EASE } from "@/lib/motion";

function Wave({ className = "", bars = 3 }: { className?: string; bars?: number }) {
  return (
    <span className={`flex h-3.5 items-end gap-[2.5px] ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static decorative bars, order is the point
        <span key={i} className="music-bar w-[2.5px] rounded-full bg-accent" style={{ animationDelay: `${i * 0.16}s` }} />
      ))}
    </span>
  );
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function MusicPopover() {
  const { playback, panel, setPanel, trackIndex, volume, progress, togglePlay, stop, selectTrack, cycleTrack, setVolume } = useMusic();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [listOpen, setListOpen] = useState(false);

  useEffect(() => {
    if (panel !== "open") return;
    const onPointerDown = (e: PointerEvent) => {
      const el = panelRef.current;
      const trigger = (e.target as HTMLElement | null)?.closest?.("[data-music-trigger]");
      if (el && !el.contains(e.target as Node) && !trigger) {
        setPanel("minimized");
        setListOpen(false);
      }
    };
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [panel, setPanel]);

  const pct = progress.duration > 0 ? (progress.current / progress.duration) * 100 : 0;

  return (
    <AnimatePresence>
      {panel === "open" && (
        <m.div
          ref={panelRef}
          initial={{ opacity: 0, y: reduce ? 0 : -6, scale: reduce ? 1 : 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: reduce ? 0 : -4, scale: reduce ? 1 : 0.94, transition: { duration: 0.15, ease: EASE } }}
          transition={{ duration: 0.28, ease: EASE }}
          role="dialog"
          aria-label="Music player"
          className="fixed inset-x-4 top-20 z-[96] origin-top-right overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface-raised/95 shadow-[var(--shadow-lifted)] backdrop-blur-md sm:absolute sm:inset-x-auto sm:top-[calc(100%+0.65rem)] sm:right-0 sm:w-[19rem]"
        >
          {/* mac-style window controls — glyphs appear on hover, mac-like */}
          <div className="group/lights flex items-center gap-2 border-b border-border-subtle px-4 py-3">
            <button
              type="button"
              onClick={stop}
              aria-label="Stop music and close"
              title="Stop"
              className="flex size-3 items-center justify-center rounded-full bg-[#ff5f57] transition-transform duration-150 hover:scale-110"
            >
              <svg
                width="7"
                height="7"
                viewBox="0 0 8 8"
                fill="none"
                stroke="rgba(0,0,0,0.55)"
                strokeWidth="1.4"
                strokeLinecap="round"
                className="opacity-0 transition-opacity duration-150 group-hover/lights:opacity-100"
                aria-hidden="true"
              >
                <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setPanel("minimized")}
              aria-label="Minimize — music keeps playing"
              title="Minimize"
              className="flex size-3 items-center justify-center rounded-full bg-[#febc2e] transition-transform duration-150 hover:scale-110"
            >
              <svg
                width="7"
                height="7"
                viewBox="0 0 8 8"
                fill="none"
                stroke="rgba(0,0,0,0.55)"
                strokeWidth="1.4"
                strokeLinecap="round"
                className="opacity-0 transition-opacity duration-150 group-hover/lights:opacity-100"
                aria-hidden="true"
              >
                <path d="M1.5 6.5h5" />
              </svg>
            </button>
            <span className="ml-2 flex items-center gap-2 text-[0.72rem] font-medium text-text-muted">
              music
              {playback === "playing" && <Wave bars={3} />}
              {playback === "paused" && <span className="font-mono text-[0.62rem] uppercase tracking-[0.1em]">paused</span>}
            </span>
          </div>

          {/* now playing + progress */}
          <div className="px-4 pt-4 pb-3">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-text-muted mb-1">
              {playback === "paused" ? "paused" : "now playing"}
            </p>
            <p className="font-display text-[1.05rem] font-bold text-text-primary">{MUSIC_TRACKS[trackIndex].label}</p>
            {MUSIC_TRACKS[trackIndex].credit && (
              <p className="mt-0.5 font-mono text-[0.6rem] text-text-muted/80">{MUSIC_TRACKS[trackIndex].credit}</p>
            )}

            {/* progress bar */}
            <div className="mt-3">
              <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={Math.round(progress.duration)}
                aria-valuenow={Math.round(progress.current)}
                aria-label="Track progress"
                className="h-1 w-full overflow-hidden rounded-full bg-bg-elevated"
              >
                <div className="h-full rounded-full bg-accent transition-[width] duration-300 ease-linear" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-1 flex justify-between font-mono text-[0.6rem] text-text-muted">
                <span>{formatTime(progress.current)}</span>
                <span>{formatTime(progress.duration)}</span>
              </div>
            </div>

            <div className="mt-2.5 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => cycleTrack(-1)}
                aria-label="Previous track"
                title="Previous"
                className="flex size-9 items-center justify-center rounded-full text-text-muted transition-colors duration-150 hover:bg-bg-elevated hover:text-text-primary"
              >
                <svg width="13" height="13" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                  <path d="M9.5 1.5v9L3 6z" />
                  <rect x="1.5" y="1.5" width="1.6" height="9" rx="0.8" />
                </svg>
              </button>
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playback === "playing" ? "Pause" : "Play"}
                title={playback === "playing" ? "Pause" : "Play"}
                className="flex size-11 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[0_8px_20px_-8px_color-mix(in_srgb,var(--color-accent)_75%,transparent)] transition-transform duration-150 hover:scale-105 active:scale-95"
              >
                {playback === "playing" ? (
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                    <rect x="1.5" y="1" width="3" height="10" rx="1" />
                    <rect x="7.5" y="1" width="3" height="10" rx="1" />
                  </svg>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" style={{ marginLeft: 2 }}>
                    <path d="M2.5 1.2v9.6L10.5 6z" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                onClick={() => cycleTrack(1)}
                aria-label="Next track"
                title="Next"
                className="flex size-9 items-center justify-center rounded-full text-text-muted transition-colors duration-150 hover:bg-bg-elevated hover:text-text-primary"
              >
                <svg width="13" height="13" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                  <path d="M2.5 1.5v9L9 6z" />
                  <rect x="8.9" y="1.5" width="1.6" height="9" rx="0.8" />
                </svg>
              </button>
            </div>
          </div>

          {/* song picker — custom dropdown, scales with any playlist size */}
          <div className="border-t border-border-subtle p-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setListOpen((o) => !o)}
                aria-expanded={listOpen}
                aria-haspopup="listbox"
                aria-label="Choose track"
                className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-[calc(var(--radius-md)-4px)] border border-border bg-bg-elevated px-3.5 py-2.5 transition-colors duration-150 hover:border-accent"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-text-muted">
                    {trackIndex + 1}/{MUSIC_TRACKS.length}
                  </span>
                  <span className="truncate text-[0.82rem] font-semibold text-text-primary">{MUSIC_TRACKS[trackIndex].label}</span>
                </span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  aria-hidden="true"
                  className={`shrink-0 text-text-muted transition-transform duration-200 ${listOpen ? "rotate-180" : ""}`}
                >
                  <path d="M2 3.5 5 6.5 8 3.5" />
                </svg>
              </button>

              {listOpen && (
                <div
                  role="listbox"
                  aria-label="Tracks"
                  className="absolute inset-x-0 bottom-[calc(100%+0.4rem)] z-10 max-h-52 overflow-y-auto rounded-[var(--radius-md)] border border-border bg-surface-raised p-1.5 shadow-[var(--shadow-lifted)]"
                >
                  {MUSIC_TRACKS.map((t, i) => (
                    <button
                      key={t.src}
                      type="button"
                      role="option"
                      aria-selected={i === trackIndex}
                      onClick={() => {
                        selectTrack(i);
                        setListOpen(false);
                      }}
                      className={`flex w-full cursor-pointer items-center justify-between gap-4 rounded-[calc(var(--radius-md)-6px)] px-3 py-2 text-left text-[0.82rem] transition-colors duration-150 ${
                        i === trackIndex
                          ? "bg-accent-subtle font-semibold text-accent"
                          : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                      }`}
                    >
                      <span className="truncate">{t.label}</span>
                      {i === trackIndex && playback === "playing" && <Wave bars={3} />}
                      {i === trackIndex && playback === "paused" && <span className="font-mono text-[0.6rem] uppercase text-text-muted">paused</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* volume */}
          <div className="flex items-center gap-3 border-t border-border-subtle px-4 py-3">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-text-muted"
              aria-hidden="true"
            >
              <path d="M11 5 6 9H2v6h4l5 4z" />
            </svg>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
              aria-label="Volume"
              className="music-volume flex-1"
            />
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
