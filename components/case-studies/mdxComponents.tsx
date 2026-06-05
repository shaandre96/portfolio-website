import Link from "next/link";
import type { AnchorHTMLAttributes, ImgHTMLAttributes, ReactNode } from "react";

/**
 * Components injected into the MDX scope at compile time. Two jobs:
 *  1. Typed section components (`<Context>`, `<Motivation>`, …) that give ADRs and
 *     RFCs a consistent labelled skeleton — see RFC-0001.
 *  2. A couple of element overrides where plain HTML isn't enough (links).
 * Everything else (headings, lists, tables, code) is styled via `.prose` in
 * globals.css, so there's no markup to drift.
 */

/** One blueprint-labelled section. The single primitive every typed section uses. */
function LabeledSection({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="labeled-section">
      <span className="ls-label mono">{label}</span>
      <div className="ls-body">{children}</div>
    </section>
  );
}

// ADR sections
const Context = ({ children }: { children: ReactNode }) => (
  <LabeledSection label="Context">{children}</LabeledSection>
);
const Decision = ({ children }: { children: ReactNode }) => (
  <LabeledSection label="Decision">{children}</LabeledSection>
);
const Consequences = ({ children }: { children: ReactNode }) => (
  <LabeledSection label="Consequences">{children}</LabeledSection>
);

// RFC sections
const Motivation = ({ children }: { children: ReactNode }) => (
  <LabeledSection label="Motivation">{children}</LabeledSection>
);
const Design = ({ children }: { children: ReactNode }) => (
  <LabeledSection label="Detailed design">{children}</LabeledSection>
);
const Alternatives = ({ children }: { children: ReactNode }) => (
  <LabeledSection label="Alternatives considered">{children}</LabeledSection>
);
const Drawbacks = ({ children }: { children: ReactNode }) => (
  <LabeledSection label="Drawbacks">{children}</LabeledSection>
);
const UnresolvedQuestions = ({ children }: { children: ReactNode }) => (
  <LabeledSection label="Unresolved questions">{children}</LabeledSection>
);

/** Anchor override: internal links route through next/link; external links open
 *  in a new tab with the right rel and an accessible hint. */
function MdxLink({
  href = "",
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="cs-ext" aria-hidden="true">
        {" ↗"}
      </span>
    </a>
  );
}

function MdxImage({ alt = "", ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <figure className="cs-figure">
      {/* biome-ignore lint/performance/noImgElement: MDX content images have no known dimensions for next/image */}
      <img alt={alt} loading="lazy" {...rest} />
    </figure>
  );
}

export const mdxComponents = {
  a: MdxLink,
  img: MdxImage,
  Context,
  Decision,
  Consequences,
  Motivation,
  Design,
  Alternatives,
  Drawbacks,
  UnresolvedQuestions,
};
