/**
 * Case-studies content collection.
 *
 * Long-form technical writing — ADRs, RFCs, and blog posts — authored as MDX
 * files in `content/case-studies/*.mdx`. This module is the server-only loader:
 * it reads the filesystem, validates frontmatter into typed metadata, and is
 * consumed by the `/case-studies` route segment. Never import it from a Client
 * Component (it touches `node:fs`).
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

export type CaseStudyType = "adr" | "rfc" | "blog";

export type AdrStatus =
  | "Proposed"
  | "Accepted"
  | "Superseded"
  | "Deprecated"
  | "Rejected";

export type RfcStatus =
  | "Draft"
  | "Review"
  | "Accepted"
  | "Final"
  | "Withdrawn";

interface BaseMeta {
  /** Filename without the `.mdx` extension; also the URL segment. */
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  summary: string;
  tags: string[];
  /** Optional link to the public repo the piece is about. */
  repo?: string;
  /** Draft posts are hidden from listing + sitemap in production. */
  draft: boolean;
  /** Estimated reading time in whole minutes, derived from word count. */
  readingTime: number;
}

export interface AdrMeta extends BaseMeta {
  type: "adr";
  status: AdrStatus;
  deciders?: string[];
  /** Slug of an ADR this one supersedes. */
  supersedes?: string;
  /** Slug of an ADR that supersedes this one. */
  supersededBy?: string;
}

export interface RfcMeta extends BaseMeta {
  type: "rfc";
  status: RfcStatus;
  authors?: string[];
  rfcNumber?: string;
}

export interface BlogMeta extends BaseMeta {
  type: "blog";
}

export type CaseStudyMeta = AdrMeta | RfcMeta | BlogMeta;

export interface CaseStudy {
  meta: CaseStudyMeta;
  /** Raw MDX body (frontmatter stripped), ready for compileMDX. */
  content: string;
}

/** Human-facing kind label, e.g. for index group headings. */
export const TYPE_LABELS: Record<CaseStudyType, string> = {
  adr: "Architecture Decision Records",
  rfc: "Requests for Comments",
  blog: "Writing",
};

/** Short badge label used on cards and article headers. */
export const TYPE_BADGES: Record<CaseStudyType, string> = {
  adr: "ADR",
  rfc: "RFC",
  blog: "Post",
};

const CONTENT_DIR = join(process.cwd(), "content", "case-studies");
const WORDS_PER_MINUTE = 200;

const ADR_STATUSES: readonly AdrStatus[] = [
  "Proposed",
  "Accepted",
  "Superseded",
  "Deprecated",
  "Rejected",
];
const RFC_STATUSES: readonly RfcStatus[] = [
  "Draft",
  "Review",
  "Accepted",
  "Final",
  "Withdrawn",
];

type RawFrontmatter = Record<string, unknown>;

function fail(slug: string, message: string): never {
  throw new Error(`[case-studies] ${slug}.mdx — ${message}`);
}

function reqString(data: RawFrontmatter, slug: string, key: string): string {
  const value = data[key];
  if (typeof value !== "string" || value.trim() === "") {
    fail(slug, `missing required string field "${key}"`);
  }
  return value;
}

/** YAML parses an unquoted `2026-06-05` into a Date; accept either form and
 *  normalize to an ISO `YYYY-MM-DD` string. */
function reqDate(data: RawFrontmatter, slug: string, key: string): string {
  const value = data[key];
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" && value.trim() !== "") return value;
  fail(slug, `missing or invalid date field "${key}"`);
}

function optString(data: RawFrontmatter, key: string): string | undefined {
  const value = data[key];
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
}

function strArray(data: RawFrontmatter, key: string): string[] {
  const value = data[key];
  if (value === undefined) return [];
  if (
    !Array.isArray(value) ||
    !value.every((item): item is string => typeof item === "string")
  ) {
    return [];
  }
  return value;
}

function optStrArray(
  data: RawFrontmatter,
  key: string,
): string[] | undefined {
  const value = data[key];
  if (value === undefined) return undefined;
  if (
    !Array.isArray(value) ||
    !value.every((item): item is string => typeof item === "string")
  ) {
    return undefined;
  }
  return value.length > 0 ? value : undefined;
}

function readingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function normalizeMeta(
  slug: string,
  data: RawFrontmatter,
  content: string,
): CaseStudyMeta {
  const type = data.type;
  if (type !== "adr" && type !== "rfc" && type !== "blog") {
    fail(slug, `field "type" must be one of "adr" | "rfc" | "blog"`);
  }

  const base: BaseMeta = {
    slug,
    title: reqString(data, slug, "title"),
    date: reqDate(data, slug, "date"),
    summary: reqString(data, slug, "summary"),
    tags: strArray(data, "tags"),
    repo: optString(data, "repo"),
    draft: data.draft === true,
    readingTime: readingMinutes(content),
  };

  if (type === "adr") {
    const status = reqString(data, slug, "status");
    if (!ADR_STATUSES.includes(status as AdrStatus)) {
      fail(slug, `ADR "status" must be one of ${ADR_STATUSES.join(" | ")}`);
    }
    return {
      ...base,
      type: "adr",
      status: status as AdrStatus,
      deciders: optStrArray(data, "deciders"),
      supersedes: optString(data, "supersedes"),
      supersededBy: optString(data, "supersededBy"),
    };
  }

  if (type === "rfc") {
    const status = reqString(data, slug, "status");
    if (!RFC_STATUSES.includes(status as RfcStatus)) {
      fail(slug, `RFC "status" must be one of ${RFC_STATUSES.join(" | ")}`);
    }
    return {
      ...base,
      type: "rfc",
      status: status as RfcStatus,
      authors: optStrArray(data, "authors"),
      rfcNumber: optString(data, "rfcNumber"),
    };
  }

  return { ...base, type: "blog" };
}

/** Slugs of every `.mdx` file in the collection (no parsing). */
export function getCaseStudySlugs(): string[] {
  return readdirSync(CONTENT_DIR)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""));
}

/** A single post: validated metadata + raw MDX body. Returns null if absent. */
export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  let raw: string;
  try {
    raw = readFileSync(join(CONTENT_DIR, `${slug}.mdx`), "utf8");
  } catch {
    return null;
  }
  const { data, content } = matter(raw);
  return { meta: normalizeMeta(slug, data, content), content };
}

/**
 * All published posts' metadata, newest first. Drafts are excluded outside of
 * development so work-in-progress never leaks to production.
 */
export function getAllCaseStudies(): CaseStudyMeta[] {
  const showDrafts = process.env.NODE_ENV !== "production";
  return getCaseStudySlugs()
    .map((slug) => {
      const study = getCaseStudyBySlug(slug);
      return study?.meta ?? null;
    })
    .filter((meta): meta is CaseStudyMeta => meta !== null)
    .filter((meta) => showDrafts || !meta.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
