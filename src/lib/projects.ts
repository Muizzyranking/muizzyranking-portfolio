import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Challenge, Project, ProjectContent } from "@/types";

const projectsDir = path.join(process.cwd(), "content/projects");

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDir)) return [];

  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(projectsDir, filename), "utf8");
      const { data } = matter(raw);

      return {
        slug,
        title: data.title ?? "",
        summary: data.summary ?? "",
        status: data.status ?? "complete",
        year: data.year ?? "",
        stack: data.stack ?? [],
        repo: data.repo ?? "",
        live: data.live ?? "",
        featured: data.featured ?? false,
      } as Project;
    })
    .sort((a, b) => Number(b.year) - Number(a.year));
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): {
  meta: Project;
  content: string;
  parsed: ProjectContent;
} | null {
  const filepath = path.join(projectsDir, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return null;

  const raw = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      title: data.title ?? "",
      summary: data.summary ?? "",
      status: data.status ?? "complete",
      year: data.year ?? "",
      stack: data.stack ?? [],
      repo: data.repo ?? "",
      live: data.live ?? "",
      featured: data.featured ?? false,
    },
    content,
    parsed: parseProjectContent(content),
  };
}

export function parseProjectContent(raw: string): ProjectContent {
  const overviewMatch = raw.match(/##\s+Overview\s*([\s\S]*?)(?=##|$)/i);
  const learnedMatch = raw.match(/##\s+What I Learned\s*([\s\S]*?)(?=##|$)/i);
  const challengesBlock = raw.match(/##\s+Challenges\s*([\s\S]*?)(?=## What I Learned|$)/i);

  const overview = overviewMatch ? overviewMatch[1].trim() : "";
  const learned = learnedMatch ? learnedMatch[1].trim() : "";

  const challenges: Challenge[] = [];
  if (challengesBlock) {
    const challengeMatches = challengesBlock[1].matchAll(/###\s+(.+?)\n([\s\S]*?)(?=###|$)/g);
    for (const match of challengeMatches) {
      challenges.push({
        title: match[1].trim(),
        body: match[2].trim(),
      });
    }
  }

  return { overview, challenges, learned };
}
