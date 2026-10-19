# [muizzyranking.me](https://muizzyranking.me)

Personal portfolio and blog.
Built with Next.js, Tailwind v4, and Framer Motion. Content lives as files
in this repo; there is a built-in dev-only editor for writing.

> **AI agents**: start with [AGENTS.md](./AGENTS.md) — it's the entry point
> covering the design system, architecture and common tasks.

## Design language

- **Dark-only** — neutral near-black surfaces (`#0a0a0c`–`#17171a`), amber
  accent (`#f59e0b`), hairline borders and mono metadata. Light tokens
  still exist in CSS but the theme is pinned dark (`forcedTheme`).
- **Type** — Fraunces (display, with real italics for accent moments),
  Poppins (body), IBM Plex Mono (labels, code, metadata)
- **Sections** — ruled doc-style blocks with hairline dividers; section
  headers are plain, the sidebar rails and fake `01/02` numbering are gone
- **Custom cursor** — a hub dot tracks the pointer 1:1 while an amber ring
  wraps hoverable elements like a border (fine-pointer devices only).
  How it works: [cursor.md](./cursor.md)

## Stack

- **Framework** — Next.js 16 (App Router, Turbopack) + React 19 + React Compiler
- **Styling** — Tailwind CSS v4 (CSS-first tokens in `globals.css`)
- **Animations** — Framer Motion (LazyMotion, strict)
- **Content** — MDX + YAML files in `content/`, parsed at build
- **Fonts** — Fraunces (display), Poppins (body), IBM Plex Mono (mono)
- **Linting/Formatting** — Biome
- **Deployment** — Vercel

## Features

- **Homepage** — big-name hero (copy lives in a `HERO` constant at the top
  of `Hero.tsx`), a 2×2 featured-projects grid, tech-stack inventory,
  tabbed experience selector, blog teaser, about blurb, centered contact
- **Projects** — card-grid index with status/tech filters; case studies are
  MDX with optional screenshot galleries (horizontal strip + lightbox),
  roman-numeral challenge timelines and a sticky meta rail
- **Blog** — MDX posts with categories, search, TOC, reading progress
- **Music player** — ambient tracks with a mac-style popover in the navbar
  (progress, playlist, volume; auto-advances)
- **Content editor** — dev-only `/editor` for writing posts and case
  studies with draft/preview support (404s in production)
- **/links page** — linktree-style share card, no navbar

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Root: dark theme, cursor, music, fonts, analytics
│   ├── (site)/               # Pages with navbar/footer chrome
│   │   ├── page.tsx          # Homepage (assembles the sections below)
│   │   ├── about/            # About
│   │   ├── projects/         # Projects index + [slug] case studies
│   │   ├── blog/             # Blog index, posts, categories, RSS
│   │   └── editor/           # Dev-only content editor
│   ├── links/                # Linktree-style share page (no chrome)
│   ├── api/editor/           # Editor save/delete routes (dev only)
│   └── globals.css           # Design tokens + shared utilities
├── components/
│   ├── layout/               # Navbar, Footer, CustomCursor, CommandPalette
│   ├── music/                # Ambient music player + popover
│   ├── sections/             # Homepage / about / projects section blocks
│   ├── blog/                 # Post hero, body, TOC, code blocks
│   ├── ui/                   # DocSection, TierDot, icons and other primitives
│   └── editor/               # Dev editor UI
└── lib/                      # Content loaders, site identity, motion, fonts

content/
├── projects/
│   ├── *.mdx                 # One file per case study
│   ├── other.yml             # "Other projects" card list
│   └── contributions.yml     # Open-source contribution rows
└── blog/YYYY/MM/slug.mdx     # One file per post

public/
├── projects/                 # Case-study screenshots (optional)
├── audio/                    # Ambient music tracks
└── muizzy.jpg                # Portrait
```

## Writing content

### Add a blog post

Create `content/blog/YYYY/MM/<slug>.mdx`:

```mdx
---
title: "Post title"
day: 23                      # day of month; year/month come from the folder
summary: "One-liner"
categories: [backend, postgresql]
draft: true                  # omit to publish
---

Body in MDX.
```

### Add a featured project

Create `content/projects/<slug>.mdx` (screenshots are optional — put files
under `public/projects/` and list their paths; the case study renders no
image section when the list is empty or missing):

```mdx
---
title: "Project Name"
summary: "One sentence."     # optional now
stack: [Python, FastAPI, PostgreSQL]
status: "complete"           # complete | in-progress | archived
year: "2026"
repo: "https://github.com/Muizzyranking/repo"   # optional
live: ""                     # optional
screenshots: ["/projects/<slug>/<shot>.png"]    # optional
featured: true               # homepage shows the first 4 featured
---

## Overview
## Engineering Challenges    # optional; ### per challenge → roman-numeral list
## Outcomes                  # optional
## Lessons Learned           # optional
```

### Other projects & contributions

- `content/projects/other.yml` — cards for smaller builds: `name`,
  `description`, optional `link` (source) / `live`, optional `stack`
- `content/projects/contributions.yml` — rows for open-source
  contributions: `name` + `link`

Or use the dev editor at `/editor` (drafts, preview, ⌘S).

## Development

```bash
pnpm install
pnpm dev       # dev server on :3000
pnpm lint      # biome check
pnpm check     # biome check --write (fix + format)
pnpm build     # production build
```

## Environment

No environment variables are required to run the site. `NEXT_PUBLIC_GA_MEASUREMENT_ID` enables Google Analytics when set.

## Deployment

Deployed on Vercel — pushes to `main` redeploy. Site URL is set in
`src/lib/site.ts` (`metadataBase` picks it up from there).

## License

Code is open source under the MIT License. Content (writing, project
descriptions, about page copy) is not — please do not copy it.
