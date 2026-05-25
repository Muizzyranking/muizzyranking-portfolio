 import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type Command = {
  label: string;
  run: (router: AppRouterInstance) => void;
};

export const COMMANDS: Record<string, Command> = {
  home: { label: "go home", run: (r) => r.push("/") },
  about: { label: "open about", run: (r) => r.push("/about") },
  projects: { label: "open projects", run: (r) => r.push("/projects") },
  tools: { label: "open the toolbox", run: (r) => r.push("/tools") },
  blog: { label: "open writing", run: (r) => r.push("/blog") },
  writing: { label: "open writing", run: (r) => r.push("/blog") },
  resume: {
    label: "download résumé",
    run: () => {
      if (typeof window !== "undefined") window.open("/resume.pdf", "_blank");
    },
  },
  source: {
    label: "view source on GitHub",
    run: () => {
      if (typeof window !== "undefined") {
        window.open("https://github.com/Muizzyranking/muizzyranking-portfolio", "_blank");
      }
    },
  },
  q: { label: "quit command mode", run: () => {} },
  help: { label: "show commands", run: () => {} },
};

export const COMMAND_NAMES = Object.keys(COMMANDS);

export function completeCommand(prefix: string): string | null {
  const matches = COMMAND_NAMES.filter((n) => n.startsWith(prefix));
  if (matches.length === 1) return matches[0];
  if (matches.length === 0) return null;

  let common = matches[0];
  for (const m of matches.slice(1)) {
    let i = 0;
    while (i < common.length && i < m.length && common[i] === m[i]) i++;
    common = common.slice(0, i);
  }
  return common.length > prefix.length ? common : null;
}

export const HINT_KEY = "vim-cmd-hint-seen";
