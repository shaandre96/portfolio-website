import { navItems } from "@/lib/data/skills";
import { site } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a
          className="brand"
          href="#top"
          aria-label={`${site.name} — back to top`}
        >
          <span className="dot" aria-hidden="true" />
          <span className="name">{"Andre Sha"}</span>
        </a>
        <nav className="topnav" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.num} · {item.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
