export interface Skill {
  name: string;
  /** Azure sub-services render as nested dashed sub-pills. */
  sub?: boolean;
}

export interface SkillGroupData {
  label: string;
  count: string;
  skills: Skill[];
}

export const skillGroups: SkillGroupData[] = [
  {
    label: "Frontend",
    count: "07",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Vue" },
      { name: "Angular" },
      { name: "TypeScript" },
      { name: "WebGL" },
      { name: "Three.js" },
    ],
  },
  {
    label: "Backend",
    count: "07",
    skills: [
      { name: "Node.js" },
      { name: "Python" },
      { name: "GraphQL" },
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "WebSocket" },
      { name: "Microservices" },
    ],
  },
  {
    label: "Cloud & DevOps",
    count: "04",
    skills: [
      { name: "Azure" },
      { name: "Key Vault", sub: true },
      { name: "RBAC", sub: true },
      { name: "Service Bus", sub: true },
      { name: "App Insights", sub: true },
      { name: "AWS" },
      { name: "CI/CD" },
      { name: "Playwright" },
    ],
  },
  {
    label: "AI & Emerging",
    count: "06",
    skills: [
      { name: "Claude API" },
      { name: "OpenAI API" },
      { name: "MCP" },
      { name: "Agentic systems" },
      { name: "Cursor" },
      { name: "Claude Code" },
    ],
  },
];

export const navItems = [
  { num: "01", label: "About", href: "#about" },
  { num: "02", label: "Work", href: "#work" },
  { num: "03", label: "Experience", href: "#experience" },
  { num: "04", label: "Skills", href: "#skills" },
  { num: "05", label: "Contact", href: "#contact" },
] as const;
