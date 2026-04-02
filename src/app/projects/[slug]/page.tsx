import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ui/ProjectDetails";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: `${project.meta.title} — Muiz Oyebowale`,
    description: project.meta.summary,
    openGraph: {
      title: project.meta.title,
      description: project.meta.summary,
    },
  };
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return <ProjectDetail meta={project.meta} parsed={project.parsed} />;
}
