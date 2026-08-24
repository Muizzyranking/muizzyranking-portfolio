"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";

type StageKey = "plan" | "build" | "ship" | "run" | "watch" | "improve";
type BuildType = "web" | "api" | "ai";

const BUILD_TYPES: { key: BuildType; label: string; article: string }[] = [
  { key: "web", label: "Web app", article: "a web app" },
  { key: "api", label: "Backend API", article: "a backend API" },
  { key: "ai", label: "AI feature", article: "an AI feature" },
];

/** Raw 24×24 icon paths — rendered directly so stroke color/thickness is fully controlled. */
const ICON_PATHS: Record<StageKey, string> = {
  plan: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM15.5 8.5 13 13l-4.5 2.5L11 11z",
  build: "M8 6 2 12l6 6M16 6l6 6-6 6",
  ship: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22 22 0 0 1-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",
  run: "M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zM2 16a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zM6 6.5h.01M6 17.5h.01",
  watch: "M22 12h-4l-3 9L9 3l-3 9H2",
  improve: "M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6",
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

const STAGES: {
  key: StageKey;
  label: string;
  desc: Record<BuildType, string>;
  chips: Record<BuildType, string[]>;
}[] = [
  {
    key: "plan",
    label: "Planning",
    desc: {
      web: "I figure out who it's for and what it must do. Pages, flows, scope — decided before code.",
      api: "Contracts first. Endpoints, schema, what can fail. If the design is wrong here, everything after is wrong too.",
      ai: "I check the data and whether the problem actually needs AI. Most don't. The ones that do get planned properly.",
    },
    chips: {
      web: ["User flows", "Wireframes", "Scope"],
      api: ["Contracts", "Schema", "SLAs"],
      ai: ["Data check", "Feasibility", "Risks"],
    },
  },
  {
    key: "build",
    label: "Building",
    desc: {
      web: "The interface: pages, components, state. TypeScript so the frontend tells me when I'm being silly.",
      api: "The main act. Django or FastAPI, clean endpoints, business logic that reads the same way it runs.",
      ai: "LLM calls wrapped in real engineering — retrieval, fallbacks, structure. Not a prompt pasted into a route.",
    },
    chips: {
      web: ["Next.js", "React", "TypeScript"],
      api: ["Django", "FastAPI", "DRF"],
      ai: ["LLM APIs", "RAG", "Evals"],
    },
  },
  {
    key: "ship",
    label: "Shipping",
    desc: {
      web: "Previews, CI, then Vercel. If deploying is scary, something upstream is wrong.",
      api: "Docker, migrations that roll back cleanly, pipelines that do the same thing every time.",
      ai: "Guardrails, versioned prompts, fallbacks. New model versions get tested before users meet them.",
    },
    chips: {
      web: ["Vercel", "CI", "Previews"],
      api: ["Docker", "GitHub Actions", "Migrations"],
      ai: ["Guardrails", "Versioning", "Fallbacks"],
    },
  },
  {
    key: "run",
    label: "Running",
    desc: {
      web: "Cached, measured, and fast where it counts. The site just loads.",
      api: "Servers behind Nginx, queues doing the slow work. Calm under pressure.",
      ai: "Latency and cost watched per call. Caching answers that don't change.",
    },
    chips: {
      web: ["Vercel", "CDN", "Cache"],
      api: ["Nginx", "Gunicorn", "Celery"],
      ai: ["Latency", "Cost", "Caching"],
    },
  },
  {
    key: "watch",
    label: "Watching",
    desc: {
      web: "Analytics and uptime checks. If a page breaks, I know before anyone emails me.",
      api: "Metrics and alerts on the things that matter — errors, latency, queue depth.",
      ai: "Output quality, drift, usage. Models change, so the checks never stop.",
    },
    chips: {
      web: ["Analytics", "Logs", "Uptime"],
      api: ["Metrics", "Alerts", "Traces"],
      ai: ["Quality", "Drift", "Usage"],
    },
  },
  {
    key: "improve",
    label: "Improving",
    desc: {
      web: "Feedback turns into the next iteration. Small changes, shipped often.",
      api: "Profiling, tuning, refactors. Slow endpoints get fixed, not forgiven.",
      ai: "Better prompts, better data, new models when they earn it.",
    },
    chips: {
      web: ["A/B tests", "Feedback", "Iteration"],
      api: ["Profiling", "Tuning", "Refactors"],
      ai: ["Prompts", "Fine-tuning", "New models"],
    },
  },
];

/** Station coordinates on the S-curve (static, rounded — hydration-safe). */
const STATION_X = [60, 146, 232, 318, 404, 490];
const STATION_Y = [110, 210, 110, 210, 110, 210];

const MAIN_PATH =
  "M 60 110 C 104 110 102 210 146 210 C 190 210 188 110 232 110 C 276 110 274 210 318 210 C 362 210 360 110 404 110 C 448 110 446 210 490 210";
const LOOP_PATH = "M 490 210 C 552 52 28 52 58 102";

/**
 * "From idea to uptime" — how I build, beginning to end, for different kinds
 * of software. Pick what's being built, click any stage of the path.
 */
export default function SystemDiagram() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const [type, setType] = useState<BuildType>("api");
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

      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="eyebrow">how I build</p>
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-text-muted/70">pick a build · click a stage</p>
      </div>

      {/* things to build — each one changes the whole journey */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {BUILD_TYPES.map((t) => {
          const active = type === t.key;
          return (
            <m.button
              key={t.key}
              type="button"
              onClick={() => setType(t.key)}
              aria-pressed={active}
              animate={{ scale: active ? 1.07 : 1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.25, ease: EASE }}
              className={`cursor-pointer rounded-full px-3.5 py-1.5 font-mono text-[0.7rem] font-semibold transition-colors duration-150 ${
                active
                  ? "bg-accent text-accent-foreground shadow-[0_6px_16px_-8px_color-mix(in_srgb,var(--color-accent)_70%,transparent)]"
                  : "border border-border bg-surface-raised text-text-secondary hover:border-accent hover:text-accent"
              }`}
            >
              {t.label}
            </m.button>
          );
        })}
      </div>

      <svg
        viewBox="0 0 550 298"
        className="system-diagram w-full"
        role="img"
        aria-label="Build journey from planning to improving. Pick a software type and click any stage to see how it gets built."
      >
        {/* return loop — the end feeds the beginning */}
        <m.path
          d={LOOP_PATH}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={1.5}
          strokeDasharray="2 8"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={assembled ? { opacity: 0.6 } : {}}
          transition={{ duration: 0.6, delay: reduce ? 0 : 1.7 }}
        />
        <m.text
          x={272}
          y={34}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize={9.5}
          letterSpacing={1}
          fill="var(--color-text-muted)"
          opacity={0.75}
          initial={{ opacity: 0 }}
          animate={assembled ? { opacity: 0.75 } : {}}
          transition={{ duration: 0.6, delay: reduce ? 0 : 1.9 }}
        >
          …THEN IT STARTS AGAIN
        </m.text>

        {/* the journey path draws itself, beginning to end */}
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

        {/* orbiting packet — keyed by build type so switching restarts the journey */}
        {!reduce && assembled && (
          <circle key={type} r={5} fill="var(--color-accent)" opacity={0.9}>
            <animateMotion dur="8s" repeatCount="indefinite" path={MAIN_PATH} />
          </circle>
        )}

        {/* stations */}
        {STAGES.map((s, i) => {
          const x = STATION_X[i];
          const y = STATION_Y[i];
          const active = selected === s.key;
          const labelAbove = y > 150;
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
                style={{
                  transition: "fill 200ms ease, stroke 200ms ease",
                  // same glow the active build-type pill gets
                  boxShadow: active ? "0 6px 16px -8px color-mix(in srgb, var(--color-accent) 70%, transparent)" : "none",
                }}
              />
              {/* icon drawn directly on the path: centered via translate(-12,-12), thicker stroke, inherits the right color */}
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
                y={labelAbove ? y - 40 : y + 50}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize={11.5}
                fontWeight={600}
                letterSpacing={0.8}
                fill={active ? "var(--color-accent)" : "var(--color-text-muted)"}
                pointerEvents="none"
                style={{ transition: "fill 200ms ease" }}
              >
                {s.label.toUpperCase()}
              </text>
              {/* type-specific caption — visible proof the build type changed */}
              <m.text
                key={`${s.key}-${type}`}
                x={x}
                y={labelAbove ? y - 24 : y + 66}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize={9}
                letterSpacing={0.4}
                fill="var(--color-accent)"
                opacity={0.85}
                initial={reduce ? { opacity: 0.85 } : { opacity: 0, y: labelAbove ? y - 21 : y + 63 }}
                animate={{ opacity: 0.85, y: labelAbove ? y - 24 : y + 66 }}
                transition={{ duration: 0.3, ease: EASE }}
                pointerEvents="none"
              >
                {s.chips[type][0].toUpperCase()}
              </m.text>
              {/* start / end markers */}
              {i === 0 && (
                <text
                  x={x}
                  y={labelAbove ? y - 74 : y + 84}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize={8.5}
                  letterSpacing={1.2}
                  fill="var(--color-text-muted)"
                  opacity={0.6}
                  pointerEvents="none"
                >
                  BEGINNING
                </text>
              )}
              {i === STAGES.length - 1 && (
                <text
                  x={x}
                  y={labelAbove ? y - 74 : y + 84}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize={8.5}
                  letterSpacing={1.2}
                  fill="var(--color-text-muted)"
                  opacity={0.6}
                  pointerEvents="none"
                >
                  …AND AGAIN
                </text>
              )}
            </m.g>
          );
        })}
      </svg>

      {/* detail card — every variant stacked in one grid cell: the container is
          always the tallest card, so switching stages or types never shifts */}
      <div className="mt-1.5 grid">
        {STAGES.map((s) =>
          BUILD_TYPES.map((t) => {
            const active = selected === s.key && type === t.key;
            return (
              <div
                key={`${s.key}-${t.key}`}
                data-active={active}
                aria-hidden={!active}
                className="[grid-area:1/1] rounded-[var(--radius-md)] border border-border bg-bg-elevated p-4 transition-[opacity,transform,visibility] duration-300 data-[active=false]:pointer-events-none data-[active=false]:invisible data-[active=false]:translate-y-1.5 data-[active=false]:opacity-0 data-[active=true]:visible data-[active=true]:translate-y-0 data-[active=true]:opacity-100"
              >
                <div className="flex items-start gap-3.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-subtle text-accent">
                    <StageIcon stage={s.key} size={20} strokeWidth={2} />
                  </span>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-baseline gap-x-2 font-display text-[0.98rem] leading-tight font-bold text-text-primary">
                      {s.label}
                      <span className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.1em] text-text-muted">for {t.article}</span>
                    </p>
                    <p className="mt-1 text-[0.83rem] leading-relaxed text-text-secondary">{s.desc[t.key]}</p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {s.chips[t.key].map((chip) => (
                        <span key={chip} className="chip !text-[0.68rem]">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          }),
        )}

        {/* idle hint — stacked too, so it never affects height */}
        <div
          data-active={selected === null}
          aria-hidden={selected !== null}
          className="[grid-area:1/1] flex items-center justify-center rounded-[var(--radius-md)] border border-dashed border-border px-6 py-8 text-center text-[0.85rem] leading-relaxed text-text-muted transition-[opacity,visibility] duration-300 data-[active=false]:pointer-events-none data-[active=false]:invisible data-[active=false]:opacity-0 data-[active=true]:visible data-[active=true]:opacity-100"
        >
          Pick what&rsquo;s being built, then click any stage of the journey to see how it gets done.
        </div>
      </div>
    </m.div>
  );
}
