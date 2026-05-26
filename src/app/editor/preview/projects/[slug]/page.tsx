import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ui/ProjectDetails";
import { getProjectBySlugIncludingDrafts } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export default async function ProjectPreviewPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlugIncludingDrafts(slug);
  if (!project) notFound();

  return (
    <>
      <div
        style={{
          position: "sticky",
          top: "4rem",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "0.7rem 1.25rem",
          background: "var(--color-bg-elevated)",
          borderBottom: "1px solid var(--color-border-subtle)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.72rem",
        }}
      >
        <Link
          href={`/editor/projects/${slug}`}
          style={{ color: "var(--color-accent)", textDecoration: "none" }}
        >
          ← back to editor
        </Link>
        <span style={{ color: "var(--color-text-muted)", opacity: 0.5 }}>·</span>
        <span style={{ color: "var(--color-text-muted)" }}>preview · {slug}</span>
      </div>

      <ProjectDetail meta={project.meta} parsed={project.parsed} />
    </>
  );
}
