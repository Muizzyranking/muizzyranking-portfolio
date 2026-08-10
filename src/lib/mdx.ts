import GithubSlugger from "github-slugger";
import type { Options as PrettyCodeOptions } from "rehype-pretty-code";
import type { TocItem } from "@/types";

export const prettyCodeOptions: PrettyCodeOptions = {
  theme: { light: "github-light", dark: "github-dark-dimmed" },
  keepBackground: false,
  defaultLang: { block: "plaintext", inline: "plaintext" },
};

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
