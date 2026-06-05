import type { AdrStatus, RfcStatus } from "@/lib/case-studies";

/**
 * Mono status pill for ADRs and RFCs. Tone is keyed off a lowercased
 * `data-status` attribute so colour is mapped in CSS from existing tokens —
 * no new hex values. Active states (Accepted/Final) read accent; provisional
 * ones (Proposed/Draft/Review) read muted; retired ones (Superseded/Deprecated/
 * Rejected/Withdrawn) read dim with a dashed border.
 */
export function StatusBadge({ status }: { status: AdrStatus | RfcStatus }) {
  return (
    <span className="status-badge" data-status={status.toLowerCase()}>
      <span className="sb-dot" aria-hidden="true" />
      {status}
    </span>
  );
}
