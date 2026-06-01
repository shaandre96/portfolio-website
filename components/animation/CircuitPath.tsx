/**
 * The dashed blueprint "circuit" that begins near the hero CTAs and routes to
 * the lower axis node. Decorative — hidden from assistive tech.
 */
export function CircuitPath() {
  return (
    <div className="circ">
      <span className="start" />
      <svg
        aria-hidden="true"
        viewBox="0 0 100 36"
        preserveAspectRatio="none"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeDasharray="4 4"
        vectorEffect="non-scaling-stroke"
      >
        <path d="M0 12 H46 V30 H100" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
