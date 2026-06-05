"use client";

import { usePathname } from "next/navigation";
import { navItems } from "@/lib/data/skills";
import { site } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  // In-page anchors only resolve on the home page; from any other route they
  // need to point back home first. Absolute links (e.g. /case-studies) stay put.
  const brandHref = onHome ? "#top" : "/";

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a className="brand" href={brandHref} aria-label={`${site.name} — home`}>
          <span className="dot" aria-hidden="true" />
          <span className="name">{"Andre Sha"}</span>
        </a>
        <nav className="topnav" aria-label="Primary">
          {navItems.map((item) => {
            const isAnchor = item.href.startsWith("#");
            const href = isAnchor && !onHome ? `/${item.href}` : item.href;
            const isActive = !isAnchor && pathname.startsWith(item.href);
            return (
              <a
                key={item.href}
                href={href}
                aria-current={isActive ? "page" : undefined}
              >
                {item.num} · {item.label}
              </a>
            );
          })}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
