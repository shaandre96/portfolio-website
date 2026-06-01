export interface Project {
  /** Drawing index annotation, e.g. "project.01" */
  index: string;
  /** Node coordinate annotation, e.g. "node.02·a" */
  coord: string;
  name: string;
  description: string;
  tags: string[];
  /** Live URL. Replace "#" placeholders with real deploys. */
  href: string;
}

export const projects: Project[] = [
  {
    index: "project.01",
    coord: "node.02·a",
    name: "CommonGround",
    description: "Full-stack chat & matching app.",
    tags: ["Next.js", "Supabase", "PostgreSQL"],
    href: "#",
  },
  {
    index: "project.02",
    coord: "node.02·b",
    name: "DevReview",
    description: "AI code review tool — streaming, GitHub PR integration.",
    tags: ["Next.js", "Claude API", "SSE"],
    href: "#",
  },
  {
    index: "project.03",
    coord: "node.02·c",
    name: "Plynth",
    description: "Headless music-gift storefront with AI configurator.",
    tags: ["Next.js", "Redux", "iTunes API", "Claude API"],
    href: "#",
  },
];
