/** Format an ISO date (YYYY-MM-DD) as "5 Jun 2026", pinned to UTC so a
 *  date-only string never drifts by a day across timezones. */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
