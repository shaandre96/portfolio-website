import { NodeMarker } from "@/components/ui/NodeMarker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/lib/data/experience";

export function Experience() {
  return (
    <section
      className="section reveal"
      id="experience"
      data-screen-label="Experience"
      aria-labelledby="experience-heading"
    >
      <SectionHeading
        label="node.03 — experience"
        heading="Experience"
        headingId="experience-heading"
        right={
          <>
            x: 040 — 1240
            <br />
            03 roles plotted
          </>
        }
      />
      <div className="timeline">
        {experience.map((role) => (
          <div className="entry" key={`${role.title}-${role.date}`}>
            <NodeMarker />
            <div className="date">{role.date}</div>
            <h3>{role.title}</h3>
            <div className="co">{role.company}</div>
            <p>{role.scope}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
