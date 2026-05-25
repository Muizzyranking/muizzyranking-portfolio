import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import type { Experience } from "@/types";

export function getAllExperience(): Experience[] {
  const filepath = path.join(process.cwd(), "content/experience.yml");
  if (!fs.existsSync(filepath)) return [];

  const raw = fs.readFileSync(filepath, "utf8");
  return yaml.load(raw) as Experience[];
}
