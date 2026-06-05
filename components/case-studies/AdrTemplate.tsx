import Link from "next/link";
import type { ReactNode } from "react";
import type { AdrMeta } from "@/lib/case-studies";
import { CaseStudyShell } from "./CaseStudyShell";
import { StatusBadge } from "./StatusBadge";

/** Architecture Decision Record: status badge + decider/supersede facts. */
export function AdrTemplate({
  meta,
  children,
}: {
  meta: AdrMeta;
  children: ReactNode;
}) {
  return (
    <CaseStudyShell
      meta={meta}
      header={
        <dl className="cs-facts">
          <div className="cs-fact">
            <dt>Status</dt>
            <dd>
              <StatusBadge status={meta.status} />
            </dd>
          </div>
          {meta.deciders && meta.deciders.length > 0 && (
            <div className="cs-fact">
              <dt>Deciders</dt>
              <dd>{meta.deciders.join(", ")}</dd>
            </div>
          )}
          {meta.supersedes && (
            <div className="cs-fact">
              <dt>Supersedes</dt>
              <dd>
                <Link href={`/case-studies/${meta.supersedes}`}>
                  {meta.supersedes}
                </Link>
              </dd>
            </div>
          )}
          {meta.supersededBy && (
            <div className="cs-fact">
              <dt>Superseded by</dt>
              <dd>
                <Link href={`/case-studies/${meta.supersededBy}`}>
                  {meta.supersededBy}
                </Link>
              </dd>
            </div>
          )}
        </dl>
      }
    >
      {children}
    </CaseStudyShell>
  );
}
