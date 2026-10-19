import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { extractToc } from "@/lib/mdx";
import type { Challenge, Project, ProjectContent, TocItem } from "@/types";

const projectsDir = path.join(process.cwd(), "content/projects");

export type ProjectRecord = {
  meta: Project;
  content: string;
  toc: TocItem[];
  parsed: ProjectContent;
};

function readProjectMeta(filename: string): Project {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(projectsDir, filename), "utf8");
  const { data } = matter(raw);

  return {
    slug,
    title: data.title ?? "",
    summary: data.summary ?? "",
    status: data.status ?? "complete",
    year: data.year ?? "",
    datePublished: data.datePublished ?? "",
    stack: data.stack ?? [],
    role: data.role ?? "",
    repo: data.repo ?? "",
    live: data.live ?? "",
    screenshots: Array.isArray(data.screenshots) ? data.screenshots.filter((s): s is string => typeof s === "string") : [],
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
  };
}

export function listAllProjectsForEditor(): Project[] {
  if (!fs.existsSync(projectsDir)) return [];
  return fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".mdx"))
    .map(readProjectMeta)
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

export function getAllProjects(): Project[] {
  return listAllProjectsForEditor().filter((p) => !p.draft);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectBySlugIncludingDrafts(slug: string): ProjectRecord | null {
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
      datePublished: data.datePublished ?? "",
      stack: data.stack ?? [],
      role: data.role ?? "",
      repo: data.repo ?? "",
      live: data.live ?? "",
      screenshots: Array.isArray(data.screenshots) ? data.screenshots.filter((s): s is string => typeof s === "string") : [],
      featured: Boolean(data.featured),
      draft: Boolean(data.draft),
    },
    content,
    toc: extractToc(content),
    parsed: parseProjectContent(content),
  };
}

export function getProjectBySlug(slug: string): ProjectRecord | null {
  const found = getProjectBySlugIncludingDrafts(slug);
  if (!found || found.meta.draft) return null;
  return found;
}

export function getRelatedProjects(slug: string, limit = 3): Project[] {
  const current = getProjectBySlug(slug);
  if (!current) return [];

  const currentStack = new Set(current.meta.stack.map((s) => s.toLowerCase()));
  return getAllProjects()
    .filter((p) => p.slug !== slug)
    .map((p) => ({ p, overlap: p.stack.filter((s) => currentStack.has(s.toLowerCase())).length }))
    .filter((x) => x.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap || b.p.datePublished.localeCompare(a.p.datePublished))
    .slice(0, limit)
    .map((x) => x.p);
}

export function getPrevNextProject(slug: string): { prev: Project | null; next: Project | null } {
  const projects = getAllProjects().sort((a, b) => a.datePublished.localeCompare(b.datePublished));
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: projects[index - 1] ?? null,
    next: projects[index + 1] ?? null,
  };
}

export function getProjectStackList(): string[] {
  const counts = new Map<string, number>();
  for (const p of getAllProjects()) {
    for (const s of p.stack) {
      counts.set(s, (counts.get(s) ?? 0) + 1);
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([s]) => s);
}

export function parseProjectContent(raw: string): ProjectContent {
  const overviewMatch = raw.match(/##\s+Overview\s*([\s\S]*?)(?=\n##\s+[A-Za-z]|$)/i);
  const learnedMatch = raw.match(/##\s+(?:What I Learned|Lessons Learned)\s*([\s\S]*?)(?=\n##\s+[A-Za-z]|$)/i);
  const outcomesMatch = raw.match(/##\s+(?:Outcomes|Impact)\s*([\s\S]*?)(?=\n##\s+[A-Za-z]|$)/i);
  const challengesBlock = raw.match(/##\s+(?:Engineering\s+)?Challenges\s*([\s\S]*?)(?=\n##\s+[A-Za-z]|$)/i);

  const overview = overviewMatch ? overviewMatch[1].trim() : "";
  const learned = learnedMatch ? learnedMatch[1].trim() : "";
  const outcomes = outcomesMatch ? outcomesMatch[1].trim() : "";

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

  return { overview, challenges, outcomes, learned };
}
