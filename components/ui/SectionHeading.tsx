import type { ReactNode } from "react";
import { NodeMarker } from "./NodeMarker";

interface SectionHeadingProps {
  /** Mono node label, e.g. "node.02 — selected work" */
  label: string;
  heading: string;
  /** id for the <h2>, so the section can reference it via aria-labelledby. */
  headingId?: string;
  /** Decorative mono coordinate annotation on the right. */
  right?: ReactNode;
  /** Whether the eyebrow carries a rail node marker. */
  node?: boolean;
}

export function SectionHeading({
  label,
  heading,
  headingId,
  right,
  node = false,
}: SectionHeadingProps) {
  return (
    <div className="sec-head">
      <div>
        <span className="eyebrow">
          {node && <NodeMarker />}
          <span className="tick" aria-hidden="true" />
          {label}
        </span>
        <h2 id={headingId}>{heading}</h2>
      </div>
      {right && (
        <div className="right" aria-hidden="true">
          {right}
        </div>
      )}
    </div>
  );
}
