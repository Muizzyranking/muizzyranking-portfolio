"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";

type StageKey = "plan" | "build" | "ship" | "run" | "watch" | "improve";

/** Hand-simplified 24×24 icon paths — rendered directly so stroke color/thickness stays fully controlled. */
const ICON_PATHS: Record<StageKey, string> = {
  plan: "M12 21s7-7.58 7-12a7 7 0 1 0-14 0c0 4.42 7 12 7 12zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", // trailhead marker
  build: "M3 18l4-5 3 3 5-8 6 6", // the climb — rough ascending line
  ship: "M2 20 8 9l3 4 4-6 7 13z", // summit
  run: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z", // camp — flame
  watch: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", // lookout — eye
  improve: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM15.5 8.5 13 13l-4.5 2.5L11 11z", // compass
};

function StageIcon({ stage, size = 20, strokeWidth = 2 }: { stage: StageKey; size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ICON_PATHS[stage]} />
    </svg>
  );
}

const STAGES: { key: StageKey; label: string; blurb: string }[] = [
  {
    key: "plan",
    label: "Trailhead",
    blurb:
      "Before I take a step I want to know who this is for and what it actually has to do — a couple of screens sketched out, an API contract written down, or just an honest answer to whether the idea needs AI at all. Most don't.",
  },
  {
    key: "build",
    label: "The climb",
    blurb:
      "The long stretch. Head down, one piece after another — an interface in Next.js and TypeScript, the machinery underneath in Django or FastAPI, an LLM call wrapped in real engineering when there's a model involved. Most of the time actually goes here.",
  },
  {
    key: "ship",
    label: "Summit",
    blurb:
      "Getting something live shouldn't feel like a leap. Previews before production, a pipeline that does the same thing every time, migrations that roll back cleanly, prompts tested before a stranger meets them.",
  },
  {
    key: "run",
    label: "Camp",
    blurb:
      "Once it's up it has to hold — through traffic, edge cases, a model that quietly changed underneath it. Caching what doesn't need recomputing, queues for the slow work, an eye kept on latency and cost.",
  },
  {
    key: "watch",
    label: "Lookout",
    blurb:
      "I'd rather know before anyone has to tell me. Uptime and error alerts for the everyday stuff, and for anything AI-touched, a slower watch for drift — the ground keeps moving even when the code doesn't.",
  },
  {
    key: "improve",
    label: "Compass",
    blurb:
      "Then back to the map. Feedback becomes the next small change, a slow endpoint gets profiled instead of forgiven, a model gets swapped once it's earned it. Somewhere close by, the next trailhead's already waiting.",
  },
];

/** Station coordinates following a rough elevation profile — up to a summit, a rest, a smaller rise, then down again. */
const STATION_X = [50, 140, 230, 320, 410, 495];
const STATION_Y = [235, 155, 65, 160, 110, 200];

const MAIN_PATH =
  "M 50 235 C 80 225 110 175 140 155 C 170 135 200 85 230 65 C 260 95 290 140 320 160 C 350 175 380 120 410 110 C 435 140 465 185 495 200";
const NEXT_RIDGE = "M 495 200 C 515 190 530 170 545 150";

// Decorative, low-opacity mountain silhouettes — purely ambient, sit behind the trail.
const RIDGE_BACK = "M0 260 L80 190 L160 230 L260 150 L340 210 L430 170 L510 220 L550 200 L550 300 L0 300 Z";
const RIDGE_FRONT = "M0 280 L100 220 L200 260 L300 190 L400 240 L500 210 L550 240 L550 300 L0 300 Z";

/**
 * "The route" — one honest version of how I build, start to finish, told as a
 * hike rather than a pipeline. Click any stop along the trail.
 */
export default function SystemDiagram() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const [selected, setSelected] = useState<StageKey | null>(null);

  const assembled = inView || reduce;
  const select = (key: StageKey) => setSelected((s) => (s === key ? null : key));

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
        Every project follows roughly the same route: a plan, a long climb, a push to get it live, then keeping it
        standing while I watch the weather. Click any stop along the way.
      </p>

      <svg
        viewBox="0 0 550 300"
        className="system-diagram w-full"
        role="img"
        aria-label="A trail from trailhead to summit and back down, representing how a project gets built. Click any stop for details."
      >
        {/* ambient terrain */}
        <m.path
          d={RIDGE_BACK}
          fill="var(--color-border)"
          initial={{ opacity: 0 }}
          animate={assembled ? { opacity: 0.12 } : {}}
          transition={{ duration: 0.8, delay: reduce ? 0 : 0.1 }}
        />
        <m.path
          d={RIDGE_FRONT}
          fill="var(--color-accent)"
          initial={{ opacity: 0 }}
          animate={assembled ? { opacity: 0.06 } : {}}
          transition={{ duration: 0.8, delay: reduce ? 0 : 0.2 }}
        />

        {/* quiet hint that the trail keeps going past this one */}
        <m.path
          d={NEXT_RIDGE}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={1.5}
          strokeDasharray="2 8"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={assembled ? { opacity: 0.5 } : {}}
          transition={{ duration: 0.6, delay: reduce ? 0 : 1.6 }}
        />

        {/* the trail itself, drawn once, start to finish */}
        <m.path
          d={MAIN_PATH}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={2}
          strokeDasharray="1 7"
          strokeLinecap="round"
          opacity={0.75}
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={assembled ? { pathLength: 1 } : {}}
          transition={{ duration: 1.6, ease: EASE }}
        />

        {/* someone walking it */}
        {!reduce && assembled && (
          <circle r={5} fill="var(--color-accent)" opacity={0.9}>
            <animateMotion dur="9s" repeatCount="indefinite" path={MAIN_PATH} />
          </circle>
        )}

        {/* stops */}
        {STAGES.map((s, i) => {
          const x = STATION_X[i];
          const y = STATION_Y[i];
          const active = selected === s.key;
          return (
            // biome-ignore lint/a11y/useSemanticElements: SVG diagram node can't be a real <button>; keyboard support attached
            <m.g
              key={s.key}
              onClick={() => select(s.key)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  select(s.key);
                }
              }}
              className="cursor-pointer"
              tabIndex={0}
              role="button"
              aria-pressed={active}
              aria-label={`${s.label} — show details`}
              initial={{ opacity: 0, scale: reduce ? 1 : 0.4 }}
              animate={assembled ? { opacity: selected && !active ? 0.55 : 1, scale: 1 } : {}}
              transition={{ duration: 0.45, ease: EASE, delay: reduce ? 0 : 0.25 + i * 0.14 }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            >
              <circle
                cx={x}
                cy={y}
                r={27}
                data-cursor
                fill={active ? "var(--color-accent)" : "var(--color-surface-raised)"}
                stroke={active ? "var(--color-accent)" : "var(--color-border)"}
                strokeWidth={active ? 2 : 1.5}
                style={{ transition: "fill 200ms ease, stroke 200ms ease" }}
              />
              <g
                transform={`translate(${x} ${y}) scale(1.15) translate(-12 -12)`}
                stroke={active ? "var(--color-accent-foreground)" : "var(--color-text-secondary)"}
                fill="none"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                pointerEvents="none"
                style={{ transition: "stroke 200ms ease" }}
              >
                <path d={ICON_PATHS[s.key]} />
              </g>
              <text
                x={x}
                y={y + 46}
                textAnchor="middle"
                fontFamily="var(--font-display)"
                fontSize={12.5}
                fontWeight={600}
                fill={active ? "var(--color-accent)" : "var(--color-text-muted)"}
                pointerEvents="none"
                style={{ transition: "fill 200ms ease" }}
              >
                {s.label}
              </text>
            </m.g>
          );
        })}
      </svg>

      {/* detail card — every stage stacked in one grid cell so switching never shifts height */}
      <div className="mt-1.5 grid">
        {STAGES.map((s) => {
          const active = selected === s.key;
          return (
            <div
              key={s.key}
              data-active={active}
              aria-hidden={!active}
              className="[grid-area:1/1] rounded-[var(--radius-md)] border border-border bg-bg-elevated p-4 transition-[opacity,transform,visibility] duration-300 data-[active=false]:pointer-events-none data-[active=false]:invisible data-[active=false]:translate-y-1.5 data-[active=false]:opacity-0 data-[active=true]:visible data-[active=true]:translate-y-0 data-[active=true]:opacity-100"
            >
              <div className="flex items-start gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-subtle text-accent">
                  <StageIcon stage={s.key} size={20} strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-[0.98rem] leading-tight font-bold text-text-primary">{s.label}</p>
                  <p className="mt-1 text-[0.83rem] leading-relaxed text-text-secondary">{s.blurb}</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* idle hint — stacked too, so it never affects height */}
        <div
          data-active={selected === null}
          aria-hidden={selected !== null}
          className="[grid-area:1/1] flex items-center justify-center rounded-[var(--radius-md)] border border-dashed border-border px-6 py-8 text-center text-[0.85rem] leading-relaxed text-text-muted transition-[opacity,visibility] duration-300 data-[active=false]:pointer-events-none data-[active=false]:invisible data-[active=false]:opacity-0 data-[active=true]:visible data-[active=true]:opacity-100"
        >
          Click any stop on the trail to see what actually happens there.
        </div>
      </div>
    </m.div>
  );
}
