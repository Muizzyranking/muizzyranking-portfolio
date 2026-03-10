import ExperienceList from "@/components/ui/ExperienceList";
import { getAllExperience } from "@/lib/experience";

export default function Experience() {
  const experiences = getAllExperience();

  return (
    <section className="section">
      <div className="container-main">
        <div style={{ marginBlockEnd: "3rem" }}>
          <p className="mono-label" style={{ marginBlockEnd: "0.5rem" }}>
            Work History
          </p>
          <h2 style={{ margin: 0 }}>Experience</h2>
        </div>

        <ExperienceList experiences={experiences} />
      </div>
    </section>
  );
}
