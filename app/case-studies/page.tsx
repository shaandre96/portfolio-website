import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  type CaseStudyType,
  getAllCaseStudies,
  TYPE_LABELS,
} from "@/lib/case-studies";
import { site } from "@/lib/site";

const PAGE_TITLE = "Case studies";
const PAGE_DESCRIPTION =
  "RFCs, Architecture Decision Records, and notes on the systems I'm building in public.";
const PAGE_URL = `${site.url}/case-studies`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: `${PAGE_TITLE} — ${site.name}`,
    description: PAGE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} — ${site.name}`,
    description: PAGE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

// Order groups deliberately: decisions, proposals, then narrative.
const GROUP_ORDER: CaseStudyType[] = ["adr", "rfc", "blog"];

export default function CaseStudiesIndex() {
  const studies = getAllCaseStudies();
  const grouped = GROUP_ORDER.map((type) => ({
    type,
    items: studies.filter((study) => study.type === type),
  })).filter((group) => group.items.length > 0);

  return (
    <>
      <section className="section cs-intro reveal" aria-labelledby="cs-index-title">
        <span className="eyebrow">
          <span className="rnode" aria-hidden="true" />
          <span className="tick" aria-hidden="true" />
          node · writing
        </span>
        <h1 id="cs-index-title">{PAGE_TITLE}</h1>
        <p className="cs-lead">{PAGE_DESCRIPTION}</p>
      </section>

      {grouped.map(({ type, items }) => (
        <section
          className="section reveal"
          key={type}
          aria-labelledby={`group-${type}`}
        >
          <SectionHeading
            label={`node — ${type}`}
            heading={TYPE_LABELS[type]}
            headingId={`group-${type}`}
            node
            right={`${String(items.length).padStart(2, "0")} ${
              items.length === 1 ? "entry" : "entries"
            }`}
          />
          <div className="work-list">
            {items.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </section>
      ))}

      {studies.length === 0 && (
        <section className="section reveal">
          <p className="cs-empty">No case studies published yet — check back soon.</p>
        </section>
      )}
    </>
  );
}
