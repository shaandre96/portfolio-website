"use client";

import { useSyncExternalStore } from "react";

/**
 * Sun/moon theme toggle. Persists to localStorage ('as-theme') and flips the
 * `data-theme` attribute on <html>; the no-FOUC script in layout sets the
 * initial value before paint. Custom inline SVGs match the blueprint comp;
 * CSS shows the correct icon per resolved theme.
 *
 * `data-theme` is external (DOM) state, so we read it via useSyncExternalStore
 * — aria-pressed stays in sync without a setState-in-effect.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const getSnapshot = () =>
  document.documentElement.getAttribute("data-theme") === "dark";

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, () => false);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("as-theme", next);
    } catch {
      /* storage unavailable — toggle still applies for the session */
    }
    root.setAttribute("data-theme", next);
  };

  return (
    <button
      className="theme-toggle"
      id="themeToggle"
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      aria-pressed={isDark}
    >
      <svg
        className="ic ic-sun"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4.2" />
        <line x1="12" y1="2.4" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="21.6" />
        <line x1="2.4" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="21.6" y2="12" />
        <line x1="5.2" y1="5.2" x2="7.1" y2="7.1" />
        <line x1="16.9" y1="16.9" x2="18.8" y2="18.8" />
        <line x1="16.9" y1="7.1" x2="18.8" y2="5.2" />
        <line x1="5.2" y1="18.8" x2="7.1" y2="16.9" />
      </svg>
      <svg className="ic ic-moon" viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <mask id="moonMask">
            <rect width="24" height="24" fill="white" />
            <circle cx="16.5" cy="9.2" r="7.4" fill="black" />
          </mask>
        </defs>
        <circle
          cx="12"
          cy="12"
          r="7.6"
          fill="currentColor"
          mask="url(#moonMask)"
        />
      </svg>
    </button>
  );
}
