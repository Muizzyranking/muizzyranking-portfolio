import type { CSSProperties } from "react";

export type Challenge = {
  title: string;
  body: string;
};

export type ProjectContent = {
  overview: string;
  challenges: Challenge[];
  learned: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  status: "complete" | "in-progress" | "archived";
  year: string;
  datePublished: string;
  stack: string[];
  repo: string;
  live: string;
  featured: boolean;
  draft: boolean;
};

export type Experience = {
  company: string;
  role: string;
  type: string;
  location: string;
  period: {
    start: string;
    end: string;
  };
  summary: string;
  highlights: string[];
  stack: string[];
};

export type AnimatedLinkProps = {
  href: string;
  style?: CSSProperties;
  children: React.ReactNode;
};

export type ExperienceProps = {
  exp: Experience;
};

export type ProjectDetailsProps = {
  meta: Project;
  parsed: ProjectContent;
};

export type ProjectLinksProps = {
  repo: string;
  live: string;
};

export type ProjectGridProps = {
  projects: Project[];
  stats: { total: number; complete: number; inProgress: number };
};

export type PostMeta = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  publishedAtIso: string;
  year: number;
  month: number;
  day: number;
  categories: Category[];
  readingTime: { text: string; minutes: number; words: number };
  filepath: string;
};

export type TocItem = {
  level: 2 | 3;
  text: string;
  id: string;
};

export type Category = {
  slug: string;
  label: string;
};

export type Post = PostMeta & {
  body: string;
  toc: TocItem[];
};

export type RawPost = {
  meta: PostMeta;
  body: string;
  toc: TocItem[];
  publishedDate: Date;
  draft: boolean;
};

export type Milestone = {
  year: string;
  title: string;
  body: string;
  tag: string;
  current?: boolean;
};
