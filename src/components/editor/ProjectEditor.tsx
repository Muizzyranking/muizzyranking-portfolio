"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ChipInput from "./ChipInput";
import MarkdownField from "./MarkdownField";
import TextField from "./TextField";

type ChallengeEntry = { title: string; body: string };
type Status = "complete" | "in-progress" | "archived";

export type ProjectEditorInitial = {
  mode: "new" | "edit";
  slug: string;
  frontmatter: {
    title: string;
    summary: string;
    status: Status;
    year: string;
    stack: string[];
    repo: string;
    live: string;
    featured: boolean;
    draft: boolean;
  };
  parsed: {
    overview: string;
    challenges: ChallengeEntry[];
    learned: string;
  };
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[''"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type AfterSave = "stay" | "preview" | "publish";

export default function ProjectEditor({ initial }: { initial: ProjectEditorInitial }) {
  const router = useRouter();

  const [title, setTitle] = useState(initial.frontmatter.title);
  const [summary, setSummary] = useState(initial.frontmatter.summary);
  const [status, setStatus] = useState<Status>(initial.frontmatter.status);
  const [year, setYear] = useState(initial.frontmatter.year);
  const [stack, setStack] = useState<string[]>(initial.frontmatter.stack);
  const [repo, setRepo] = useState(initial.frontmatter.repo);
  const [live, setLive] = useState(initial.frontmatter.live);
  const [featured, setFeatured] = useState<boolean>(initial.frontmatter.featured);
  const [slug, setSlug] = useState(initial.slug);
  const [slugTouched, setSlugTouched] = useState(initial.mode === "edit");

  const [overview, setOverview] = useState(initial.parsed.overview);
  const [challenges, setChallenges] = useState<ChallengeEntry[]>(initial.parsed.challenges);
  const [learned, setLearned] = useState(initial.parsed.learned);

  const [busy, setBusy] = useState<AfterSave | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [error, setError] = useState("");

  const effectiveSlug = slugTouched ? slug : slugify(title) || slug;

  async function persist(draftAfter: boolean, after: AfterSave) {
    setBusy(after);
    setError("");
    try {
      const payload = {
        slug: effectiveSlug,
        frontmatter: { title, summary, status, year, stack, repo, live, featured, draft: draftAfter },
        parsed: { overview, challenges, learned },
      };
      const url = initial.mode === "new" ? "/api/editor/projects" : `/api/editor/projects/${initial.slug}`;
      const method = initial.mode === "new" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
      const data = (await res.json()) as { slug: string };
      setSavedAt(Date.now());

      if (after === "preview") {
        router.push(`/editor/preview/projects/${data.slug}`);
      } else if (after === "publish") {
        router.push(`/projects/${data.slug}`);
      } else if (initial.mode === "new") {
        router.replace(`/editor/projects/${data.slug}`);
      } else {
        router.refresh();
      }
    } catch (e) {
      setError(String((e as Error).message));
    } finally {
      setBusy(null);
    }
  }

  function updateChallenge(i: number, patch: Partial<ChallengeEntry>) {
    setChallenges((arr) => arr.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));
  }
  function addChallenge() {
    setChallenges((arr) => [...arr, { title: "", body: "" }]);
  }
  function removeChallenge(i: number) {
    setChallenges((arr) => arr.filter((_, idx) => idx !== i));
  }
  function moveChallenge(i: number, dir: -1 | 1) {
    setChallenges((arr) => {
      const next = [...arr];
      const j = i + dir;
      if (j < 0 || j >= next.length) return arr;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  return (
    <div
      style={{
        maxWidth: "880px",
        margin: "0 auto",
        padding: "clamp(5rem, 8vw, 7rem) 1.25rem 5rem",
      }}
    >
      <Toolbar
        mode={initial.mode}
        slug={effectiveSlug}
        busy={busy}
        savedAt={savedAt}
        onSaveDraft={() => persist(true, "stay")}
        onPreview={() => persist(true, "preview")}
        onPublish={() => persist(false, "publish")}
      />

      {error && (
        <div
          style={{
            marginTop: "1rem",
            padding: "0.8rem 1rem",
            border: "1px solid var(--color-error)",
            borderRadius: "var(--radius-sm)",
            background: "color-mix(in srgb, var(--color-error) 10%, transparent)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            color: "var(--color-error)",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginTop: "1.5rem" }}>
        <TextField label="Title" value={title} onChange={setTitle} placeholder="Project name" />

        <TextField
          label="Slug"
          value={slugTouched ? slug : slugify(title) || slug}
          onChange={(v) => {
            setSlug(v);
            setSlugTouched(true);
          }}
          mono
          hint={slugTouched ? "manual" : "auto from title"}
        />

        <TextField label="Summary" value={summary} onChange={setSummary} placeholder="One-line description" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <span style={labelStyle}>Status</span>
            <select value={status} onChange={(e) => setStatus(e.target.value as Status)} style={selectStyle}>
              <option value="complete">complete</option>
              <option value="in-progress">in-progress</option>
              <option value="archived">archived</option>
            </select>
          </label>
          <TextField label="Year" value={year} onChange={setYear} mono />
        </div>

        <ChipInput label="Stack" values={stack} onChange={setStack} placeholder="add a tech" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <TextField label="Repo" value={repo} onChange={setRepo} mono placeholder="https://github.com/…" />
          <TextField label="Live" value={live} onChange={setLive} mono placeholder="https://…" />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <input
            id="featured"
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            style={{ width: "1rem", height: "1rem", accentColor: "var(--color-accent)" }}
          />
          <label htmlFor="featured" style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--color-text-secondary)" }}>
            featured (shown on home page)
          </label>
        </div>

        <SectionDivider label="Overview" />
        <MarkdownField value={overview} onChange={setOverview} minHeight={140} placeholder="First paragraph is highlighted on the live page." />

        <SectionDivider label="Challenges" />
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {challenges.map((c, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: order-dependent
            <div key={i} style={challengeCardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--color-accent)",
                    opacity: 0.6,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div style={{ flex: 1 }} />
                <IconBtn label="up" onClick={() => moveChallenge(i, -1)} disabled={i === 0}>
                  ↑
                </IconBtn>
                <IconBtn label="down" onClick={() => moveChallenge(i, 1)} disabled={i === challenges.length - 1}>
                  ↓
                </IconBtn>
                <IconBtn label="remove" onClick={() => removeChallenge(i)}>
                  ×
                </IconBtn>
              </div>
              <TextField label="Title" value={c.title} onChange={(v) => updateChallenge(i, { title: v })} />
              <div style={{ height: "0.5rem" }} />
              <MarkdownField label="Body" value={c.body} onChange={(v) => updateChallenge(i, { body: v })} minHeight={100} />
            </div>
          ))}
          <button type="button" onClick={addChallenge} style={addBtnStyle}>
            + add challenge
          </button>
        </div>

        <SectionDivider label="What I Learned" />
        <MarkdownField value={learned} onChange={setLearned} minHeight={140} placeholder="First paragraph is italicized on the live page." />
      </div>
    </div>
  );
}

function Toolbar({
  mode,
  slug,
  busy,
  savedAt,
  onSaveDraft,
  onPreview,
  onPublish,
}: {
  mode: "new" | "edit";
  slug: string;
  busy: AfterSave | null;
  savedAt: number | null;
  onSaveDraft: () => void;
  onPreview: () => void;
  onPublish: () => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
      <Link href="/editor" style={backStyle}>
        <span style={{ fontSize: "1rem" }}>←</span>
        <span>back</span>
      </Link>

      <span style={{ color: "var(--color-border)", opacity: 0.6 }}>·</span>

      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.72rem",
          color: "var(--color-text-muted)",
        }}
      >
        {mode === "new" ? "new project" : slug}
      </span>

      <div style={{ flex: 1 }} />

      {savedAt && !busy && <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-success)" }}>saved</span>}

      <button type="button" onClick={onSaveDraft} disabled={busy !== null} style={ghostBtnStyle}>
        {busy === "stay" ? "saving…" : "Save Draft"}
      </button>
      <button type="button" onClick={onPreview} disabled={busy !== null} style={ghostBtnStyle}>
        {busy === "preview" ? "saving…" : "Preview"}
      </button>
      <button type="button" onClick={onPublish} disabled={busy !== null} style={primaryBtnStyle}>
        {busy === "publish" ? "publishing…" : "Publish"}
      </button>
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.5rem" }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "var(--color-text-primary)",
          margin: 0,
        }}
      >
        {label}
      </h2>
      <div
        style={{
          flex: 1,
          height: "1px",
          background: "linear-gradient(to right, var(--color-accent-dim), transparent)",
        }}
      />
    </div>
  );
}

function IconBtn({ children, onClick, disabled, label }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      style={{
        background: "none",
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "var(--radius-sm)",
        color: "var(--color-text-muted)",
        width: "1.75rem",
        height: "1.75rem",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        fontSize: "0.85rem",
        lineHeight: 1,
      }}
    >
      {children}
    </button>
  );
}

const backStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  fontFamily: "var(--font-mono)",
  fontSize: "0.78rem",
  color: "var(--color-text-secondary)",
  textDecoration: "none",
  padding: "0.45rem 0.7rem",
  border: "1px solid var(--color-border-subtle)",
  borderRadius: "var(--radius-sm)",
  background: "var(--color-surface)",
};

const ghostBtnStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.75rem",
  padding: "0.5rem 0.95rem",
  background: "var(--color-surface)",
  color: "var(--color-text-primary)",
  border: "1px solid var(--color-border-subtle)",
  borderRadius: "var(--radius-sm)",
  cursor: "pointer",
};

const primaryBtnStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.75rem",
  padding: "0.5rem 1.1rem",
  background: "var(--color-accent)",
  color: "white",
  border: "none",
  borderRadius: "var(--radius-sm)",
  fontWeight: 600,
  cursor: "pointer",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.7rem",
  color: "var(--color-text-muted)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const selectStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.85rem",
  padding: "0.6rem 0.85rem",
  background: "var(--color-surface)",
  border: "1px solid var(--color-border-subtle)",
  borderRadius: "var(--radius-sm)",
  color: "var(--color-text-primary)",
  outline: "none",
};

const challengeCardStyle: React.CSSProperties = {
  padding: "1rem",
  background: "var(--color-surface)",
  border: "1px solid var(--color-border-subtle)",
  borderRadius: "var(--radius-md)",
};

const addBtnStyle: React.CSSProperties = {
  background: "none",
  border: "1px dashed var(--color-border-subtle)",
  borderRadius: "var(--radius-sm)",
  color: "var(--color-text-muted)",
  padding: "0.6rem",
  fontFamily: "var(--font-mono)",
  fontSize: "0.75rem",
  cursor: "pointer",
};
