import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillGroup } from "@/components/ui/SkillGroup";
import { skillGroups } from "@/lib/data/skills";

export function Skills() {
  return (
    <section
      className="section reveal"
      id="skills"
      data-screen-label="Skills"
      aria-labelledby="skills-heading"
    >
      <SectionHeading
        label="node.04 — skills"
        heading="Skills"
        headingId="skills-heading"
        node
        right={
          <>
            x: 040 — 1240
            <br />
            04 clusters
          </>
        }
      />
      <div className="spec">
        {skillGroups.map((group) => (
          <SkillGroup key={group.label} group={group} />
        ))}
      </div>
    </section>
  );
}
