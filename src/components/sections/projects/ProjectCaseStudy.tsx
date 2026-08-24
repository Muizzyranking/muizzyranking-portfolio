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

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

function toRoman(n: number): string {
  return ROMAN[n - 1] ?? String(n);
}

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
  const splash = screenshots[0];
  const gallery = screenshots.slice(1);
  const hasChallenges = parsed.challenges.length > 0;

  let sectionIndex = 1;
  const nextIndex = () => String(sectionIndex++).padStart(2, "0");

  return (
    <>
      {/* Header */}
      <header className="container-main pt-[clamp(5rem,10vw,8rem)] pb-[clamp(2.5rem,5vw,4rem)]">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 font-mono text-[0.75rem] font-semibold tracking-[0.08em] text-text-muted uppercase mb-9 ml-[1.85rem] transition-colors duration-150 hover:text-accent"
        >
          <span className="transition-transform duration-150 ease-out group-hover:-translate-x-1" aria-hidden="true">
            ←
          </span>
          all projects
        </Link>

        <p className="eyebrow mb-5">case study</p>
        <h1 className="font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.03em] font-extrabold text-text-primary mb-5 max-w-[24ch]">
          {meta.title}
        </h1>
        <p className="text-text-secondary text-[clamp(1rem,1.8vw,1.2rem)] leading-[1.65] max-w-[62ch]">{meta.summary}</p>
      </header>

      {/* Body grid: content + sticky meta rail */}
      <div className="container-main grid gap-x-12 gap-y-10 pb-[clamp(3rem,6vw,5rem)] lg:grid-cols-[minmax(0,1fr)_17rem]">
        {/* Meta rail — sticky on desktop, inline cards on mobile */}
        <aside className="lg:order-2 lg:sticky lg:top-24 lg:self-start flex flex-row flex-wrap lg:flex-col gap-4" aria-label="Project details">
          <div className="card flex-1 p-5 min-w-[14rem] lg:min-w-0">
            <p className="eyebrow mb-3">status</p>
            <p className="flex items-center gap-2 text-[0.9rem] font-semibold text-text-primary">
              <span className={`inline-block size-2 rounded-full ${status.dot}`} aria-hidden="true" />
              {status.label}
            </p>
            <dl className="mt-4 flex flex-col gap-2 text-[0.82rem]">
              <div className="flex justify-between gap-4">
                <dt className="text-text-muted">Year</dt>
                <dd className="font-mono font-semibold text-text-primary">{meta.year}</dd>
              </div>
              {meta.role && (
                <div className="flex justify-between gap-4">
                  <dt className="text-text-muted">Role</dt>
                  <dd className="font-mono font-semibold text-text-primary text-right">{meta.role}</dd>
                </div>
              )}
            </dl>
          </div>

          {(meta.live || meta.repo) && (
            <div className="card flex-1 p-5 min-w-[14rem] lg:min-w-0">
              <p className="eyebrow mb-3">explore</p>
              <div className="flex flex-col gap-2.5">
                {meta.live && (
                  <a href={meta.live} target="_blank" rel="noopener noreferrer" className="btn btn--primary w-full !py-2.5 !text-[0.85rem]">
                    live site <span aria-hidden="true">↗</span>
                  </a>
                )}
                {meta.repo && (
                  <a href={meta.repo} target="_blank" rel="noopener noreferrer" className="btn btn--ghost w-full !py-2.5 !text-[0.85rem]">
                    source code <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="card flex-1 p-5 min-w-[14rem] lg:min-w-0">
            <p className="eyebrow mb-3">built with</p>
            <div className="flex flex-wrap gap-1.5">
              {meta.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* Main column */}
        <div className="min-w-0 lg:order-1">
          {splash && (
            <div
              className="relative mb-4 overflow-hidden rounded-[var(--radius-xl)] border border-border shadow-[var(--shadow-lifted)]"
              style={{ aspectRatio: "16 / 9" }}
            >
              <Image
                src={splash}
                alt={`${meta.title} splash`}
                fill
                priority
                sizes="(min-width: 1024px) 800px, 100vw"
                className="object-cover"
                quality={90}
              />
            </div>
          )}

          <ProjectSection index={nextIndex()} label="Overview">
            <div className="card px-[clamp(1.25rem,3vw,2.75rem)] py-[clamp(1.5rem,3.5vw,2.75rem)]">
              <ProjectMdx source={parsed.overview} />
            </div>
          </ProjectSection>

          {gallery.length > 0 && (
            <ProjectSection index={nextIndex()} label="Screenshots">
              <div className="grid gap-5 overflow-x-clip sm:grid-cols-2">
                {gallery.map((src, i) => (
                  <figure
                    key={src}
                    className="relative overflow-hidden rounded-[var(--radius-lg)] border border-border shadow-[var(--shadow-soft)]"
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
            <ProjectSection index={nextIndex()} label="Engineering challenges">
              <ol className="relative flex flex-col gap-8 pl-10">
                {/* timeline rail */}
                <span aria-hidden="true" className="absolute top-2 bottom-2 left-[1.05rem] w-px bg-border" />
                {parsed.challenges.map((challenge, i) => (
                  <li key={challenge.title} className="relative">
                    {/* roman numeral node on the rail */}
                    <span
                      aria-hidden="true"
                      className="absolute -left-10 top-0 flex size-[2.1rem] items-center justify-center rounded-full border border-accent/40 bg-surface-raised font-mono text-[0.7rem] font-semibold text-accent"
                    >
                      {toRoman(i + 1)}
                    </span>
                    <div className="card p-7">
                      <h3 className="font-display text-[1.2rem] leading-[1.3] font-bold tracking-[-0.01em] text-text-primary mb-3">
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
              <div className="card px-[clamp(1.25rem,3vw,2.5rem)] py-[clamp(1.5rem,3vw,2.5rem)]">
                <ProjectMdx source={parsed.outcomes} />
              </div>
            </ProjectSection>
          )}

          {parsed.learned.trim() && (
            <ProjectSection index={nextIndex()} label="Lessons learned">
              <div className="rounded-[var(--radius-lg)] border border-accent/25 bg-accent-subtle px-[clamp(1.25rem,3vw,2.5rem)] py-[clamp(1.5rem,3vw,2.5rem)]">
                <ProjectMdx source={parsed.learned} />
              </div>
            </ProjectSection>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="section section-band">
          <div className="container-main">
            <div className="flex items-baseline justify-between gap-4 mb-8">
              <h2 className="font-display text-[clamp(1.4rem,2.6vw,1.9rem)] leading-tight font-bold tracking-[-0.02em] text-text-primary">
                Related projects
              </h2>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 font-mono text-[0.75rem] font-semibold tracking-[0.08em] text-accent uppercase"
              >
                All projects
                <span className="transition-transform duration-150 ease-out group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 overflow-x-clip">
              {related.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {(prev || next) && (
        <nav className="container-main py-[clamp(2.5rem,5vw,4rem)] border-t border-border-subtle" aria-label="Project navigation">
          <div className="flex items-stretch justify-between gap-4 flex-wrap">
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                className="group flex-1 min-w-[16rem] card p-6 transition-[border-color,box-shadow] duration-200 hover:border-accent/40 hover:shadow-[var(--shadow-lifted)]"
              >
                <span className="block font-mono text-[0.65rem] uppercase tracking-[0.1em] text-text-muted mb-3">← previous</span>
                <span className="block font-display font-semibold text-[1.05rem] text-text-primary leading-[1.3] transition-colors duration-150 group-hover:text-accent">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span className="flex-1 min-w-[16rem] hidden md:block" />
            )}

            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="group flex-1 min-w-[16rem] card p-6 text-right transition-[border-color,box-shadow] duration-200 hover:border-accent/40 hover:shadow-[var(--shadow-lifted)]"
              >
                <span className="block font-mono text-[0.65rem] uppercase tracking-[0.1em] text-text-muted mb-3">next →</span>
                <span className="block font-display font-semibold text-[1.05rem] text-text-primary leading-[1.3] transition-colors duration-150 group-hover:text-accent">
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
