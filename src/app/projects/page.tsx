import type { Metadata } from "next";
import ProjectCard from "@/components/ui/ProjectCard";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I have built, systems I have designed, problems I have solved.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div style={{ paddingBlockStart: "clamp(6rem, 14vw, 10rem)", paddingBlockEnd: "8rem" }}>
      <div className="container-main">

        {/* Page header */}
        <div style={{ marginBlockEnd: "5rem" }}>

          {/* Accent rule */}
          <div style={{
            height: "1px",
            background: "linear-gradient(to right, var(--color-accent), var(--color-border), transparent)",
            marginBlockEnd: "2.5rem",
          }} />

          {/* Eyebrow */}
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
            margin: "0 0 1.75rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexWrap: "nowrap",
          }}>
            <span style={{ color: "var(--color-accent)", opacity: 0.6, whiteSpace: "nowrap" }}>[ work ]</span>
            All Projects
            <span style={{
              display: "inline-block",
              width: "32px",
              height: "1px",
              background: "var(--color-border)",
              verticalAlign: "middle",
              flexShrink: 0,
            }} />
            <span style={{ color: "var(--color-text-muted)", opacity: 0.5 }}>
              {projects.length} total
            </span>
          </p>

          {/* Title */}
          <h1 style={{
            margin: "0 0 1.75rem",
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
          }}>
            <span style={{ color: "var(--color-accent)", display: "block" }}>Projects</span>
          </h1>

          {/* Description */}
          <p style={{
            fontSize: "1.05rem",
            color: "var(--color-text-secondary)",
            margin: 0,
            maxWidth: "52ch",
            lineHeight: 1.8,
          }}>
            Things I have built, systems I have designed, problems I have
            solved. Mostly backend, mostly things nobody sees —
            <span style={{ color: "var(--color-text-primary)" }}> exactly how I like it.</span>
          </p>

          {/* Bottom rule */}
          <div style={{
            marginBlockStart: "3rem",
            height: "1px",
            background: "linear-gradient(to right, var(--color-accent), var(--color-border-subtle), transparent)",
          }} />
        </div>

        {/* Projects list */}
        {projects.length === 0 ? (
          <p style={{
            color: "var(--color-text-muted)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
          }}>
            <span style={{ color: "var(--color-accent)" }}>$</span> no projects found.
          </p>
        ) : (
          <div>
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
            <div style={{
              height: "1px",
              background: "linear-gradient(to right, var(--color-accent), var(--color-border-subtle), transparent)",
            }} />
          </div>
        )}

      </div>
    </div>
  );
}
