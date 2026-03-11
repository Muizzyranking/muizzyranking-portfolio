"use client";

export default function HashnodeLink() {
  return (
    <a
      href="https://muizzyranking.hashnode.dev"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.72rem",
        color: "var(--color-accent)",
        letterSpacing: "0.06em",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        opacity: 0.8,
        transition: "opacity 0.2s ease",
      }}
      onMouseEnter={(e) => {(e.currentTarget.style.opacity = "1")}}
      onMouseLeave={(e) => {(e.currentTarget.style.opacity = "0.8")}}
    >
      Also on Hashnode →
    </a>
  );
}
