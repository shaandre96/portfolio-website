import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/ui/Header";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Andre Sha",
    "Lead Full Stack Developer",
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Azure",
    "AI integration",
    "Software Engineer",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.title,
    title: site.title,
    description: site.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBFAF7" },
    { media: "(prefers-color-scheme: dark)", color: "#0C1620" },
  ],
};

// JSON-LD Person schema — structured data for rich results.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  sameAs: [site.linkedin, site.github],
  knowsAbout: site.knowsAbout,
  knowsLanguage: ["English", "Mandarin Chinese", "Japanese", "Korean"],
};

// No-FOUC: resolve theme before first paint (manual override → system).
const themeScript = `
  document.documentElement.className += " js";
  try {
    var t = localStorage.getItem('as-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static no-FOUC theme script, no user input */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD structured data, no user input
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <a className="skip-link" href="#top">
          Skip to content
        </a>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
