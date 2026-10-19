export type PostFrontmatterInput = {
  title: string;
  summary?: string;
  day: number;
  time?: string;
  categories?: string[];
  draft?: boolean;
  slug?: string;
  inject?: Record<string, string>;
};

export function buildPostFrontmatter(fm: PostFrontmatterInput, canonicalSlug: string): Record<string, unknown> {
  const out: Record<string, unknown> = {
    title: fm.title.trim(),
    day: fm.day,
  };
  if (fm.time && fm.time !== "08:00") out.time = fm.time;
  if (fm.summary?.trim()) out.summary = fm.summary.trim();
  if (fm.categories && fm.categories.length > 0) out.categories = fm.categories;
  if (fm.draft) out.draft = true;
  if (fm.slug?.trim() && fm.slug.trim() !== canonicalSlug) out.slug = fm.slug.trim();
  if (fm.inject && Object.keys(fm.inject).length > 0) out.inject = fm.inject;
  return out;
}

export type ProjectFrontmatterInput = {
  title: string;
  summary?: string;
  status: "complete" | "in-progress" | "archived";
  year: string;
  stack?: string[];
  repo?: string;
  live?: string;
  screenshots?: string[];
  featured?: boolean;
  draft?: boolean;
};

export function buildProjectFrontmatter(fm: ProjectFrontmatterInput): Record<string, unknown> {
  const out: Record<string, unknown> = {
    title: fm.title.trim(),
    summary: fm.summary?.trim() ?? "",
    status: fm.status,
    year: fm.year,
    stack: fm.stack ?? [],
    repo: fm.repo ?? "",
    live: fm.live ?? "",
    featured: Boolean(fm.featured),
  };
  if (fm.screenshots && fm.screenshots.length > 0) out.screenshots = fm.screenshots;
  if (fm.draft) out.draft = true;
  return out;
}

export type ProjectParsed = {
  overview: string;
  challenges: { title: string; body: string }[];
  outcomes: string;
  learned: string;
};

export function assembleProjectBody(p: ProjectParsed): string {
  const parts: string[] = [];
  parts.push("## Overview", "", p.overview.trim(), "");

  parts.push("## Engineering Challenges", "");
  for (const c of p.challenges) {
    parts.push(`### ${c.title.trim()}`, "", c.body.trim(), "");
  }

  if (p.outcomes.trim()) {
    parts.push("## Outcomes", "", p.outcomes.trim(), "");
  }

  parts.push("## Lessons Learned", "", p.learned.trim(), "");

  return `${parts
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()}\n`;
}
