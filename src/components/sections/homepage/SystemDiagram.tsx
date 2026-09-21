"use client";

import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";

type StageKey = "plan" | "build" | "ship" | "run" | "watch" | "improve";

const STAGES: { key: StageKey; label: string; blurb: string }[] = [
  {
    key: "plan",
    label: "Plan",
    blurb:
      "I don't start until I know who this is for and what it actually needs to do — a couple of screens sketched out, an API contract written down, or an honest answer to whether the idea needs AI at all. Most don't.",
  },
  {
    key: "build",
    label: "Build",
    blurb:
      "The long part. One piece after another — an interface in Next.js and TypeScript, the machinery underneath in Django or FastAPI, an LLM call wrapped in real engineering when there's a model involved.",
  },
  {
    key: "ship",
    label: "Ship",
    blurb:
      "Getting something live shouldn't feel like a leap. Previews before production, a pipeline that does the same thing every time, migrations that roll back cleanly, prompts tested before a stranger meets them.",
  },
  {
    key: "run",
    label: "Run",
    blurb:
      "Once it's up it has to hold — through traffic, edge cases, a model that quietly changed underneath it. Caching what doesn't need recomputing, queues for the slow work, an eye kept on latency and cost.",
  },
  {
    key: "watch",
    label: "Watch",
    blurb:
      "I'd rather know before anyone has to tell me. Uptime and error alerts for the everyday stuff, and for anything AI-touched, a slower watch for drift — the ground keeps moving even when the code doesn't.",
  },
  {
    key: "improve",
    label: "Improve",
    blurb:
      "Then I look at it again, and it feeds straight back into the next plan. Feedback becomes the next small change, a slow endpoint gets profiled instead of forgiven, a model gets swapped once it's earned it.",
  },
];

// Six points evenly spaced on a circle: cx 200, cy 170, r 115 — starting at 12 o'clock, clockwise.
const NODES: [number, number][] = [
  [200, 55],
  [300, 113],
  [300, 228],
  [200, 285],
  [100, 228],
  [100, 113],
];
const LABELS: [number, number][] = [
  [200, 12],
  [337, 90],
  [337, 250],
  [200, 328],
  [63, 250],
  [63, 90],
];
const LABEL_ANCHOR: ("start" | "middle" | "end")[] = ["middle", "start", "start", "middle", "end", "end"];

// Full circle as a path, for the marker that travels it continuously.
const LOOP_PATH = "M 315 170 A 115 115 0 1 1 85 170 A 115 115 0 1 1 315 170";

/**
 * How a project actually moves — not a straight line from start to finish,
 * but a loop: the end of one cycle is the start of the next.
 */
export default function SystemDiagram() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const [selected, setSelected] = useState<StageKey>("plan");

  const assembled = inView || reduce;
  const activeIndex = STAGES.findIndex((s) => s.key === selected);
  const active = STAGES[activeIndex];

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: reduce ? 0 : 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
      className="card relative overflow-hidden p-6 sm:p-7"
    >
      {/* bordeaux wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 size-56 rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(closest-side, var(--color-accent-bright), transparent)" }}
      />

      <p className="mb-5 max-w-[46ch] text-[0.95rem] leading-relaxed text-text-secondary">
        Building isn't really a straight line — it loops. The same six stages, and the end of one cycle is the start
        of the next.
      </p>

      <div className="relative mx-auto max-w-[380px]">
        <svg viewBox="0 0 400 340" className="w-full" role="img" aria-label="A loop of six stages a project cycles through. Click any stage for details.">
          {/* the loop, drawn once on scroll into view */}
          <m.circle
            cx={200}
            cy={170}
            r={115}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={1.5}
            strokeDasharray="2 7"
            initial={{ pathLength: reduce ? 1 : 0, opacity: reduce ? 0.6 : 0 }}
            animate={assembled ? { pathLength: 1, opacity: 0.6 } : {}}
            transition={{ duration: 1.4, ease: EASE }}
          />

          {/* a marker that never stops moving around it */}
          {!reduce && assembled && (
            <circle r={4.5} fill="var(--color-accent)" opacity={0.85}>
              <animateMotion dur="10s" repeatCount="indefinite" path={LOOP_PATH} />
            </circle>
          )}

          {/* stages */}
          {STAGES.map((s, i) => {
            const [x, y] = NODES[i];
            const [lx, ly] = LABELS[i];
            const isActive = selected === s.key;
            return (
              // biome-ignore lint/a11y/useSemanticElements: SVG diagram node can't be a real <button>; keyboard support attached
              <m.g
                key={s.key}
                onClick={() => setSelected(s.key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(s.key);
                  }
                }}
                className="cursor-pointer"
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                aria-label={`${s.label} — show details`}
                initial={{ opacity: 0, scale: reduce ? 1 : 0.5 }}
                animate={assembled ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, ease: EASE, delay: reduce ? 0 : 0.2 + i * 0.09 }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={22}
                  data-cursor
                  fill={isActive ? "var(--color-accent)" : "var(--color-surface-raised)"}
                  stroke={isActive ? "var(--color-accent)" : "var(--color-border)"}
                  strokeWidth={isActive ? 2 : 1.5}
                  style={{ transition: "fill 200ms ease, stroke 200ms ease" }}
                />
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="var(--font-mono)"
                  fontSize={11}
                  fontWeight={600}
                  fill={isActive ? "var(--color-accent-foreground)" : "var(--color-text-secondary)"}
                  pointerEvents="none"
                  style={{ transition: "fill 200ms ease" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
                <text
                  x={lx}
                  y={ly}
                  textAnchor={LABEL_ANCHOR[i]}
                  dominantBaseline="middle"
                  fontFamily="var(--font-display)"
                  fontSize={13}
                  fontWeight={600}
                  fill={isActive ? "var(--color-accent)" : "var(--color-text-muted)"}
                  pointerEvents="none"
                  style={{ transition: "fill 200ms ease" }}
                >
                  {s.label}
                </text>
              </m.g>
            );
          })}
        </svg>

        {/* center readout — sits over the middle of the loop regardless of scale */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-16 text-center">
          <AnimatePresence mode="wait">
            <m.p
              key={active.key}
              initial={{ opacity: 0, y: reduce ? 0 : 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -4 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="font-mono text-[0.7rem] tracking-wide text-text-muted"
            >
              stage {String(activeIndex + 1).padStart(2, "0")} of {STAGES.length}
            </m.p>
          </AnimatePresence>
        </div>
      </div>

      {/* detail — every stage stacked in one grid cell so switching never shifts height */}
      <div className="mt-5 grid">
        {STAGES.map((s) => {
          const isActive = selected === s.key;
          return (
            <div
              key={s.key}
              data-active={isActive}
              aria-hidden={!isActive}
              className="[grid-area:1/1] rounded-[var(--radius-md)] border border-border bg-bg-elevated p-4 transition-[opacity,transform,visibility] duration-300 data-[active=false]:pointer-events-none data-[active=false]:invisible data-[active=false]:translate-y-1.5 data-[active=false]:opacity-0 data-[active=true]:visible data-[active=true]:translate-y-0 data-[active=true]:opacity-100"
            >
              <p className="font-display text-[0.98rem] leading-tight font-bold text-text-primary">{s.label}</p>
              <p className="mt-1.5 text-[0.85rem] leading-relaxed text-text-secondary">{s.blurb}</p>
            </div>
          );
        })}
      </div>
    </m.div>
  );
}
