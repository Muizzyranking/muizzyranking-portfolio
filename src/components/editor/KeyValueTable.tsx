"use client";

type Entry = { key: string; value: string };

type Props = {
  label?: string;
  entries: Entry[];
  onChange: (e: Entry[]) => void;
};

export default function KeyValueTable({ label, entries, onChange }: Props) {
  function update(i: number, patch: Partial<Entry>) {
    const next = entries.map((e, idx) => (idx === i ? { ...e, ...patch } : e));
    onChange(next);
  }

  function remove(i: number) {
    onChange(entries.filter((_, idx) => idx !== i));
  }

  function add() {
    onChange([...entries, { key: "", value: "" }]);
  }

  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      {label && <span style={labelStyle}>{label}</span>}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.4rem",
          padding: "0.6rem",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border-subtle)",
          borderRadius: "var(--radius-sm)",
        }}
      >
        {entries.length === 0 && (
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "var(--color-text-muted)",
              margin: 0,
              padding: "0.4rem 0",
            }}
          >
            No injections. Add a key/value pair to define `{`{`}
            {`{`}name{`}`}
            {`}`}` substitutions for this post.
          </p>
        )}
        {entries.map((e, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: order-only list
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto", gap: "0.4rem" }}>
            <input value={e.key} onChange={(ev) => update(i, { key: ev.target.value })} placeholder="key" style={cellStyle} />
            <input value={e.value} onChange={(ev) => update(i, { value: ev.target.value })} placeholder="value" style={cellStyle} />
            <button type="button" onClick={() => remove(i)} style={removeBtnStyle} aria-label="remove entry">
              ×
            </button>
          </div>
        ))}
        <button type="button" onClick={add} style={addBtnStyle}>
          + add entry
        </button>
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

const cellStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.78rem",
  padding: "0.45rem 0.6rem",
  background: "var(--color-bg-elevated)",
  border: "1px solid var(--color-border-subtle)",
  borderRadius: "var(--radius-sm)",
  color: "var(--color-text-primary)",
  outline: "none",
};

const removeBtnStyle: React.CSSProperties = {
  background: "none",
  border: "1px solid var(--color-border-subtle)",
  borderRadius: "var(--radius-sm)",
  color: "var(--color-text-muted)",
  cursor: "pointer",
  width: "2rem",
};

const addBtnStyle: React.CSSProperties = {
  background: "none",
  border: "1px dashed var(--color-border-subtle)",
  borderRadius: "var(--radius-sm)",
  color: "var(--color-text-muted)",
  padding: "0.4rem",
  fontFamily: "var(--font-mono)",
  fontSize: "0.72rem",
  cursor: "pointer",
};
