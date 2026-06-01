/**
 * Page footer / drawing title-block. A direct child of <main> with no
 * sectioning ancestor, so it resolves to the contentinfo landmark.
 */
export function Footer() {
  return (
    <footer className="footer-line">
      <span>© 2026 Andre Sha · Built with Next.js</span>
      <span className="eof">x: 040 — 1240 · eof</span>
    </footer>
  );
}
