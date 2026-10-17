# AGENTS.md — Portfolio Guide for AI Agents

This file is the entry point for any AI agent working on this repo. Read this
first; it should save you from reading the entire codebase for most tasks.

## What this is

Personal portfolio + blog for **Muiz Oyebowale** (muizzyranking), live at
<https://muizzyranking.me>. Content lives as files in this repo. There is a
dev-only editor for writing posts/case studies, an ambient music player, a
custom cursor, and an interactive "how I build" diagram on the homepage.

Design intent: **clean, warm, premium** — bright porcelain light mode, true
night-black dark mode, blood-red accent. Explicitly **not** a terminal/dev
aesthetic; it must read well to non-technical hiring managers.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **React Compiler** (`reactCompiler: true` in next.config)
- **Tailwind CSS v4** (CSS-first config — tokens live in `src/app/globals.css` via `@theme`)
- **framer-motion** with `LazyMotion features={domAnimation} strict` — always import `m`, **never** `motion` (strict mode throws)
- **next-themes** (class `data-theme`, default light, system option)
- **next-mdx-remote** + **gray-matter** + **rehype-pretty-code** (shiki) for content
- **Biome** for lint/format (no ESLint/Prettier)
- Package manager: **pnpm**

## Commands

```bash
pnpm dev        # dev server (port 3000)
pnpm build      # production build
pnpm start      # serve production build
pnpm lint       # biome check (CI gate)
pnpm format     # biome format --write
pnpm check      # biome check --write (fix + format)
```

Run `pnpm lint && pnpm build` before considering any change done.

## Layout of the repo

```
src/
├── app/
│   ├── layout.tsx              # ROOT: html/body, ThemeProvider, LazyMotion,
│   │                           #   CustomCursor, MusicProvider, GA. No navbar here.
│   ├── (site)/                 # ROUTE GROUP with chrome (Navbar + Footer):
│   │   ├── layout.tsx          #   navbar/footer wrapper — regular pages live here
│   │   ├── page.tsx            #   homepage
│   │   ├── about/              #   about page
│   │   ├── projects/           #   projects index + [slug] case studies
│   │   ├── blog/               #   blog index, [slug], category/[slug], rss
│   │   ├── editor/             #   DEV-ONLY content editor (404s in production)
│   │   └── tools/              #   redirects to /about
│   ├── links/                  # linktree-style share page — NO navbar/footer
│   ├── api/
│   │   ├── editor/             # POST/PUT/DELETE for posts & projects (dev tool)
│   │   └── projects|blog/      # public JSON APIs
│   ├── globals.css             # ALL design tokens + shared utilities
│   ├── icon.tsx                # favicon (satori ImageResponse)
│   └── opengraph-image.tsx     # root OG image (satori)
├── components/
│   ├── layout/                 # Navbar (music popover + ⌘K palette), Footer,
│   │                           #   CustomCursor, MobileMenu, ThemeToggle
│   ├── music/                  # MusicProvider (audio state machine) + MusicPopover
│   ├── sections/homepage/      # Hero, SystemDiagram, SelectedWork, Experience,
│   │                           #   FullStack, BlogTeaser, Contact
│   ├── sections/about/         # AboutHero (portrait), WhatIDo, HumanSide, Stack, Cta
│   ├── sections/projects/      # ProjectCard, ProjectCaseStudy, ProjectsIndex
│   ├── sections/blog→blog/     # PostHero, PostBody, PostRow, BlogIndex, TOC,
│   │                           #   CodeBlock, ReadingProgress, PostEnd
│   ├── editor/                 # BlogEditor, ProjectEditor, EditorShell, fields
│   └── ui/icons.tsx            # SOCIAL_ICONS (svg)
├── lib/
│   ├── site.ts                 # name, url, email, socials — single source of identity
│   ├── blog.ts                 # blog content loader (mtime-signature cache — see below)
│   ├── projects.ts             # project loader + parsers
│   ├── stack.ts                # homepage/about stack data (single source)
│   ├── links.tsx               # /links page data (add links here)
│   ├── experience.ts, data.ts  # experience YAML loader
│   ├── font.ts                 # Bricolage Grotesque + Poppins + IBM Plex Mono
│   ├── motion.tsx              # EASE, SCROLL_REVEAL, stagger variants
│   └── editor-write.ts         # frontmatter builders for the editor
└── content/
    ├── projects/*.mdx          # one file per project case study
    └── blog/YYYY/MM/slug.mdx   # one file per post, date from folder + `day`

public/
├── projects/<slug>.png         # splash images (branded placeholders — swap freely)
├── audio/*.mp3                 # ambient music tracks
└── muizzy.jpg                  # portrait (used on /about and /links)
```

## Design system (all tokens in `src/app/globals.css`)

Colors — light ("bright porcelain"): bg `#fffdf9`, ink `#191512`,
secondary `#463f37`, muted `#6d655a`, accent `#881600` (blood red), accent
bright `#a81c00`, subtle wash `#fbeeea`. Dark ("night ember"): bg `#0a0a0b`,
raised `#18171b`, accent `#e2543e` (brighter red for contrast on black).
Never hardcode hex in components — use `var(--color-*)` / Tailwind tokens
(`bg-background`, `text-text-primary`, `border-border`, `bg-accent`, ...).

Typography: **Bricolage Grotesque** for display (`font-display`), **Poppins**
body (`font-sans`), **IBM Plex Mono** for labels/code (`font-mono`).

Shared utility classes in globals.css — use them instead of re-styling:

- `.btn .btn--primary / .btn--ghost` — pill buttons, press scale 0.97
- `.chip` — mono rounded-full tag with gap for a leading dot
- `.card` — raised surface + `var(--shadow-soft)`
- `.eyebrow` — mono uppercase label with a red tick via `::before`
- `.post-link` — prose link with retracting underline

Motion rules (from the design language): ease-out curve `EASE =
[0.22, 1, 0.36, 1]` from `lib/motion.tsx`, scroll reveals via
`useInView(ref, SCROLL_REVEAL)`, stagger 40–90ms, press feedback on
clickables, `useReducedMotion()` respected in every animated component.
Hover transforms gated behind `@media (hover: hover)` where relevant.

## The custom cursor

`src/components/layout/CustomCursor.tsx`, mounted once in the root layout.
Full mechanics also documented in `cursor.md` (standalone recreation guide).
Short version: a fixed bordeaux ring replaces the native cursor on
fine-pointer devices. It springs after the pointer; on hover it morphs onto
the element and wraps it like a border (size/radius from the element's rect,
radius cached per element); while wrapping, a rAF loop re-reads the rect
every frame so the ring tracks the element through scrolls; it releases when
the element fully leaves the viewport. Small elements (≤80px tall) get a
viewport clamp so their ring never clips at the top; large elements (cards)
follow their element off-screen naturally. Click = 120ms press-pulse. The
native cursor is hidden only when active (`html.custom-cursor-active`), so
touch, reduced-motion and no-JS users are unaffected. SVG nodes in the hero
diagram opt in with `data-cursor`.

## Interactive hero diagram

`src/components/sections/homepage/SystemDiagram.tsx` — "from idea to uptime":
an S-curve journey path (Planning → Building → Shipping → Running →
Watching → Improving) drawn as SVG. Build-type pills (Web app / Backend API /
AI feature) switch per-type descriptions + chips. Clicking a station opens a
detail card. All detail-card variants are stacked in ONE CSS grid cell
(`[grid-area:1/1]`) so switching never shifts layout. Animations: path
draws on scroll-in (`pathLength`), stations pop staggered, a packet travels
the path (`animateMotion`), and it loops back ("then it starts again").
All copy lives in the `STAGES` / `BUILD_TYPES` arrays at the top of the file.
Coordinates are static and rounded to 2dp — do not introduce unrounded float
math in render, it causes hydration mismatches.

## Content system (files, no CMS)

**Blog post** — create `content/blog/YYYY/MM/<slug>.mdx`:

```mdx
---
title: "Post title"        # required
day: 23                    # required (day of month; year/month from folder)
summary: "One-liner"
categories: [backend, postgresql]
draft: true                # omit to publish
---

Body in MDX. {{var}} injections come from content/blog/_injections.yml.
```

**Project** — create `content/projects/<slug>.mdx`:

```mdx
---
title: "Name"
summary: "One sentence"
stack: [Python, FastAPI, PostgreSQL]
status: "complete"          # complete | in-progress | archived
year: "2026"
role: "Solo backend engineer"
repo: "https://github.com/..."
live: ""
screenshots: ["/projects/<slug>.png"]
featured: true              # homepage shows first 3 featured
draft: true
---

## Overview
## Engineering Challenges   # ### per challenge (rendered as roman-numeral timeline)
## Outcomes
## Lessons Learned
```

Splash images: `public/projects/<slug>.png` (16:10). Add real screenshots by
appending paths to `screenshots:`. Remote https image URLs are allowed
(`next.config.ts` `remotePatterns`).

**Blog caching gotcha**: `lib/blog.ts` caches parsed posts keyed by a
filesystem signature (paths + mtimes + sizes). This exists because Next
compiles route handlers and pages into separate module layers — manual
cache-clearing from an API route cannot reach the pages' copy. Don't replace
it with a plain module-level cache or drafts won't preview without a restart.

## Dev editor (/editor)

Only renders in development. `EditorShell` lists posts/projects with draft
badges and delete; `BlogEditor`/`ProjectEditor` save via `/api/editor/*`
routes; Preview buttons open `/editor/preview/...` which render drafts with a
"DRAFT PREVIEW" banner. ⌘S/Ctrl+S saves a draft. Blog posts are single files
— slug and year/month renames are rejected by the API (delete + recreate).

## Music player

`MusicProvider` (root layout) owns an `<audio>` element + state machine:
`playback: stopped | playing | paused` and `panel: closed | open | minimized`.
Tracks: `MUSIC_TRACKS` array in `MusicProvider.tsx` — files in
`public/audio/`, optional `credit` field shown in the popover (attribution).
Behavior: navbar note-icon toggles the popover; red traffic light = stop +
close; yellow = minimize (music keeps playing); outside click minimizes;
paused ≠ closed; no looping — tracks auto-advance; progress bar + volume
(persisted in localStorage `music-volume`). The popover lives in
`MusicPopover.tsx`, rendered by the Navbar (so `/links`, which has no
navbar, has no music UI).

## Pages & chrome rules

- Regular pages go in `src/app/(site)/` (they get Navbar + Footer via
  `(site)/layout.tsx`).
- `/links` intentionally sits OUTSIDE that group — no navbar/footer. Keep it
  that way; it's a share page.
- Navbar: logo, links (lowercase, `leading-none` — do not remove, it keeps
  the cursor wrap from clipping), music icon, ⌘K search, theme toggle,
  résumé. The music popover is anchored inside the navbar's relative wrapper.

## Favicon & OG images

`src/app/icon.tsx` and `src/app/opengraph-image.tsx` (+ per-post
`src/app/(site)/blog/[slug]/opengraph-image.tsx`) use `next/og` ImageResponse
(satori). **Satori rules**: every div with more than one child needs explicit
`display: flex`; mixed text + element children too. Palette hexes are
hardcoded here by design (no CSS vars in satori).

## Common tasks

- **Change site identity/socials** → `src/lib/site.ts`
- **Add/edit stack groups** → `src/lib/stack.ts` (used by home + about)
- **Add a link on /links** → `LINKS` in `src/lib/links.tsx`
- **Add a song** → file in `public/audio/` + entry in `MUSIC_TRACKS`
- **Tune hero diagram copy** → `STAGES`/`BUILD_TYPES` in `SystemDiagram.tsx`
- **Change colors** → tokens in `globals.css` (both themes) + hexes in the 3
  OG/icon files
- **Add a page with navbar** → `src/app/(site)/<route>/page.tsx`
- **Editor behavior** → `src/app/api/editor/*` + `src/components/editor/*`

## Gotchas

- `m.` not `motion.` (LazyMotion strict).
- Hydration: no `Date.now()`/`Math.random()` in render; random pickers
  (dad jokes) set state in `useEffect`. `<body>` has
  `suppressHydrationWarning` for browser-extension attribute noise
  (Grammarly).
- SVG interactive nodes: attach keyboard handlers + `data-cursor`; suppress
  biome `useSemanticElements` with a comment (can't be real `<button>`s).
- Biome enforces import order and a11y — run `pnpm check`.
- The dev-only editor and its API routes must never render in production
  (editor layout 404s on purpose).
- `.btn`, `.chip`, `.card` are global classes — prefer them over re-rolling
  the same Tailwind strings.
