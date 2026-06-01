import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/lib/data/projects";

export function SelectedWork() {
  return (
    <section
      className="section reveal"
      id="work"
      data-screen-label="Selected work"
      aria-labelledby="work-heading"
    >
      <SectionHeading
        label="node.02 — selected work"
        heading="Selected work"
        headingId="work-heading"
        right={
          <>
            x: 040 — 1240
            <br />
            03 nodes plotted
          </>
        }
      />
      <div className="work-list">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
