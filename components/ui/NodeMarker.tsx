/** Decorative system-diagram node marker that taps off the circuit rail. */
export function NodeMarker({ className = "" }: { className?: string }) {
  return <span className={`rnode ${className}`.trim()} aria-hidden="true" />;
}
