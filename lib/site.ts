/**
 * Site-wide constants. Region-neutral; tailored CVs handle regional targeting.
 * Override the public URL at build time with NEXT_PUBLIC_SITE_URL.
 */
export const site = {
  name: "Andre Sha",
  role: "Lead Full Stack Developer",
  title: "Andre Sha — Lead Full Stack Developer",
  description:
    "Lead full stack developer building enterprise web platforms, real-time systems, and AI-powered tools — from architecture to pixel.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://andresha.dev",
  email: "shaandre96@gmail.com",
  linkedin: "https://linkedin.com/in/andre-sha",
  github: "https://github.com/andre-sha",
  linkedinLabel: "linkedin.com/in/andre-sha",
  githubLabel: "github.com/andre-sha",
  availability: "Open to senior & lead roles · remote and international",
  /** Drop a real PDF at /public/andre-sha-cv.pdf to wire this up. */
  cvPath: "/andre-sha-cv.pdf",
  languages: "EN · 中文 · 日本語 · 한국어",
  knowsAbout: [
    "Full Stack Development",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Azure",
    "AWS",
    "Real-time Systems",
    "AI Integration",
    "WebGL",
  ],
} as const;
