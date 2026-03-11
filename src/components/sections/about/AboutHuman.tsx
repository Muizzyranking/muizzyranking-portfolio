import SectionWrapper from "@/components/ui/SectionWrapper";

const items = [
  { title: "Games", body: "Serious about them. Will not elaborate." },
  { title: "Comics & Animation", body: "Marvel, DC, the whole universe. I watch, I do not read. The distinction matters to nobody but me." },
  { title: "Hobby hopping", body: "I have started many things. I have intentions about all of them. Time is a finite resource." },
  { title: "Going out", body: "I love it. I also dread it. Both are true simultaneously. I have made peace with this." },
  { title: "History & Science", body: "Earth, space, how things actually work. The world is more interesting when you ask why." },
  { title: "Dad jokes", body: "Not everyone gets them. The right people always do. You know who you are." },
];

export default function AboutHuman() {
  return (
    <SectionWrapper>
      <div>

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
          <span style={{ color: "var(--color-accent)", opacity: 0.6, whiteSpace: "nowrap" }}>[ 05 ]</span>
          Outside the terminal
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
          gap: "1px",
          backgroundColor: "var(--color-border-subtle)",
          border: "1px solid var(--color-border-subtle)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
        }}>
          {items.map((item) => (
            <div key={item.title} style={{
              padding: "1.5rem",
              backgroundColor: "var(--color-surface)",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Corner accent */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "2px",
                height: "24px",
                background: "linear-gradient(to bottom, var(--color-accent), transparent)",
              }} />

              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
                margin: "0 0 0.6rem",
                fontWeight: 500,
              }}>
                {item.title}
              </p>
              <p style={{
                fontSize: "0.875rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
                margin: 0,
              }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Terminal footer */}
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          color: "var(--color-text-muted)",
          marginBlockStart: "3rem",
          opacity: 0.35,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}>
          <span style={{ color: "var(--color-accent)" }}>$</span>
          cat about.txt | tail -n 1 — that's all.
        </p>
      </div>
    </SectionWrapper>
  );
}
