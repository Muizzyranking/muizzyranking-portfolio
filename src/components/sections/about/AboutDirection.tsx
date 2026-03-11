import SectionWrapper from "@/components/ui/SectionWrapper";

const directions = [
  { label: "AI × Backend", sub: "Where I'm pointing my learning" },
  { label: "Financial systems", sub: "Correctness is not optional" },
  { label: "Statistics", sub: "A quiet interest, getting louder" },
  { label: "African tech infra", sub: "Not a trend. A direction." },
];

export default function AboutDirection() {
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
          <span style={{ color: "var(--color-accent)", opacity: 0.6, whiteSpace: "nowrap" }}>[ 04 ]</span>
          Where I'm going
        </p>

        <div className="about-two-col">
          <div>
            <h2 style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              margin: "0 0 1.75rem",
              lineHeight: 1.1,
            }}>
              The interesting problems
              <br />
              <span style={{ color: "var(--color-text-secondary)", fontWeight: 400 }}>are in AI and finance.</span>
            </h2>

            <p style={{ fontSize: "0.95rem", color: "var(--color-text-primary)", lineHeight: 1.9, margin: "0 0 1.25rem" }}>
              I have always been drawn to systems where correctness is not
              optional — financial systems, data pipelines, infrastructure that
              other infrastructure depends on. The intersection of AI and
              backend engineering is where I am pointing my learning right now.
              Statistics has always been a quiet interest. It is becoming a louder one.
            </p>

            <p style={{ fontSize: "0.95rem", color: "var(--color-text-secondary)", lineHeight: 1.9, margin: 0 }}>
              There is also something larger I think about — Africa building its
              own software, its own AI, its own technical infrastructure. Not as
              a trend to observe. As a direction to contribute to. That ambition
              shapes the kind of engineer I am trying to become.
            </p>
          </div>

          {/* Direction cards — row style like traits */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {directions.map((item, i) => (
              <div key={item.label} style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "1rem",
                alignItems: "center",
                paddingBlock: "1rem",
                paddingInline: "1rem",
                borderTop: "1px solid var(--color-border-subtle)",
                borderBottom: i === directions.length - 1 ? "1px solid var(--color-border-subtle)" : "none",
                backgroundColor: i === 0 ? "color-mix(in srgb, var(--color-accent) 3%, transparent)" : "transparent",
                borderRadius: "var(--radius-sm)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)", fontSize: "0.65rem" }}>→</span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-primary)" }}>
                    {item.label}
                  </span>
                </div>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  color: "var(--color-text-muted)",
                  letterSpacing: "0.04em",
                  fontStyle: "italic",
                  whiteSpace: "nowrap",
                }}>
                  {item.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
