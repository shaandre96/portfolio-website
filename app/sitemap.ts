import type { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts: MetadataRoute.Sitemap = getAllCaseStudies().map((study) => ({
    url: `${site.url}/case-studies/${study.slug}`,
    lastModified: new Date(study.date),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/case-studies`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts,
  ];
}
