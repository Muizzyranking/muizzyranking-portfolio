import { getAllProjects } from "@/lib/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I have built, systems I have designed, problems I have solved.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div style={{ paddingBlockStart: "clamp(6rem, 14vw, 10rem)" }}>
      <div className="container-main">

        {/* Page header */}
        <div
          style={{
            marginBlockEnd: "4rem",
            paddingBlockEnd: "3rem",
            borderBottom: "1px solid var(--color-border-subtle)",
          }}
        >
          <p className="mono-label" style={{ marginBlockEnd: "0.75rem" }}>
            Work
          </p>
          <h1
            style={{
              margin: 0,
              marginBlockEnd: "1rem",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
            }}
          >
            Projects
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--color-text-secondary)",
              margin: 0,
              maxWidth: "48ch",
              lineHeight: 1.7,
            }}
          >
            Things I have built, systems I have designed, problems I have
            solved. Mostly backend, mostly things nobody sees, exactly how I
            like it.
          </p>
        </div>

        {/* Projects list */}
        {projects.length === 0 ? (
          <p style={{ color: "var(--color-text-muted)" }}>No projects yet.</p>
        ) : (
          <div>
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
            <div
              style={{
                height: "1px",
                backgroundColor: "var(--color-border-subtle)",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
