# muizzyranking.dev

Personal portfolio and blog — built with Next.js, Tailwind v4, and Framer Motion.

## Stack

- **Framework** — Next.js 16 (App Router, Turbopack)
- **Styling** — Tailwind CSS v4
- **Animations** — Framer Motion
- **Content** — MDX for projects, YAML for experience
- **Blog** — Hashnode GraphQL API
- **Linting/Formatting** — Biome
- **Deployment** — Vercel

## Project Structure

```
src/
├── app/                    # Routes (App Router)
│   ├── page.tsx            # Homepage
│   ├── about/              # About page
│   ├── projects/           # Projects list + detail pages
│   └── blog/               # Blog list (links to Hashnode)
├── components/
│   ├── layout/             # Navbar, Footer, JsonLd
│   ├── sections/           # Hero, Experience, Skills, etc.
│   └── ui/                 # Reusable components
└── lib/                    # Data fetching — MDX, YAML, Hashnode

content/
├── experience.yml          # Work history
└── projects/               # MDX files, one per project
```

## Content

### Adding a project

Create a new `.mdx` file in `content/projects/`:

```mdx
---
title: "Project Name"
summary: "One sentence. What it is and why it exists."
status: "complete"       # complete | in-progress | archived
year: "2025"
stack: [Python, PostgreSQL, Redis]
repo: "https://github.com/Muizzyranking/repo"
live: ""
featured: false          # true to show on homepage (max 3)
cover: ""
---

## Overview

What it does and why it exists.

## Challenges

### Challenge title

Problem first, solution second, reasoning third.

## What I Learned

What actually shifted in how you think or work.
```

### Updating experience

Edit `content/experience.yml` directly. Entries are ordered newest first.

```yaml
- company: "Company Name"
  role: "Your Title"
  type: "Full-time"        # Full-time | Contract | Freelance | Internship
  location: "Lagos, Nigeria"
  period:
    start: "Jan 2025"
    end: "Present"
  summary: "One sentence summary."
  highlights:
    - "What you did and what it resulted in."
  stack: [Python, Django, PostgreSQL]
```

## Development

```bash
# install dependencies
npm install

# start dev server
npm run dev

# lint and format
npm run check

# production build
npm run build
```

## Environment

No environment variables required. The Hashnode integration uses the public GraphQL API — no API key needed.

If you fork this and want to point it at a different Hashnode publication, update `PUBLICATION_HOST` in `src/lib/hashnode.ts`.

## Deployment

Deployed on Vercel. Any push to `main` triggers a redeploy. ISR revalidates blog posts every hour so new Hashnode posts surface without a manual redeploy.

Once you have a custom domain, update `metadataBase` in `src/app/layout.tsx` and `NEXT_PUBLIC_BASE_URL` in your Vercel environment variables.

## License

Code is open source under the MIT License. Content (writing, project descriptions, about page copy) is not — please do not copy it.
