import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectCaseStudy from "@/components/sections/projects/ProjectCaseStudy";
import ReadingProgress from "@/components/ui/ReadingProgress";
import { getAllProjects, getPrevNextProject, getProjectBySlug, getRelatedProjects } from "@/lib/projects";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return { title: "Project not found" };

  const url = `${site.url}/projects/${project.meta.slug}`;
  return {
    title: project.meta.title,
    description: project.meta.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: project.meta.title,
      description: project.meta.summary,
      url,
      publishedTime: project.meta.datePublished,
      authors: ["Muiz Oyebowale"],
      tags: project.meta.stack,
    },
    twitter: {
      card: "summary_large_image",
      title: project.meta.title,
      description: project.meta.summary,
      creator: "@muizzyranking",
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <>
      <ReadingProgress />
      <ProjectCaseStudy
        meta={project.meta}
        parsed={project.parsed}
        related={getRelatedProjects(slug)}
        prev={getPrevNextProject(slug).prev}
        next={getPrevNextProject(slug).next}
      />
    </>
  );
}
