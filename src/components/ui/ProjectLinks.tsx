"use client";

type Props = {
  repo: string;
  live: string;
};

export default function ProjectLinks({ repo, live }: Props) {
  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      {repo && (
        <a
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            paddingInline: "1.25rem",
            paddingBlock: "0.6rem",
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--color-text-secondary)",
            letterSpacing: "0.04em",
            transition: "border-color 0.2s ease, color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--color-accent)";
            e.currentTarget.style.color = "var(--color-accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--color-border)";
            e.currentTarget.style.color = "var(--color-text-secondary)";
          }}
        >
          ↗ Repository
        </a>
      )}

      {live && (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            paddingInline: "1.25rem",
            paddingBlock: "0.6rem",
            backgroundColor: "var(--color-accent)",
            borderRadius: "var(--radius-md)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--color-background)",
            fontWeight: 600,
            letterSpacing: "0.04em",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.85";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          ↗ Live
        </a>
      )}
    </div>
  );
}
