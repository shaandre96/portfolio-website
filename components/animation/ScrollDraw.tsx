"use client";

import { useEffect } from "react";
import { animate, stagger } from "animejs";

/**
 * The continuous left-rail blueprint circuit.
 *
 * Renders the rail spine + the accent "pen" line that fills as you scroll,
 * lighting up each node marker as the pen reaches it (node.00 → terminus).
 * On top of that, anime.js plays a staggered reveal as each section enters.
 *
 * Robustness contract (mandated by the brief): content is ALWAYS visible in
 * the base CSS. This component only enhances. With JS disabled, reduced motion,
 * or a stalled IntersectionObserver, everything stays readable — a failsafe
 * forces the final visible state.
 */
export function ScrollDraw() {
  useEffect(() => {
    const main = document.querySelector<HTMLElement>(".main");
    const spine = document.querySelector<HTMLElement>(".rail-spine");
    const progress = document.querySelector<HTMLElement>("#railProgress");
    const terminus = document.querySelector<HTMLElement>(".terminus");
    if (!main || !spine || !progress) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const nodes: HTMLElement[] = Array.from(
      document.querySelectorAll<HTMLElement>(".rnode"),
    );
    if (terminus) nodes.push(terminus);

    let spineH = 0;
    let ticking = false;

    const mTop = () => main.getBoundingClientRect().top + window.scrollY;

    const draw = () => {
      const pen = window.scrollY + window.innerHeight * 0.5;
      const d = Math.max(0, Math.min(spineH, pen - mTop()));
      progress.style.height = `${d}px`;
      nodes.forEach((n) => {
        const y = n.getBoundingClientRect().top + window.scrollY + n.offsetHeight / 2;
        n.classList.toggle("active", pen >= y);
      });
    };

    const layout = () => {
      if (!terminus) return;
      const tMid =
        terminus.getBoundingClientRect().top +
        window.scrollY +
        terminus.offsetHeight / 2;
      spineH = Math.max(0, tMid - mTop());
      spine.style.height = `${spineH}px`;
      draw();
    };

    // ---- Reduced motion: show the final drawn state, no scroll scrub. ----
    if (reduce) {
      layout();
      progress.style.transition = "none";
      progress.style.height = `${spineH}px`;
      nodes.forEach((n) => n.classList.add("active"));
      return;
    }

    // ---- Rail scroll-draw ----
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        draw();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout);
    if (document.fonts?.ready) document.fonts.ready.then(layout);
    window.addEventListener("load", layout);
    layout();

    // ---- Staggered section reveal (progressive enhancement) ----
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal"),
    );
    const targetsFor = (section: HTMLElement) =>
      Array.from(section.children).filter(
        (c): c is HTMLElement => c instanceof HTMLElement,
      );

    const revealAll = () => {
      sections.forEach((section) => {
        targetsFor(section).forEach((el) => {
          el.style.opacity = "";
          el.style.transform = "";
        });
      });
    };

    let io: IntersectionObserver | null = null;
    let failsafe: number | undefined;

    if ("IntersectionObserver" in window) {
      // Pre-hide; the observer animates each section in as it enters.
      sections.forEach((section) => {
        targetsFor(section).forEach((el) => {
          el.style.opacity = "0";
          el.style.transform = "translateY(16px)";
        });
      });

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const section = entry.target as HTMLElement;
            animate(targetsFor(section), {
              opacity: [0, 1],
              translateY: [16, 0],
              delay: stagger(80),
              duration: 600,
              ease: "out(3)",
            });
            io?.unobserve(section);
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
      );
      sections.forEach((section) => io?.observe(section));

      // Failsafe: if the observer never fires (throttled/background tab),
      // force everything visible so the page can never render blank.
      failsafe = window.setTimeout(() => {
        if (document.querySelectorAll(".reveal").length) revealAll();
      }, 1200);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
      window.removeEventListener("load", layout);
      io?.disconnect();
      if (failsafe) window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <>
      <div className="rail-spine" aria-hidden="true" />
      <div className="rail-progress" id="railProgress" aria-hidden="true" />
    </>
  );
}
