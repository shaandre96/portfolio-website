import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { AdrTemplate } from "@/components/case-studies/AdrTemplate";
import { BlogTemplate } from "@/components/case-studies/BlogTemplate";
import { mdxComponents } from "@/components/case-studies/mdxComponents";
import { RfcTemplate } from "@/components/case-studies/RfcTemplate";
import {
  getCaseStudyBySlug,
  getCaseStudySlugs,
} from "@/lib/case-studies";
import { site } from "@/lib/site";

// Only pre-rendered slugs are valid; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};

  const { meta } = study;
  const url = `${site.url}/case-studies/${meta.slug}`;
  return {
    title: meta.title,
    description: meta.summary,
    keywords: meta.tags,
    authors: [{ name: site.name, url: site.url }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: meta.title,
      description: meta.summary,
      publishedTime: meta.date,
      modifiedTime: meta.date,
      authors: [site.name],
      tags: meta.tags,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.summary,
      images: ["/opengraph-image"],
    },
  };
}

type CompileOptions = NonNullable<Parameters<typeof compileMDX>[0]["options"]>;

const mdxOptions: CompileOptions = {
  // Frontmatter is already parsed by the loader; the body is frontmatter-free.
  parseFrontmatter: false,
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      [
        rehypePrettyCode,
        {
          // Dual theme: tokens carry both colours as CSS vars; globals.css picks
          // one per `data-theme`. keepBackground off so our surface shows through.
          theme: { light: "github-light", dark: "github-dark" },
          keepBackground: false,
        },
      ],
    ],
  },
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const { meta } = study;
  const { content } = await compileMDX({
    source: study.content,
    options: mdxOptions,
    components: mdxComponents,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": meta.type === "blog" ? "BlogPosting" : "TechArticle",
    headline: meta.title,
    description: meta.summary,
    datePublished: meta.date,
    dateModified: meta.date,
    keywords: meta.tags.join(", "),
    url: `${site.url}/case-studies/${meta.slug}`,
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name, url: site.url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD built from validated frontmatter, no user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {meta.type === "adr" && (
        <AdrTemplate meta={meta}>{content}</AdrTemplate>
      )}
      {meta.type === "rfc" && (
        <RfcTemplate meta={meta}>{content}</RfcTemplate>
      )}
      {meta.type === "blog" && (
        <BlogTemplate meta={meta}>{content}</BlogTemplate>
      )}
    </>
  );
}
