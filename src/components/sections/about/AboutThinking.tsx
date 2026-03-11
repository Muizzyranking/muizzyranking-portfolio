import SectionWrapper from "@/components/ui/SectionWrapper";

const traits = [
  { label: "Naturally curious", sub: "about everything, annoyingly" },
  { label: "Detail oriented", sub: "the diff is always in the details" },
  { label: "Quietly observant", sub: "I noticed. I just didn't say anything." },
  { label: "Overconfident", sub: "usually justified, occasionally not" },
  { label: "Dad joke enthusiast", sub: "you have been warned" },
];

export default function AboutThinking() {
  return (
    <SectionWrapper>
      <div style={{ marginBlockEnd: "8rem" }}>

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
          <span style={{ color: "var(--color-accent)", opacity: 0.6, whiteSpace: "nowrap" }}>[ 01 ]</span>
          How I think
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
              I ask why until
              <br />
              <span style={{ color: "var(--color-text-secondary)", fontWeight: 400 }}>it makes sense.</span>
            </h2>

            <p style={{ fontSize: "0.95rem", color: "var(--color-text-primary)", lineHeight: 1.9, margin: "0 0 1.25rem" }}>
              Not because I am difficult — because I genuinely cannot move
              forward until I understand the thing underneath the thing. It
              makes me slower sometimes. It makes the work better always.
            </p>

            <p style={{ fontSize: "0.95rem", color: "var(--color-text-secondary)", lineHeight: 1.9, margin: 0 }}>
              I am a good listener. The kind that actually pays attention,
              not the kind that is waiting for their turn to talk. I notice
              details most people skip. I am also very bad at small talk,
              but I will happily go deep on distributed systems, history, or
              why the sky is actually not blue.{" "}
              <span style={{ color: "var(--color-text-muted)", fontStyle: "italic" }}>
                (It is. I just wanted to see if you were paying attention.)
              </span>
            </p>
          </div>

          {/* Trait cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {traits.map((trait, i) => (
              <div key={trait.label} style={{ position: "relative" }}>
                {/* Top line */}
                {i === 0 && <div style={{ height: "1px", background: "linear-gradient(to right, var(--color-accent-dim), var(--color-border-subtle))", marginBlockEnd: "0" }} />}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "1rem",
                  alignItems: "center",
                  paddingBlock: "0.875rem",
                  paddingInline: "1rem",
                  borderBottom: "1px solid var(--color-border-subtle)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)", fontSize: "0.65rem" }}>↳</span>
                    <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-primary)" }}>
                      {trait.label}
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
                    {trait.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
