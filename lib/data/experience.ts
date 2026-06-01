export interface Role {
  date: string;
  title: string;
  company: string;
  scope: string;
}

export const experience: Role[] = [
  {
    date: "Oct 2025 — Present",
    title: "Lead Full Stack Developer",
    company: "Asahi Beverages",
    scope:
      "Technical roadmapping, RFCs/ADRs, event-driven Azure platforms, real-time analytics, WebGL games, mentoring.",
  },
  {
    date: "Nov 2022 — Oct 2025",
    title: "Full Stack Developer",
    company: "Asahi Beverages",
    scope:
      "Headless Shopify Plus rebuilds, private apps, AI receipt-scanning platform, modular component libraries, Playwright testing.",
  },
  {
    date: "Feb 2022 — Oct 2022",
    title: "Front End Developer",
    company: "Medmate",
    scope:
      "Pharma delivery widget across 200+ sites, telehealth/e-script platform, Stripe/Apple/Google Pay.",
  },
];
