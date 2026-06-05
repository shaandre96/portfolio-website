import Link from "next/link";
import { type CaseStudyMeta, TYPE_BADGES } from "@/lib/case-studies";
import { formatDate } from "@/lib/date";
import { NodeMarker } from "./NodeMarker";

/**
 * Listing card for one case study. Mirrors ProjectCard's blueprint structure
 * but links internally to the post and leads with a type badge + date.
 */
export function CaseStudyCard({ study }: { study: CaseStudyMeta }) {
  return (
    <article className="card cs-card">
      <NodeMarker />
      <Link
        className="cs-card-link"
        href={`/case-studies/${study.slug}`}
        aria-label={`Read: ${study.title}`}
      >
        <div className="card-grid">
          <div className="card-main">
            <div className="card-index">
              {TYPE_BADGES[study.type]} · <time dateTime={study.date}>
                {formatDate(study.date)}
              </time>
            </div>
            <h3>{study.title}</h3>
            <p>{study.summary}</p>
            <div className="tags">
              {study.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="card-side">
            <span className="view-live">
              Read{" "}
              <span className="gly" aria-hidden="true">
                →
              </span>
            </span>
            <span className="card-coord" aria-hidden="true">
              {study.readingTime} min
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
