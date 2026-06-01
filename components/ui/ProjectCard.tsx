import type { Project } from "@/lib/data/projects";
import { NodeMarker } from "./NodeMarker";

export function ProjectCard({ project }: { project: Project }) {
  const isLive = project.href !== "#";
  const external = isLive
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <article className="card">
      <NodeMarker />
      <div className="card-grid">
        <div className="card-main">
          <div className="card-index">{project.index}</div>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <div className="tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        <div className="card-side">
          <a
            className="view-live"
            href={project.href}
            aria-label={`View ${project.name} live${isLive ? " (opens in a new tab)" : ""}`}
            {...external}
          >
            View live{" "}
            <span className="gly" aria-hidden="true">
              →
            </span>
          </a>
          <span className="card-coord" aria-hidden="true">
            {project.coord}
          </span>
        </div>
      </div>
    </article>
  );
}
