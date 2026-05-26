"use client";

import { type KeyboardEvent, useState } from "react";

type Props = {
  label?: string;
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
};

export default function ChipInput({ label, values, onChange, placeholder }: Props) {
  const [draft, setDraft] = useState("");

  function commit() {
    const t = draft.trim();
    if (!t) return;
    if (values.includes(t)) {
      setDraft("");
      return;
    }
    onChange([...values, t]);
    setDraft("");
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commit();
    } else if (e.key === "Backspace" && draft === "" && values.length > 0) {
      onChange(values.slice(0, -1));
    }
  }

  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      {label && <span style={labelStyle}>{label}</span>}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.35rem",
          padding: "0.5rem 0.6rem",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border-subtle)",
          borderRadius: "var(--radius-sm)",
          minHeight: "2.5rem",
          alignItems: "center",
        }}
      >
        {values.map((v) => (
          <span key={v} style={chipStyle}>
            {v}
            <button type="button" onClick={() => onChange(values.filter((x) => x !== v))} style={chipRemoveStyle} aria-label={`remove ${v}`}>
              ×
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKey}
          onBlur={commit}
          placeholder={values.length === 0 ? placeholder : ""}
          style={{
            flex: 1,
            minWidth: "8rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--color-text-primary)",
            padding: "0.2rem 0",
          }}
        />
      </div>
    </label>
  );
}

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.7rem",
  color: "var(--color-text-muted)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const chipStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.3rem",
  fontFamily: "var(--font-mono)",
  fontSize: "0.72rem",
  color: "var(--color-text-secondary)",
  background: "var(--color-bg-elevated)",
  border: "1px solid var(--color-border-subtle)",
  borderRadius: "var(--radius-sm)",
  padding: "0.18rem 0.45rem",
};

const chipRemoveStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "var(--color-text-muted)",
  cursor: "pointer",
  fontSize: "0.9rem",
  lineHeight: 1,
  padding: 0,
};
