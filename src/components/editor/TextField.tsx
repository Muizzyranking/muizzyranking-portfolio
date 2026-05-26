"use client";

type Props = {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  type?: string;
  mono?: boolean;
};

export default function TextField({ label, value, onChange, placeholder, hint, type = "text", mono = false }: Props) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      {label && (
        <span style={labelStyle}>
          <span>{label}</span>
          {hint && <span style={hintStyle}>{hint}</span>}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          fontFamily: mono ? "var(--font-mono)" : "inherit",
          fontSize: mono ? "0.85rem" : "0.95rem",
          padding: "0.6rem 0.85rem",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border-subtle)",
          borderRadius: "var(--radius-sm)",
          color: "var(--color-text-primary)",
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
