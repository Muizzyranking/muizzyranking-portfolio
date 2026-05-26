import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import yaml from "js-yaml";
import readingTime from "reading-time";
import type { Category, Post, PostMeta, RawPost, TocItem } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const INJECTIONS_FILE = path.join(BLOG_DIR, "_injections.yml");
const OFFSET = "+01:00";

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[''"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function labelizeCategory(slug: string): string {
  return slug
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

let cachedGlobalInjections: Record<string, string> | null = null;

function loadGlobalInjections(): Record<string, string> {
  if (cachedGlobalInjections) return cachedGlobalInjections;
  if (!fs.existsSync(INJECTIONS_FILE)) {
    cachedGlobalInjections = {};
    return cachedGlobalInjections;
  }
  const raw = fs.readFileSync(INJECTIONS_FILE, "utf8");
  const parsed = (yaml.load(raw) as Record<string, unknown> | null) ?? {};
  const flat: Record<string, string> = {};
  for (const [k, v] of Object.entries(parsed)) {
    flat[k] = String(v);
  }
  cachedGlobalInjections = flat;
  return flat;
}

export function applyInjections(body: string, perPost: Record<string, string> = {}): string {
  const table = { ...loadGlobalInjections(), ...perPost };
  return body.replace(/(\\)?\{\{\s*([\w.-]+)\s*\}\}/g, (full, lead: string | undefined, key: string) => {
    // Escaped: `\{{var}}` → render literal `{{var}}` (drop the backslash).
    if (lead) return full.slice(1);
    return Object.hasOwn(table, key) ? table[key] : full;
  });
}

// Date handling
export function computePublishedAt(year: number, month: number, day: number, time: string): Date {
  const safeTime = /^\d{1,2}:\d{2}$/.test(time) ? time : "08:00";
  const [hh, mm] = safeTime.split(":");
  const iso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${hh.padStart(2, "0")}:${mm}:00${OFFSET}`;
  return new Date(iso);
}

export function formatHumanDate(d: Date): string {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

// TOC extraction
export function extractToc(body: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;
  for (const line of body.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);
    if (!m) continue;
    const level = m[1].length as 2 | 3;
    const text = m[2];
    const id = slugger.slug(text);
    items.push({ level, text, id });
  }
  return items;
}

// File walking + parsing
type FileRecord = { filepath: string; year: number; month: number };

function listPostFiles(): FileRecord[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const out: FileRecord[] = [];
  for (const yearEntry of fs.readdirSync(BLOG_DIR, { withFileTypes: true })) {
    if (!yearEntry.isDirectory()) continue;
    if (!/^\d{4}$/.test(yearEntry.name)) continue;
    const year = Number(yearEntry.name);
    const yearDir = path.join(BLOG_DIR, yearEntry.name);
    for (const monthEntry of fs.readdirSync(yearDir, { withFileTypes: true })) {
      if (!monthEntry.isDirectory()) continue;
      if (!/^(0[1-9]|1[0-2])$/.test(monthEntry.name)) continue;
      const month = Number(monthEntry.name);
      const monthDir = path.join(yearDir, monthEntry.name);
      for (const fileEntry of fs.readdirSync(monthDir, { withFileTypes: true })) {
        if (!fileEntry.isFile()) continue;
        if (!fileEntry.name.endsWith(".mdx") && !fileEntry.name.endsWith(".md")) continue;
        out.push({ filepath: path.join(monthDir, fileEntry.name), year, month });
      }
    }
  }
  return out;
}

function parseFile(record: FileRecord): RawPost | null {
  const raw = fs.readFileSync(record.filepath, "utf8");
  const { data, content } = matter(raw);

  if (typeof data.title !== "string" || !data.title.trim()) {
    console.warn(`[blog] skipping ${record.filepath}: missing title`);
    return null;
  }
  if (typeof data.day !== "number") {
    console.warn(`[blog] skipping ${record.filepath}: missing/invalid day`);
    return null;
  }

  const draft = Boolean(data.draft);
  const day = data.day as number;
  const time = typeof data.time === "string" ? data.time : "08:00";
  const publishedDate = computePublishedAt(record.year, record.month, day, time);

  const fileBase = path.basename(record.filepath, path.extname(record.filepath));
  // Strip any leading "NN-" or "NN_" prefix from filename for cleaner default slug.
  const fileSlug = fileBase.replace(/^\d+[-_]/, "");
  const slug = typeof data.slug === "string" && data.slug.trim() ? slugify(data.slug) : fileSlug;

  const summary = typeof data.summary === "string" ? data.summary : "";
  const categoriesRaw = Array.isArray(data.categories) ? data.categories : [];
  const categories: Category[] = categoriesRaw
    .filter((c): c is string => typeof c === "string")
    .map((c) => {
      const cSlug = slugify(c);
      return { slug: cSlug, label: labelizeCategory(cSlug) };
    });

  const perPostInject = (data.inject && typeof data.inject === "object" ? data.inject : {}) as Record<string, unknown>;
  const perPostInjectStr: Record<string, string> = {};
  for (const [k, v] of Object.entries(perPostInject)) perPostInjectStr[k] = String(v);

  const body = applyInjections(content, perPostInjectStr);
  const toc = extractToc(body);
  const rt = readingTime(body);

  return {
    meta: {
      slug,
      title: data.title,
      summary,
      publishedAt: formatHumanDate(publishedDate),
      publishedAtIso: publishedDate.toISOString(),
      year: record.year,
      month: record.month,
      day,
      categories,
      readingTime: { text: rt.text, minutes: rt.minutes, words: rt.words },
      filepath: record.filepath,
    },
    body,
    toc,
    publishedDate,
    draft,
  };
}

// Cache layer
let cachedAllParsed: RawPost[] | null = null;

function getAllParsed(): RawPost[] {
  if (cachedAllParsed) return cachedAllParsed;
  const files = listPostFiles();
  const parsed: RawPost[] = [];
  const seenSlugs = new Map<string, string>();
  for (const f of files) {
    const p = parseFile(f);
    if (!p) continue;
    const existing = seenSlugs.get(p.meta.slug);
    if (existing) {
      throw new Error(`[blog] duplicate slug "${p.meta.slug}" in:\n  ${existing}\n  ${p.meta.filepath}\nSet a unique \`slug:\` in frontmatter.`);
    }
    seenSlugs.set(p.meta.slug, p.meta.filepath);
    parsed.push(p);
  }
  // newest first
  parsed.sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());
  cachedAllParsed = parsed;
  return parsed;
}

function getPublishedParsed(): RawPost[] {
  const now = Date.now();
  return getAllParsed().filter((p) => !p.draft && p.publishedDate.getTime() <= now);
}

export function clearBlogCache(): void {
  cachedAllParsed = null;
  cachedGlobalInjections = null;
}

export function listAllPostsForEditor(): RawPost[] {
  return getAllParsed();
}

export function getPostIncludingDrafts(slug: string): Post | null {
  const found = getAllParsed().find((p) => p.meta.slug === slug);
  if (!found) return null;
  return { ...found.meta, body: found.body, toc: found.toc };
}

// Public API
export function getAllPosts(): PostMeta[] {
  return getPublishedParsed().map((p) => p.meta);
}

export function getRecentPosts(n: number): PostMeta[] {
  return getAllPosts().slice(0, n);
}

export function getPost(slug: string): Post | null {
  const found = getPublishedParsed().find((p) => p.meta.slug === slug);
  if (!found) return null;
  return { ...found.meta, body: found.body, toc: found.toc };
}

export function getAllCategories(): (Category & { count: number })[] {
  const counts = new Map<string, { category: Category; count: number }>();
  for (const post of getAllPosts()) {
    for (const c of post.categories) {
      const entry = counts.get(c.slug);
      if (entry) entry.count += 1;
      else counts.set(c.slug, { category: c, count: 1 });
    }
  }
  return Array.from(counts.values())
    .map((e) => ({ ...e.category, count: e.count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function getCategoryBySlug(slug: string): Category | null {
  const found = getAllCategories().find((c) => c.slug === slug);
  if (!found) return null;
  return { slug: found.slug, label: found.label };
}

export function getPostsByCategory(slug: string): PostMeta[] {
  return getAllPosts().filter((p) => p.categories.some((c) => c.slug === slug));
}
