export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border-subtle)",
        marginTop: "auto",
      }}
    >
      <div
        className="container-main"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBlock: "1.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--color-text-muted)",
          }}
        >
          © {year} Muiz Oyebowale
        </span>

        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--color-text-muted)",
          }}
        >
          {/* The only config that's never done */}
          built with intention, not a template
        </span>
      </div>
    </footer>
  );
}
