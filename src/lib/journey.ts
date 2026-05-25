import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import type { Milestone } from "@/types";

const file = path.join(process.cwd(), "content/journey.yml");

export function getJourney(): Milestone[] {
  if (!fs.existsSync(file)) return [];
  const raw = fs.readFileSync(file, "utf8");
  return (yaml.load(raw) as Milestone[]) ?? [];
}
