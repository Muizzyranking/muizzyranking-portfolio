import AnimatedLink from "@/components/ui/AnimatedLink";
import ProjectCard from "@/components/ui/ProjectCard";
import { getFeaturedProjects } from "@/lib/projects";

const MAX_FEATURED_PROJECTS = 3;

export default function FeaturedProjects() {
  const projects = getFeaturedProjects().slice(0, MAX_FEATURED_PROJECTS);

  return (
    <section className="section">
      <div className="container-main">

        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBlockEnd: "3rem",
          }}
        >
          <div>
            <p
              className="mono-label"
              style={{
                marginBlockEnd: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ color: "var(--color-accent)", opacity: 0.6 }}>[ 02 ]</span>
              Selected Work
            </p>
            <h2 style={{ margin: 0 }}>Projects</h2>
          </div>

          <AnimatedLink
            href="/projects"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              color: "var(--color-accent)",
              letterSpacing: "0.04em",
              transition: "opacity 0.2s ease",
              whiteSpace: "nowrap",
              marginBlockEnd: "0.25rem",
            }}
          >
            View all ({MAX_FEATURED_PROJECTS}+) →
          </AnimatedLink>
        </div>

        {/* Project grid */}
        {projects.length === 0 ? (
          <p style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
            <span style={{ color: "var(--color-accent)" }}>$</span> no projects found.
          </p>
        ) : (
          <div>
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
            <div
              style={{
                height: "1px",
                background: "linear-gradient(to right, var(--color-accent), var(--color-border-subtle), transparent)",
              }}
            />
          </div>
        )}

      </div>
    </section>
  );
}
