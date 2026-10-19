export type StackTier = "production" | "comfortable" | "exploring";

export type StackGroup = {
  label: string;
  blurb: string;
  tags: { name: string; tier: StackTier }[];
};

export const STACK_GROUPS: StackGroup[] = [
  {
    label: "Languages",
    blurb: "What I reach for first.",
    tags: [
      { name: "Python", tier: "production" },
      { name: "TypeScript", tier: "production" },
      { name: "HTML", tier: "production" },
      { name: "JavaScript", tier: "comfortable" },
      { name: "Bash", tier: "comfortable" },
      { name: "C", tier: "comfortable" },
      { name: "Lua", tier: "comfortable" },
      { name: "Go", tier: "exploring" },
      { name: "Rust", tier: "exploring" },
    ],
  },
  {
    label: "Frameworks",
    blurb: "The problem picks the framework, not the other way round.",
    tags: [
      { name: "Django", tier: "production" },
      { name: "FastAPI", tier: "production" },
      { name: "Django Ninja", tier: "production" },
      { name: "Next.js", tier: "production" },
      { name: "Express", tier: "comfortable" },
      { name: "Node.js", tier: "exploring" },
      { name: "Django REST Framework", tier: "comfortable" },
      { name: "Flask", tier: "comfortable" },
      { name: "React", tier: "comfortable" },
    ],
  },
  {
    label: "Data",
    blurb: "Postgres for everything until there is a real reason not to.",
    tags: [
      { name: "PostgreSQL", tier: "production" },
      { name: "MySQL", tier: "production" },
      { name: "Redis", tier: "production" },
      { name: "SQLAlchemy", tier: "production" },
      { name: "Django ORM", tier: "comfortable" },
      { name: "SQLite", tier: "comfortable" },
    ],
  },
  {
    label: "Infrastructure",
    blurb: "Repeatable deploys: a server, a container, a workflow.",
    tags: [
      { name: "Linux", tier: "production" },
      { name: "AWS EC2", tier: "production" },
      { name: "Docker", tier: "production" },
      { name: "Celery", tier: "comfortable" },
      { name: "Nginx", tier: "comfortable" },
      { name: "Uvicorn / Gunicorn", tier: "comfortable" },
      { name: "GitHub Actions", tier: "comfortable" },
    ],
  },
  {
    label: "Tooling",
    blurb: "The setup that survives a fresh install.",
    tags: [
      { name: "Neovim", tier: "comfortable" },
      { name: "Git", tier: "production" },
      { name: "Tmux", tier: "comfortable" },
      { name: "Zsh", tier: "comfortable" },
      { name: "fzf", tier: "comfortable" },
      { name: "ripgrep", tier: "comfortable" },
      { name: "lazygit", tier: "comfortable" },
    ],
  },
];
