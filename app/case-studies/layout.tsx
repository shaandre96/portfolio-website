import type { ReactNode } from "react";
import { Footer } from "@/components/ui/Footer";

/**
 * Shared scaffold for the case-studies segment: the same `.shell > .main` rail
 * context as the home page (so node markers and the terminus align), a static
 * rail spine, and the footer title-block. `id="top"` is the skip-link target.
 */
export default function CaseStudiesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="shell">
      <main className="main" id="top">
        <span className="rail-spine cs-spine" aria-hidden="true" />
        {children}
        <Footer />
      </main>
    </div>
  );
}
