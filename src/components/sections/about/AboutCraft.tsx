import SectionWrapper from "@/components/ui/SectionWrapper";

const buildItems = [
  "API systems with real security requirements",
  "Background job pipelines",
  "CLI tools and developer tooling",
  "Database schemas that age well",
  "Configurations dialed in just right",
  "Systems that fail gracefully",
];

const paragraphs = [
  "I gravitate toward backend work because I like things that are correct, not just things that look correct. APIs, background workers, authentication systems, database schemas — the parts that have to hold up under pressure, edge cases, and users doing exactly what you told them not to do.",
  "I have built CLI tools that only I use, written configurations that took longer to tune than the projects they configured, and spent entire evenings making something work correctly even though nobody would ever know it was wrong. That is just how the brain is wired.",
  "I still use Neovim. Not as a statement — I just genuinely have not found a reason to stop. The config is never finished. I am okay with that.",
];

export default function AboutCraft() {
  return (
    <SectionWrapper>
      <div style={{
        marginBlockEnd: "8rem",
        paddingBlockEnd: "5rem",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}>

        {/* Eyebrow */}
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.72rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--color-text-muted)",
          margin: "0 0 2rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}>
          <span style={{ color: "var(--color-accent)", opacity: 0.6, whiteSpace: "nowrap" }}>[ 02 ]</span>
          The craft
        </p>

        <div className="about-two-col">
          <div>
            {paragraphs.map((text, i) => (
              <p key={text} style={{
                fontSize: "0.95rem",
                color: i === 0 ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                lineHeight: 1.9,
                margin: 0,
                marginBlockEnd: i < paragraphs.length - 1 ? "1.25rem" : 0,
              }}>
                {text}
              </p>
            ))}
          </div>

          {/* Build list card */}
          <div style={{
            padding: "1.5rem",
            backgroundColor: "var(--color-surface)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border-subtle)",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Top accent line */}
            <div style={{
              position: "absolute",
              top: 0,
              left: "1.5rem",
              right: "1.5rem",
              height: "1px",
              background: "linear-gradient(to right, var(--color-accent), transparent)",
            }} />

            {/* Corner glow */}
            <div style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "100px",
              height: "100px",
              background: "radial-gradient(circle at top right, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 70%)",
              pointerEvents: "none",
            }} />

            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              margin: "0 0 1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}>
              <span style={{ color: "var(--color-accent)", opacity: 0.6 }}>▸</span>
              Things I enjoy building
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {buildItems.map((item, i) => (
                <div key={item} style={{
                  display: "grid",
                  gridTemplateColumns: "1rem 1fr",
                  gap: "0.75rem",
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.5,
                  paddingBlock: "0.6rem",
                  borderBottom: i < buildItems.length - 1 ? "1px solid var(--color-border-subtle)" : "none",
                }}>
                  <span style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)", fontSize: "0.65rem", paddingTop: "0.15rem" }}>↳</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
