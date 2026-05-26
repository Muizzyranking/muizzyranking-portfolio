"use client";

type Props = {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  minHeight?: number;
  hint?: string;
};

export default function MarkdownField({ label, value, onChange, placeholder, minHeight = 180, hint }: Props) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      {label && (
        <span style={labelStyle}>
          <span>{label}</span>
          {hint && <span style={hintStyle}>{hint}</span>}
        </span>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          lineHeight: 1.65,
          padding: "0.85rem 1rem",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border-subtle)",
          borderRadius: "var(--radius-sm)",
          color: "var(--color-text-primary)",
          minHeight,
          resize: "vertical",
          outline: "none",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--color-accent-dim)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--color-border-subtle)";
        }}
      />
    </label>
  );
}

const labelStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontFamily: "var(--font-mono)",
  fontSize: "0.7rem",
  color: "var(--color-text-muted)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const hintStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.65rem",
  color: "var(--color-text-muted)",
  textTransform: "none",
  letterSpacing: 0,
  opacity: 0.7,
};
