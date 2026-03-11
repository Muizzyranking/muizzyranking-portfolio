import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AnimatedLink from "@/components/ui/AnimatedLink";
import ProjectLinks from "@/components/ui/ProjectLinks";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.meta.title,
    description: project.meta.summary,
  };
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { meta, parsed } = project;

  return (
    <div style={{ paddingBlockStart: "clamp(6rem, 14vw, 10rem)", paddingBlockEnd: "8rem" }}>
      <div className="container-main">

        {/* Back link */}
        <AnimatedLink
          href="/projects"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: "var(--color-text-muted)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBlockEnd: "3rem",
          }}
        >
          ← Projects
        </AnimatedLink>

        {/* ── Hero header ── */}
        <div style={{ marginBlockEnd: "5rem" }}>

          {/* Accent rule */}
          <div style={{
            height: "1px",
            background: "linear-gradient(to right, var(--color-accent), var(--color-border), transparent)",
            marginBlockEnd: "2.5rem",
          }} />

          {/* Eyebrow */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBlockEnd: "1.5rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
          }}>
            <span style={{ color: "var(--color-text-muted)", opacity: 0.6, whiteSpace: "nowrap" }}>[ project ]</span>
            <span style={{
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: meta.status === "complete"
                ? "var(--color-success)"
                : meta.status === "in-progress"
                  ? "var(--color-accent)"
                  : "var(--color-text-muted)",
              padding: "0.2rem 0.6rem",
              border: `1px solid ${
                meta.status === "complete"
                  ? "var(--color-success)"
                  : meta.status === "in-progress"
                    ? "var(--color-accent-dim)"
                    : "var(--color-border)"
              }`,
              borderRadius: "var(--radius-sm)",
            }}>
              {meta.status}
            </span>
            <span style={{ color: "var(--color-text-muted)" }}>{meta.year}</span>
          </div>

          {/* Title */}
          <h1 style={{
            margin: "0 0 1.75rem",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "var(--color-accent)",
          }}>
            {meta.title}
          </h1>

          {/* Summary */}
          <p style={{
            fontSize: "1.05rem",
            color: "var(--color-text-primary)",
            lineHeight: 1.8,
            margin: "0 0 2rem",
            fontWeight: 500,
          }}>
            {meta.summary}
          </p>

          {/* Meta row — year, status, links inline */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            flexWrap: "wrap",
            marginBlockEnd: "2rem",
            paddingBlock: "1.25rem",
            borderTop: "1px solid var(--color-border-subtle)",
            borderBottom: "1px solid var(--color-border-subtle)",
          }}>
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-text-muted)", margin: "0 0 0.25rem" }}>Status</p>
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: meta.status === "complete"
                  ? "var(--color-success)"
                  : meta.status === "in-progress"
                    ? "var(--color-accent)"
                    : "var(--color-text-muted)",
                margin: 0,
                textTransform: "capitalize",
              }}>{meta.status}</p>
            </div>

            <div style={{ width: "1px", height: "2rem", backgroundColor: "var(--color-border-subtle)", flexShrink: 0 }} />

            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-text-muted)", margin: "0 0 0.25rem" }}>Links</p>
              <ProjectLinks repo={meta.repo} live={meta.live} />
            </div>
          </div>

          {/* Stack tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {meta.stack.map((tech) => (
              <span key={tech} style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
                backgroundColor: "var(--color-accent-subtle)",
                padding: "0.25rem 0.65rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--color-accent-dim)",
              }}>
                {tech}
              </span>
            ))}
          </div>

          {/* Bottom rule */}
          <div style={{
            marginBlockStart: "3rem",
            height: "1px",
            background: "linear-gradient(to right, var(--color-accent), var(--color-border-subtle), transparent)",
          }} />
        </div>

        {/* ── Overview ── */}
        {parsed.overview && (
          <div style={{ marginBlockEnd: "5rem" }}>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              margin: "0 0 2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}>
              <span style={{ color: "var(--color-accent)", opacity: 0.6, whiteSpace: "nowrap" }}>[ 01 ]</span>
              Overview
            </p>

            <div>
              {parsed.overview.split("\n\n").map((para, i) => (
                <p key={para} style={{
                  fontSize: "0.975rem",
                  color: i === 0 ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                  lineHeight: 1.9,
                  margin: 0,
                  marginBlockEnd: "1.25rem",
                }}>
                  {para.trim()}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* ── Challenges ── */}
        {parsed.challenges.length > 0 && (
          <div style={{ marginBlockEnd: "5rem" }}>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              margin: "0 0 0.6rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}>
              <span style={{ color: "var(--color-accent)", opacity: 0.6, whiteSpace: "nowrap" }}>[ 02 ]</span>
              Challenges
            </p>

            <h2 style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--color-text-primary)",
              margin: "0 0 2.5rem",
              lineHeight: 1.1,
            }}>
              What I had to figure out.
            </h2>

            <div>
              {parsed.challenges.map((challenge, i) => (
                <div key={challenge.title} style={{ position: "relative" }}>
                  <div style={{ height: "1px", backgroundColor: "var(--color-border-subtle)" }} />
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "4rem 1fr",
                    gap: "1.5rem",
                    paddingBlock: "2rem",
                    paddingInline: "1rem",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "1.6rem",
                      fontWeight: 700,
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                      color: "var(--color-border)",
                      userSelect: "none",
                      display: "block",
                      paddingTop: "0.15rem",
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 style={{
                        fontSize: "1.05rem",
                        fontWeight: 600,
                        color: "var(--color-text-primary)",
                        margin: "0 0 0.85rem",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.3,
                      }}>
                        {challenge.title}
                      </h3>
                      <div>
                        {challenge.body.split("\n\n").map((para, _) => (
                          <p key={para} style={{
                            fontSize: "0.9rem",
                            color: "var(--color-text-secondary)",
                            lineHeight: 1.9,
                            margin: 0,
                            marginBlockEnd: "0.75rem",
                          }}>
                            {para.trim()}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  {i === parsed.challenges.length - 1 && (
                    <div style={{
                      height: "1px",
                      background: "linear-gradient(to right, var(--color-accent), var(--color-border-subtle), transparent)",
                    }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── What I Learned ── */}
        {parsed.learned && (
          <div style={{
            padding: "2rem",
            backgroundColor: "var(--color-surface)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border-subtle)",
            position: "relative",
            overflow: "hidden",
            marginBlockEnd: "5rem",
          }}>
            <div style={{
              position: "absolute",
              top: 0,
              left: "2rem",
              right: "2rem",
              height: "1px",
              background: "linear-gradient(to right, var(--color-accent), transparent)",
            }} />
            <div style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "150px",
              height: "150px",
              background: "radial-gradient(circle at top right, color-mix(in srgb, var(--color-accent) 8%, transparent), transparent 70%)",
              pointerEvents: "none",
            }} />

            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              margin: "0 0 0.6rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}>
              <span style={{ color: "var(--color-accent)", opacity: 0.6, whiteSpace: "nowrap" }}>[ 03 ]</span>
              What I Learned
            </p>

            <h2 style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--color-text-primary)",
              margin: "0 0 1.75rem",
              lineHeight: 1.1,
            }}>
              What stuck.
            </h2>

            <div>
              {parsed.learned.split("\n\n").map((para, i) => (
                <p key={para} style={{
                  fontSize: "0.975rem",
                  color: i === 0 ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                  lineHeight: 1.9,
                  margin: 0,
                  marginBlockEnd: "1rem",
                }}>
                  {para.trim()}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* ── Bottom nav ── */}
        <div style={{
          paddingBlockStart: "2rem",
          borderTop: "1px solid var(--color-border-subtle)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <AnimatedLink
            href="/projects"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "var(--color-text-muted)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            ← All projects
          </AnimatedLink>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--color-text-muted)",
            opacity: 0.35,
          }}>
            {meta.year}
          </span>
        </div>

      </div>
    </div>
  );
}
