"use client";

import Link from "next/link";
import { useState } from "react";

type PostRow = {
  slug: string;
  title: string;
  year: number;
  month: number;
  day: number;
  publishedAt: string;
  draft: boolean;
};

type ProjectRow = {
  slug: string;
  title: string;
  year: string;
  status: string;
  featured: boolean;
  draft: boolean;
};

type Props = {
  posts: PostRow[];
  projects: ProjectRow[];
};

export default function EditorShell({ posts, projects }: Props) {
  const [tab, setTab] = useState<"posts" | "projects">("posts");

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "clamp(6rem, 10vw, 8rem) 1.5rem 5rem" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--color-text-muted)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "0.5rem",
          }}
        >
          ~/editor (dev only)
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "var(--color-text-primary)",
          }}
        >
          Content editor
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          gap: "0.25rem",
          borderBottom: "1px solid var(--color-border-subtle)",
          marginBottom: "2rem",
        }}
      >
        <TabButton active={tab === "posts"} onClick={() => setTab("posts")}>
          Posts <span style={{ opacity: 0.5 }}>({posts.length})</span>
        </TabButton>
        <TabButton active={tab === "projects"} onClick={() => setTab("projects")}>
          Projects <span style={{ opacity: 0.5 }}>({projects.length})</span>
        </TabButton>
      </div>

      {tab === "posts" ? <PostsList rows={posts} /> : <ProjectsList rows={projects} />}
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "0.6rem 1.1rem",
        fontFamily: "var(--font-mono)",
        fontSize: "0.78rem",
        background: "none",
        border: "none",
        color: active ? "var(--color-text-primary)" : "var(--color-text-muted)",
        borderBottom: `2px solid ${active ? "var(--color-accent)" : "transparent"}`,
        cursor: "pointer",
        marginBottom: "-1px",
      }}
    >
      {children}
    </button>
  );
}

function PostsList({ rows }: { rows: PostRow[] }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <Link href="/editor/blog/new" style={newButtonStyle}>
          + New Post
        </Link>
      </div>
      {rows.length === 0 ? (
        <Empty label="No posts yet" />
      ) : (
        <ul style={listStyle}>
          {rows.map((p) => (
            <li key={p.slug} style={rowStyle}>
              <Link href={`/editor/blog/${p.slug}`} style={rowLinkStyle}>
                <span style={{ flex: 1, color: "var(--color-text-primary)" }}>{p.title}</span>
                <span style={metaStyle}>{p.publishedAt}</span>
                {p.draft && <span style={draftBadgeStyle}>draft</span>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ProjectsList({ rows }: { rows: ProjectRow[] }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <Link href="/editor/projects/new" style={newButtonStyle}>
          + New Project
        </Link>
      </div>
      {rows.length === 0 ? (
        <Empty label="No projects yet" />
      ) : (
        <ul style={listStyle}>
          {rows.map((p) => (
            <li key={p.slug} style={rowStyle}>
              <Link href={`/editor/projects/${p.slug}`} style={rowLinkStyle}>
                <span style={{ flex: 1, color: "var(--color-text-primary)" }}>{p.title}</span>
                <span style={metaStyle}>{p.year}</span>
                <span style={metaStyle}>{p.status}</span>
                {p.featured && <span style={featuredBadgeStyle}>featured</span>}
                {p.draft && <span style={draftBadgeStyle}>draft</span>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div
      style={{
        padding: "3rem",
        textAlign: "center",
        fontFamily: "var(--font-mono)",
        fontSize: "0.8rem",
        color: "var(--color-text-muted)",
        border: "1px dashed var(--color-border-subtle)",
        borderRadius: "var(--radius-md)",
      }}
    >
      {label}
    </div>
  );
}

const newButtonStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.78rem",
  padding: "0.55rem 1rem",
  background: "var(--color-accent)",
  color: "white",
  borderRadius: "var(--radius-sm)",
  textDecoration: "none",
  fontWeight: 600,
};

const listStyle: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  border: "1px solid var(--color-border-subtle)",
  borderRadius: "var(--radius-md)",
  overflow: "hidden",
};

const rowStyle: React.CSSProperties = {
  borderBottom: "1px solid var(--color-border-subtle)",
};

const rowLinkStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  padding: "0.9rem 1.1rem",
  textDecoration: "none",
  transition: "background 0.15s",
};

const metaStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.7rem",
  color: "var(--color-text-muted)",
};

const draftBadgeStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.62rem",
  color: "#c9a84c",
  border: "1px solid #8a6f2e",
  borderRadius: "var(--radius-sm)",
  padding: "0.1rem 0.4rem",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const featuredBadgeStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.62rem",
  color: "var(--color-accent)",
  border: "1px solid var(--color-accent-dim)",
  borderRadius: "var(--radius-sm)",
  padding: "0.1rem 0.4rem",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};
