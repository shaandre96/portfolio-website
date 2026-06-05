import Link from "next/link";
import type { ReactNode } from "react";
import { type CaseStudyMeta, TYPE_BADGES } from "@/lib/case-studies";
import { formatDate } from "@/lib/date";

/**
 * Shared frame for every case study: back-link, blueprint eyebrow with a rail
 * terminus, title, summary, the metadata line (date · reading time · tags ·
 * repo), an optional type-specific `header` block, and the prose body. Lives
 * inside the `.main` rail context provided by the route layout.
 */
export function CaseStudyShell({
  meta,
  header,
  children,
}: {
  meta: CaseStudyMeta;
  /** Type-specific facts (status badge, deciders, …) rendered under the summary. */
  header?: ReactNode;
  /** Compiled MDX body. */
  children: ReactNode;
}) {
  return (
    <article className="section cs-article reveal" aria-labelledby="cs-title">
      <Link className="cs-back" href="/case-studies">
        <span aria-hidden="true">←</span> Case studies
      </Link>

      <header className="cs-header">
        <span className="eyebrow">
          <span className="terminus" aria-hidden="true" />
          <span className="tick" aria-hidden="true" />
          {TYPE_BADGES[meta.type]} · {meta.slug}
        </span>
        <h1 id="cs-title">{meta.title}</h1>
        <p className="cs-summary">{meta.summary}</p>

        <div className="cs-meta">
          <time dateTime={meta.date}>{formatDate(meta.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{meta.readingTime} min read</span>
          {meta.repo && (
            <>
              <span aria-hidden="true">·</span>
              <a
                href={meta.repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Source repository (opens in a new tab)"
              >
                Repository ↗
              </a>
            </>
          )}
        </div>

        {meta.tags.length > 0 && (
          <div className="tags cs-tags">
            {meta.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}

        {header}
      </header>

      <div className="prose">{children}</div>
    </article>
  );
}
