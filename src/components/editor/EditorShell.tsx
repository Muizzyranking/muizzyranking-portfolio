"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

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

function useDelete() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function remove(kind: "posts" | "projects", slug: string, title: string) {
    if (!window.confirm(`Delete "${title}"?\n\nThis permanently removes the file from content/. This cannot be undone.`)) return;
    setDeleting(slug);
    try {
      const res = await fetch(`/api/editor/${kind}/${encodeURIComponent(slug)}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
      startTransition(() => router.refresh());
    } catch (e) {
      window.alert(`Delete failed: ${(e as Error).message}`);
    } finally {
      setDeleting(null);
    }
  }

  return { remove, busy: deleting !== null || pending };
}

function PostsList({ rows }: { rows: PostRow[] }) {
  const { remove, busy } = useDelete();

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
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                    <span style={{ color: "var(--color-text-primary)" }}>{p.title}</span>
                    {p.draft && <Badge kind="draft">draft</Badge>}
                  </span>
                </span>
                <span style={metaStyle}>{p.publishedAt}</span>
              </Link>
              <IconBtn label={`Delete ${p.title}`} disabled={busy} onClick={() => remove("posts", p.slug, p.title)}>
                ×
              </IconBtn>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ProjectsList({ rows }: { rows: ProjectRow[] }) {
  const { remove, busy } = useDelete();

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
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                    <span style={{ color: "var(--color-text-primary)" }}>{p.title}</span>
                    {p.featured && <Badge kind="featured">featured</Badge>}
                    {p.draft && <Badge kind="draft">draft</Badge>}
                  </span>
                </span>
                <span style={metaStyle}>{p.year}</span>
                <span style={metaStyle}>{p.status}</span>
              </Link>
              <IconBtn label={`Delete ${p.title}`} disabled={busy} onClick={() => remove("projects", p.slug, p.title)}>
                ×
              </IconBtn>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Badge({ kind, children }: { kind: "draft" | "featured"; children: React.ReactNode }) {
  const styles =
    kind === "draft"
      ? { color: "#6f8c48", borderColor: "#9fbf6b66", background: "#9fbf6b14" }
      : { color: "var(--color-accent)", borderColor: "var(--color-accent-dim)", background: "transparent" };
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.62rem",
        border: `1px solid ${styles.borderColor}`,
        borderRadius: "999px",
        padding: "0.08rem 0.5rem",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: styles.color,
        background: styles.background,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function IconBtn({ children, onClick, disabled, label }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      style={{
        flexShrink: 0,
        background: "none",
        border: "none",
        color: "var(--color-text-muted)",
        width: "1.75rem",
        height: "1.75rem",
        cursor: disabled ? "wait" : "pointer",
        opacity: disabled ? 0.35 : 0.55,
        fontSize: "1rem",
        lineHeight: 1,
        borderRadius: "var(--radius-sm)",
        transition: "opacity 150ms ease, color 150ms ease",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.color = "var(--color-error)";
          e.currentTarget.style.opacity = "1";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--color-text-muted)";
        e.currentTarget.style.opacity = disabled ? "0.35" : "0.55";
      }}
    >
      {children}
    </button>
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
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid var(--color-border-subtle)",
};

const rowLinkStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  padding: "0.9rem 1.1rem",
  textDecoration: "none",
  flex: 1,
  minWidth: 0,
  transition: "background 0.15s ease",
};

const metaStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.7rem",
  color: "var(--color-text-muted)",
  whiteSpace: "nowrap",
};
