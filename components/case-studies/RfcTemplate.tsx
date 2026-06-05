import type { ReactNode } from "react";
import type { RfcMeta } from "@/lib/case-studies";
import { CaseStudyShell } from "./CaseStudyShell";
import { StatusBadge } from "./StatusBadge";

/** Request for Comments: number, status badge, and authors. */
export function RfcTemplate({
  meta,
  children,
}: {
  meta: RfcMeta;
  children: ReactNode;
}) {
  return (
    <CaseStudyShell
      meta={meta}
      header={
        <dl className="cs-facts">
          {meta.rfcNumber && (
            <div className="cs-fact">
              <dt>RFC</dt>
              <dd>#{meta.rfcNumber}</dd>
            </div>
          )}
          <div className="cs-fact">
            <dt>Status</dt>
            <dd>
              <StatusBadge status={meta.status} />
            </dd>
          </div>
          {meta.authors && meta.authors.length > 0 && (
            <div className="cs-fact">
              <dt>Authors</dt>
              <dd>{meta.authors.join(", ")}</dd>
            </div>
          )}
        </dl>
      }
    >
      {children}
    </CaseStudyShell>
  );
}
