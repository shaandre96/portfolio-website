import type { ReactNode } from "react";
import type { BlogMeta } from "@/lib/case-studies";
import { CaseStudyShell } from "./CaseStudyShell";

/** Freeform post: no structured header, just the shell and the prose body. */
export function BlogTemplate({
  meta,
  children,
}: {
  meta: BlogMeta;
  children: ReactNode;
}) {
  return <CaseStudyShell meta={meta}>{children}</CaseStudyShell>;
}
