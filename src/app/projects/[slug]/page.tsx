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
    <div
      style={{
        paddingBlockStart: "clamp(6rem, 14vw, 10rem)",
        paddingBlockEnd: "6rem",
      }}
    >
      <div className="container-main">
        {/* Back */}
        <AnimatedLink
          href="/projects"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--color-text-muted)",
            letterSpacing: "0.06em",
            marginBlockEnd: "3rem",
          }}
        >
          ← Projects
        </AnimatedLink>

        {/* Header */}
        <div
          style={{
            marginBlockEnd: "4rem",
            paddingBlockEnd: "3rem",
            borderBottom: "1px solid var(--color-border-subtle)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBlockEnd: "1.25rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color:
                  meta.status === "complete"
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
              }}
            >
              {meta.status}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--color-text-muted)",
              }}
            >
              {meta.year}
            </span>
          </div>

          <h1
            style={{
              margin: 0,
              marginBlockEnd: "1.25rem",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            {meta.title}
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--color-text-secondary)",
              margin: 0,
              lineHeight: 1.8,
              marginBlockEnd: "2rem",
              maxWidth: "100%",
            }}
          >
            {meta.summary}
          </p>

          {/* Stack */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBlockEnd: "2rem",
            }}
          >
            {meta.stack.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.06em",
                  color: "var(--color-accent)",
                  backgroundColor: "var(--color-accent-subtle)",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--color-accent-dim)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <ProjectLinks repo={meta.repo} live={meta.live} />
        </div>

        {/* Overview */}
        {parsed.overview && (
          <div style={{ marginBlockEnd: "5rem" }}>
            <p
              className="mono-label"
              style={{
                marginBlockEnd: "1.25rem",
                fontSize: "clamp(1.4rem, 3vw, 2.5rem)",
                fontWeight: 700,
              }}
            >
              Overview
            </p>
            {parsed.overview.split("\n\n").map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: "0.975rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.9,
                  marginBlock: 0,
                  marginBlockEnd: "1.25rem",
                  maxWidth: "100%",
                }}
              >
                {para.trim()}
              </p>
            ))}
          </div>
        )}

        {/* Challenges */}
        {parsed.challenges.length > 0 && (
          <div style={{ marginBlockEnd: "5rem" }}>
            <p
              className="mono-label"
              style={{
                marginBlockEnd: "2rem",
                fontSize: "clamp(1.4rem, 3vw, 2.5rem)",
                fontWeight: 700,
              }}
            >
              Challenges
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0",
              }}
            >
              {parsed.challenges.map((challenge, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2.5rem 1fr",
                    gap: "1.5rem",
                    paddingBlock: "2rem",
                    borderTop: "1px solid var(--color-border-subtle)",
                    borderBottom:
                      i === parsed.challenges.length - 1
                        ? "1px solid var(--color-border-subtle)"
                        : "none",
                  }}
                >
                  {/* Number */}
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      color: "var(--color-accent)",
                      letterSpacing: "0.08em",
                      paddingTop: "0.2rem",
                      userSelect: "none",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "var(--color-text-primary)",
                        margin: 0,
                        marginBlockEnd: "0.75rem",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.4,
                      }}
                    >
                      {challenge.title}
                    </h3>

                    {challenge.body.split("\n\n").map((para, j) => (
                      <p
                        key={j}
                        style={{
                          fontSize: "0.9rem",
                          color: "var(--color-text-secondary)",
                          lineHeight: 1.9,
                          margin: 0,
                          marginBlockEnd: "0.75rem",
                          width: "100%",
                          maxWidth: "100%",
                        }}
                      >
                        {para.trim()}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What I Learned */}
        {parsed.learned && (
          <div
            style={{
              padding: "2rem",
              backgroundColor: "var(--color-surface)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border-subtle)",
              position: "relative",
              overflow: "hidden",
              marginBlockEnd: "5rem",
            }}
          >
            {/* top accent line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "2rem",
                right: "2rem",
                height: "1px",
                background:
                  "linear-gradient(to right, var(--color-accent), transparent)",
              }}
            />

            <p
              className="mono-label"
              style={{
                marginBlockEnd: "1.25rem",
                color: "var(--color-accent)",
                fontSize: "clamp(1.4rem, 3vw, 2.5rem)",
                fontWeight: 700,
              }}
            >
              What I Learned
            </p>

            {parsed.learned.split("\n\n").map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: "0.975rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.9,
                  margin: 0,
                  marginBlockEnd: "1rem",
                  width: "100%",
                  maxWidth: "100%",
                }}
              >
                {para.trim()}
              </p>
            ))}
          </div>
        )}

        {/* Bottom nav */}
        <div
          style={{
            paddingBlockStart: "2rem",
            borderTop: "1px solid var(--color-border-subtle)",
          }}
        >
          <AnimatedLink
            href="/projects"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--color-text-muted)",
              letterSpacing: "0.06em",
            }}
          >
            ← Back to all projects
          </AnimatedLink>
        </div>
      </div>
    </div>
  );
}
