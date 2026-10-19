import type { TechKey } from "@/components/ui/icons";

export type StackGroup = {
  label: string;
  blurb: string;
  /** icon refers to TECH_ICONS; tech without an official logo falls back
   *  to the generic glyph in the UI. */
  tags: { name: string; icon?: TechKey }[];
};

export const STACK_GROUPS: StackGroup[] = [
  {
    label: "Languages",
    blurb: "What I reach for first.",
    tags: [
      { name: "Python", icon: "python" },
      { name: "TypeScript", icon: "typescript" },
      { name: "HTML", icon: "html5" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Bash", icon: "bash" },
      { name: "C" },
      { name: "Lua", icon: "lua" },
      { name: "Go", icon: "go" },
      { name: "Rust", icon: "rust" },
    ],
  },
  {
    label: "Frameworks",
    blurb: "The problem picks the framework, not the other way round.",
    tags: [
      { name: "Django", icon: "django" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Django Ninja" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "Express", icon: "express" },
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Django REST Framework" },
      { name: "Flask", icon: "flask" },
      { name: "React", icon: "react" },
    ],
  },
  {
    label: "Data",
    blurb: "Postgres for everything until there is a real reason not to.",
    tags: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
      { name: "Redis", icon: "redis" },
      { name: "SQLAlchemy" },
      { name: "Django ORM" },
      { name: "SQLite", icon: "sqlite" },
    ],
  },
  {
    label: "Infrastructure",
    blurb: "Repeatable deploys: a server, a container, a workflow.",
    tags: [
      { name: "Linux", icon: "linux" },
      { name: "AWS EC2" },
      { name: "Docker", icon: "docker" },
      { name: "Celery", icon: "celery" },
      { name: "Nginx", icon: "nginx" },
      { name: "Uvicorn / Gunicorn" },
      { name: "GitHub Actions", icon: "githubactions" },
    ],
  },
  {
    label: "Tooling",
    blurb: "The setup that survives a fresh install.",
    tags: [
      { name: "Neovim", icon: "neovim" },
      { name: "Git", icon: "git" },
      { name: "Tmux", icon: "tmux" },
      { name: "Zsh", icon: "zsh" },
      { name: "fzf" },
      { name: "ripgrep" },
      { name: "lazygit" },
    ],
  },
];
