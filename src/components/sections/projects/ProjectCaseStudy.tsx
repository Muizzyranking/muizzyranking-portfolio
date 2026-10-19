import Link from "next/link";
import ProjectMdx from "@/components/sections/projects/ProjectMdx";
import ProjectSection from "@/components/sections/projects/ProjectSection";
import ScreenshotGallery from "@/components/sections/projects/ScreenshotGallery";
import type { Project, ProjectContent } from "@/types";

const STATUS_LABEL: Record<Project["status"], { label: string; dot: string }> = {
  complete: { label: "complete", dot: "bg-success" },
  "in-progress": { label: "in progress", dot: "bg-accent" },
  archived: { label: "archived", dot: "bg-text-muted" },
};

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

function toRoman(n: number): string {
  return ROMAN[n - 1] ?? String(n);
}

export default function ProjectCaseStudy({
  meta,
  parsed,
  prev,
  next,
}: {
  meta: Project;
  parsed: ProjectContent;
  prev?: Project | null;
  next?: Project | null;
}) {
  const status = STATUS_LABEL[meta.status];
  const screenshots = meta.screenshots ?? [];
  const hasChallenges = parsed.challenges.length > 0;

  let sectionIndex = 1;
  const nextIndex = () => String(sectionIndex++).padStart(2, "0");

  return (
    <>
      {/* Header */}
      <header className="container-main pt-[clamp(7rem,13vw,10rem)] pb-[clamp(2.5rem,5vw,4rem)]">
        <div className="mb-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-border-subtle pb-5">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-mono text-[0.74rem] lowercase text-text-muted transition-colors duration-150 hover:text-accent"
          >
            <span className="transition-transform duration-200 ease-out group-hover:-translate-x-1" aria-hidden="true">
              ←
            </span>
            all projects
          </Link>
          <p className="font-mono text-[0.7rem] text-text-muted">case study · {meta.year}</p>
        </div>

        <h1 className="mb-5 max-w-[26ch] font-display text-[clamp(2.2rem,5vw,3.7rem)] leading-[1.05] tracking-[-0.03em] text-text-primary">
          {meta.title}
        </h1>
        {meta.summary && <p className="max-w-[62ch] text-[1.02rem] leading-[1.7] text-text-secondary">{meta.summary}</p>}
      </header>

      {/* Body grid: content + sticky meta rail */}
      <div className="container-main grid gap-x-12 gap-y-12 pb-[clamp(3rem,6vw,5rem)] lg:grid-cols-[minmax(0,1fr)_16rem]">
        {/* Main column */}
        <div className="min-w-0 lg:order-1">
          <ProjectSection index={nextIndex()} label="Overview">
            <ProjectMdx source={parsed.overview} />
          </ProjectSection>

          {screenshots.length > 0 && (
            <ProjectSection index={nextIndex()} label="Screenshots">
              <ScreenshotGallery screenshots={screenshots} title={meta.title} />
            </ProjectSection>
          )}

          {hasChallenges && (
            <ProjectSection index={nextIndex()} label="Engineering challenges">
              <ol className="flex flex-col gap-9">
                {parsed.challenges.map((challenge, i) => (
                  <li key={challenge.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-4">
                    <span aria-hidden="true" className="font-mono text-[0.72rem] font-medium text-accent">
                      {toRoman(i + 1)}
                    </span>
                    <div className="min-w-0">
                      <h3 className="mb-3 font-display text-[1.15rem] leading-[1.3] font-semibold tracking-[-0.01em] text-text-primary">
                        {challenge.title}
                      </h3>
                      <div className="project-challenge-body">
                        <ProjectMdx source={challenge.body} />
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </ProjectSection>
          )}

          {parsed.outcomes.trim() && (
            <ProjectSection index={nextIndex()} label="Outcomes">
              <ProjectMdx source={parsed.outcomes} />
            </ProjectSection>
          )}

          {parsed.learned.trim() && (
            <ProjectSection index={nextIndex()} label="Lessons learned">
              <ProjectMdx source={parsed.learned} />
            </ProjectSection>
          )}
        </div>

        {/* Meta rail — a definition sheet, not cards */}
        <aside
          className="flex flex-row flex-wrap gap-x-8 gap-y-6 lg:order-2 lg:sticky lg:top-24 lg:self-start lg:flex-col"
          aria-label="Project details"
        >
          <dl className="flex-1 min-w-[14rem] divide-y divide-border-subtle border-y border-border-subtle text-[0.84rem] lg:min-w-0">
            <div className="flex items-baseline justify-between gap-4 py-3">
              <dt className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-text-muted">status</dt>
              <dd className="inline-flex items-center gap-2 font-mono text-[0.74rem] text-text-primary">
                <span className={`inline-block size-[6px] rounded-full ${status.dot}`} aria-hidden="true" />
                {status.label}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-3">
              <dt className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-text-muted">year</dt>
              <dd className="font-mono text-[0.78rem] text-text-primary">{meta.year}</dd>
            </div>
            {meta.role && (
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
                <dt className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-text-muted">role</dt>
                <dd className="max-w-[14rem] text-right font-mono text-[0.74rem] leading-[1.45] text-text-primary">{meta.role}</dd>
              </div>
            )}
          </dl>

          <div className="flex-1 min-w-[14rem] lg:min-w-0">
            <p className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-text-muted">built with</p>
            <p className="font-mono text-[0.76rem] leading-[1.9] text-text-secondary">{meta.stack.join(" · ")}</p>
          </div>

          {(meta.live || meta.repo) && (
            <div className="flex flex-1 flex-col gap-2.5 min-w-[14rem] lg:min-w-0">
              {meta.live && (
                <a href={meta.live} target="_blank" rel="noopener noreferrer" className="btn btn--primary w-full !py-2 !text-[0.8rem]">
                  live site <span aria-hidden="true">↗</span>
                </a>
              )}
              {meta.repo && (
                <a href={meta.repo} target="_blank" rel="noopener noreferrer" className="btn btn--ghost w-full !py-2 !text-[0.8rem]">
                  source code <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          )}
        </aside>
      </div>

      {(prev || next) && (
        <nav className="border-t border-border-subtle" aria-label="Project navigation">
          <div className="container-main grid gap-8 py-12 sm:grid-cols-2">
            {prev ? (
              <Link href={`/projects/${prev.slug}`} className="group min-w-0">
                <span className="mb-2 block font-mono text-[0.68rem] lowercase text-text-muted transition-colors duration-150 group-hover:text-accent">
                  ← previous
                </span>
                <span className="block font-display text-[1.05rem] font-semibold leading-[1.3] text-text-primary transition-colors duration-200 group-hover:text-accent">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}

            {next ? (
              <Link href={`/projects/${next.slug}`} className="group min-w-0 sm:text-right">
                <span className="mb-2 block font-mono text-[0.68rem] lowercase text-text-muted transition-colors duration-150 group-hover:text-accent">
                  next →
                </span>
                <span className="block font-display text-[1.05rem] font-semibold leading-[1.3] text-text-primary transition-colors duration-200 group-hover:text-accent">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
          </div>
        </nav>
      )}

      <style>{`
        .project-challenge-body > div > *:last-child,
        .project-challenge-body p:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </>
  );
}
