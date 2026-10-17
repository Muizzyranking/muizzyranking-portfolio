# [muizzyranking.me](https://muizzyranking.me)

Personal portfolio and blog of **Muiz Oyebowale** — backend-heavy fullstack
engineer. Built with Next.js, Tailwind v4, and Framer Motion. Content lives
as files in this repo; there is a built-in dev-only editor for writing.

> **AI agents**: start with [AGENTS.md](./AGENTS.md) — it's the entry point
> covering the design system, architecture and common tasks.

## Stack

- **Framework** — Next.js 16 (App Router, Turbopack) + React 19 + React Compiler
- **Styling** — Tailwind CSS v4 (CSS-first tokens in `globals.css`)
- **Animations** — Framer Motion (LazyMotion, strict)
- **Content** — MDX files in `content/` (projects + blog), parsed at build
- **Fonts** — Bricolage Grotesque (display), Poppins (body), IBM Plex Mono (code)
- **Linting/Formatting** — Biome
- **Deployment** — Vercel

## Features

- **Design system** — bright porcelain light mode / night-black dark mode
  with a blood-red accent; tokens in `src/app/globals.css`
- **Custom cursor** — a bordeaux ring that replaces the native cursor and
  wraps clickable elements like a border (fine-pointer devices only).
  How it works: [cursor.md](./cursor.md)
- **Interactive hero** — an animated "how I build" journey diagram
  (SVG, click any stage)
- **Case studies** — MDX-driven with roman-numeral challenge timelines,
  splash images and a sticky meta rail
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
│   ├── layout.tsx            # Root: theme, cursor, music, fonts, analytics
│   ├── (site)/               # Pages with navbar/footer chrome
│   │   ├── page.tsx          # Homepage
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
│   ├── sections/             # Homepage / about / projects / blog sections
│   ├── blog/                 # Post hero, body, TOC, code blocks
│   └── editor/               # Dev editor UI
└── lib/                      # Content loaders, site identity, motion, fonts

content/
├── projects/*.mdx            # One file per case study
└── blog/YYYY/MM/slug.mdx     # One file per post

public/
├── projects/                 # Case-study splash images
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

### Add a project

Create `content/projects/<slug>.mdx` and a splash at
`public/projects/<slug>.png`:

```mdx
---
title: "Project Name"
summary: "One sentence."
stack: [Python, FastAPI, PostgreSQL]
status: "complete"           # complete | in-progress | archived
year: "2026"
repo: "https://github.com/Muizzyranking/repo"
live: ""
screenshots: ["/projects/<slug>.png"]
featured: true               # homepage shows the first 3 featured
---

## Overview
## Engineering Challenges    # ### per challenge → roman-numeral timeline
## Outcomes
## Lessons Learned
```

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
