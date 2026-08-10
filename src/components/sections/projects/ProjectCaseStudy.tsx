import Image from "next/image";
import Link from "next/link";
import ProjectCard from "@/components/sections/projects/ProjectCard";
import ProjectMdx from "@/components/sections/projects/ProjectMdx";
import ProjectSection from "@/components/sections/projects/ProjectSection";
import type { Project, ProjectContent } from "@/types";

const STATUS_LABEL: Record<Project["status"], { label: string; dot: string }> = {
  complete: { label: "complete", dot: "bg-success" },
  "in-progress": { label: "in progress", dot: "bg-accent" },
  archived: { label: "archived", dot: "bg-text-muted" },
};

const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const ICONS: Record<"overview" | "challenges" | "screenshots" | "outcomes" | "lessons", React.ReactNode> = {
  overview: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  challenges: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  screenshots: (
    <svg {...iconProps} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  ),
  outcomes: (
    <svg {...iconProps} aria-hidden="true">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  lessons: (
    <svg {...iconProps} aria-hidden="true">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2Z" />
    </svg>
  ),
};

export default function ProjectCaseStudy({
  meta,
  parsed,
  related,
  prev,
  next,
}: {
  meta: Project;
  parsed: ProjectContent;
  related: Project[];
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
      <header className="container-main pt-[clamp(5rem,10vw,8rem)] pb-[clamp(2.5rem,5vw,4rem)] border-b border-border-subtle">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.08em] text-text-muted uppercase mb-8 hover:text-text-primary"
        >
          <span className="transition-transform duration-150 ease-out group-hover:-translate-x-1" aria-hidden="true">
            ←
          </span>
          all projects
        </Link>

        <h1 className="font-display font-bold tracking-[-0.02em] leading-[1.06] text-[clamp(2.1rem,5vw,3.5rem)] text-text-primary mb-5 max-w-[24ch]">
          {meta.title}
        </h1>

        <p className="text-text-secondary text-[clamp(1rem,1.8vw,1.15rem)] leading-[1.65] max-w-[62ch] mb-8">{meta.summary}</p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[0.72rem] tracking-[0.06em] text-text-muted">
          <span className="flex items-center gap-2">
            <span className={`inline-block size-1.5 rounded-full ${status.dot}`} aria-hidden="true" />
            {status.label}
          </span>
          <span aria-hidden="true" className="opacity-40">
            ·
          </span>
          <span>{meta.year}</span>
          {meta.role && (
            <>
              <span aria-hidden="true" className="opacity-40">
                ·
              </span>
              <span>{meta.role}</span>
            </>
          )}
          <span aria-hidden="true" className="hidden sm:inline opacity-40">
            ·
          </span>
          <span className="hidden sm:flex items-center gap-4 ml-auto">
            {meta.live && (
              <a href={meta.live} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-150">
                live site ↗
              </a>
            )}
            {meta.repo && (
              <a href={meta.repo} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-150">
                source ↗
              </a>
            )}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-6">
          {meta.stack.map((s) => (
            <span key={s} className="font-mono text-[0.68rem] text-text-muted bg-surface border border-border-subtle rounded-sm px-2 py-[0.2rem]">
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 sm:hidden mt-6">
          {meta.live && (
            <a href={meta.live} target="_blank" rel="noopener noreferrer" className="text-accent font-mono text-[0.72rem] hover:text-accent-dim">
              live site ↗
            </a>
          )}
          {meta.repo && (
            <a href={meta.repo} target="_blank" rel="noopener noreferrer" className="text-accent font-mono text-[0.72rem] hover:text-accent-dim">
              source ↗
            </a>
          )}
        </div>
      </header>

      <div className="py-[clamp(2.5rem,5vw,4rem)] pb-[clamp(3.5rem,7vw,6rem)]">
        <div className="container-main">
          <ProjectSection index={nextIndex()} label="Overview" icon={ICONS.overview}>
            <div className="rounded-lg border border-border bg-bg-elevated px-[clamp(1.25rem,3vw,2.75rem)] py-[clamp(1.5rem,3.5vw,3rem)]">
              <ProjectMdx source={parsed.overview} />
            </div>
          </ProjectSection>

          {screenshots.length > 0 && (
            <ProjectSection index={nextIndex()} label="Screenshots" icon={ICONS.screenshots}>
              <div className="grid gap-6 overflow-x-clip md:grid-cols-2">
                {screenshots.map((src, i) => (
                  <figure
                    key={src}
                    className="relative overflow-hidden rounded-lg border border-border bg-bg-elevated"
                    style={{ aspectRatio: "16 / 10" }}
                  >
                    <Image
                      src={src}
                      alt={`${meta.title} screenshot ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                      quality={90}
                    />
                  </figure>
                ))}
              </div>
            </ProjectSection>
          )}

          {hasChallenges && (
            <ProjectSection index={nextIndex()} label="Engineering challenges" icon={ICONS.challenges}>
              <div className="grid gap-4 overflow-x-clip md:grid-cols-2">
                {parsed.challenges.map((challenge, i) => (
                  <div key={challenge.title} className="flex min-w-0 flex-col rounded-lg border border-border bg-bg-elevated p-7">
                    <span className="font-mono text-[0.7rem] tracking-[0.08em] text-accent mb-4">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-display font-semibold tracking-[-0.01em] leading-[1.3] text-text-primary text-[1.125rem] mb-3">
                      {challenge.title}
                    </h3>
                    <div className="project-challenge-body">
                      <ProjectMdx source={challenge.body} />
                    </div>
                  </div>
                ))}
              </div>
            </ProjectSection>
          )}

          {parsed.outcomes.trim() && (
            <ProjectSection index={nextIndex()} label="Outcomes" icon={ICONS.outcomes}>
              <ProjectMdx source={parsed.outcomes} />
            </ProjectSection>
          )}

          {parsed.learned.trim() && (
            <ProjectSection index={nextIndex()} label="Lessons learned" icon={ICONS.lessons}>
              <ProjectMdx source={parsed.learned} />
            </ProjectSection>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="section section-band border-t border-border-subtle">
          <div className="container-main">
            <div className="flex items-baseline justify-between gap-4 mb-8">
              <h2 className="font-display font-semibold tracking-[-0.015em] leading-[1.15] text-text-primary text-[clamp(1.4rem,2.6vw,1.9rem)]">
                Related projects
              </h2>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 font-mono text-[0.75rem] tracking-[0.08em] text-accent uppercase"
              >
                All projects
                <span className="transition-transform duration-150 ease-out group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 overflow-x-clip">
              {related.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {(prev || next) && (
        <nav className="container-main py-[clamp(2.5rem,5vw,4rem)] border-t border-border-subtle" aria-label="Project navigation">
          <div className="flex items-stretch justify-between gap-6 flex-wrap">
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                className="group flex-1 min-w-[16rem] rounded-lg border border-border p-6 transition-colors duration-150 hover:border-accent-dim"
              >
                <span className="block font-mono text-[0.65rem] uppercase tracking-[0.1em] text-text-muted mb-3">← previous</span>
                <span className="block font-display font-semibold text-[1.05rem] text-text-primary leading-[1.3] group-hover:text-accent transition-colors duration-150">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span className="flex-1 min-w-[16rem] hidden md:block" />
            )}

            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="group flex-1 min-w-[16rem] rounded-lg border border-border p-6 text-right transition-colors duration-150 hover:border-accent-dim"
              >
                <span className="block font-mono text-[0.65rem] uppercase tracking-[0.1em] text-text-muted mb-3">next →</span>
                <span className="block font-display font-semibold text-[1.05rem] text-text-primary leading-[1.3] group-hover:text-accent transition-colors duration-150">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span className="flex-1 min-w-[16rem] hidden md:block" />
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
