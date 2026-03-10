import AnimatedLink from "@/components/ui/AnimatedLink";
import ProjectCard from "@/components/ui/ProjectCard";
import { getFeaturedProjects } from "@/lib/projects";

export default function FeaturedProjects() {
  const projects = getFeaturedProjects();

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
            <p className="mono-label" style={{ marginBlockEnd: "0.5rem" }}>
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
            View all →
          </AnimatedLink>
        </div>

        {/* Project grid */}
        {projects.length === 0 ? (
          <p style={{ color: "var(--color-text-muted)" }}>No projects yet.</p>
        ) : (
          <div>
            {projects.slice(0, 3).map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
            {/* Bottom divider */}
            <div
              style={{
                height: "1px",
                backgroundColor: "var(--color-border-subtle)",
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
