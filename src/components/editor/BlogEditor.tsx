"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ChipInput from "./ChipInput";
import KeyValueTable from "./KeyValueTable";
import MarkdownField from "./MarkdownField";
import TextField from "./TextField";

type InjectEntry = { key: string; value: string };

export type BlogEditorInitial = {
  mode: "new" | "edit";
  slug: string;
  year: number;
  month: number;
  frontmatter: {
    title: string;
    summary: string;
    day: number;
    time: string;
    categories: string[];
    draft: boolean;
    slug: string;
    inject: InjectEntry[];
  };
  body: string;
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

export default function BlogEditor({ initial }: { initial: BlogEditorInitial }) {
  const router = useRouter();

  const [title, setTitle] = useState(initial.frontmatter.title);
  const [summary, setSummary] = useState(initial.frontmatter.summary);
  const [year, setYear] = useState<number>(initial.year);
  const [month, setMonth] = useState<number>(initial.month);
  const [day, setDay] = useState<number>(initial.frontmatter.day);
  const [time, setTime] = useState(initial.frontmatter.time);
  const [categories, setCategories] = useState<string[]>(initial.frontmatter.categories);
  const [slug, setSlug] = useState(initial.frontmatter.slug || initial.slug);
  const [slugTouched, setSlugTouched] = useState<boolean>(initial.mode === "edit");
  const [injectEntries, setInjectEntries] = useState<InjectEntry[]>(initial.frontmatter.inject);
  const [body, setBody] = useState(initial.body);

  const [busy, setBusy] = useState<AfterSave | null>(null);
  const [error, setError] = useState("");
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const effectiveSlug = slugTouched ? slug : slugify(title) || slug;

  async function persist(draftAfter: boolean, after: AfterSave) {
    setBusy(after);
    setError("");
    try {
      const payload = {
        year,
        month,
        slug: effectiveSlug,
        frontmatter: {
          title,
          summary,
          day,
          time,
          categories,
          draft: draftAfter,
          slug: effectiveSlug,
          inject: injectEntries.reduce<Record<string, string>>((acc, e) => {
            if (e.key) acc[e.key] = e.value;
            return acc;
          }, {}),
        },
        body,
      };
      const url = initial.mode === "new" ? "/api/editor/posts" : `/api/editor/posts/${initial.slug}`;
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
        router.push(`/editor/preview/blog/${data.slug}`);
      } else if (after === "publish") {
        router.push(`/blog/${data.slug}`);
      } else if (initial.mode === "new") {
        router.replace(`/editor/blog/${data.slug}`);
      } else {
        router.refresh();
      }
    } catch (e) {
      setError(String((e as Error).message));
    } finally {
      setBusy(null);
    }
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
        <TextField label="Title" value={title} onChange={setTitle} placeholder="A clear, terse title" />

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

        <TextField label="Summary" value={summary} onChange={setSummary} placeholder="One sentence, dry voice" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0.75rem" }}>
          <TextField label="Year" value={String(year)} onChange={(v) => setYear(Number(v) || year)} mono />
          <TextField
            label="Month"
            value={String(month).padStart(2, "0")}
            onChange={(v) => setMonth(Math.max(1, Math.min(12, Number(v) || month)))}
            mono
          />
          <TextField label="Day" value={String(day)} onChange={(v) => setDay(Number(v) || day)} mono />
          <TextField label="Time" value={time} onChange={setTime} mono hint="HH:MM" />
        </div>

        <ChipInput label="Categories" values={categories} onChange={setCategories} placeholder="add a category" />

        <KeyValueTable label="Injections" entries={injectEntries} onChange={setInjectEntries} />

        <MarkdownField
          label="Body"
          value={body}
          onChange={setBody}
          placeholder={"# Markdown\n\nWrite your post here..."}
          minHeight={500}
          hint="MDX — supports {{var}} injections"
        />
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        flexWrap: "wrap",
      }}
    >
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
        {mode === "new" ? "new post" : slug}
      </span>

      <div style={{ flex: 1 }} />

      {savedAt && !busy && (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-success)" }}>
          saved
        </span>
      )}

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
