// components/layout/Footer.tsx
// Simple, architectural. No noise.

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border-subtle)",
        padding: "2rem 0",
      }}
    >
      <div
        className="container-main"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--color-text-muted)",
            lineHeight: 1.6,
          }}
        >
          Built by{" "}
          <span style={{ color: "var(--color-accent)" }}>Muiz Oyebowale</span> ·
          Designed in the terminal, shipped to the browser.
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            color: "var(--color-text-muted)",
            letterSpacing: "0.08em",
          }}
        >
           
          © {year}
        </p>
<p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "var(--color-accent)",
              letterSpacing: "0.06em",
            }}
          >
            :wq 
          </p>
      </div>
    </footer>
  );
}
