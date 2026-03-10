import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

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

export function getAllExperience(): Experience[] {
  const filepath = path.join(process.cwd(), "content/experience.yml");
  if (!fs.existsSync(filepath)) return [];

  const raw = fs.readFileSync(filepath, "utf8");
  return yaml.load(raw) as Experience[];
}
