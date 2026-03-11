export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: "1px solid var(--color-border-subtle)", marginTop: "auto" }}>
      <div className="container-main" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBlock: "1.5rem",
        gap: "1rem",
      }}>

        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.72rem",
          color: "var(--color-text-muted)",
          letterSpacing: "0.04em",
        }}>
          © {year}{" "}
          <span style={{ color: "var(--color-text-secondary)" }}>Muiz Oyebowale</span>
        </span>

        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          color: "var(--color-text-secondary)",
          opacity: 0.7,
          letterSpacing: "0.04em",
        }}>
          built with intention, not a template
        </span>

        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.72rem",
          color: "var(--color-accent)",
          letterSpacing: "0.06em",
        }}>
          :wq
        </span>

      </div>
    </footer>
  );
}
