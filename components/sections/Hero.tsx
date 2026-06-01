import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { NodeMarker } from "@/components/ui/NodeMarker";
import { CircuitPath } from "@/components/animation/CircuitPath";

export function Hero() {
  return (
    <section
      className="section hero-sec reveal"
      data-screen-label="Hero"
      aria-labelledby="hero-heading"
    >
      <div className="plan-grid">
        <div>
          <span className="hero-eyebrow">
            <NodeMarker className="lg" />
            {site.name} · {site.role}
          </span>
          <h1 className="headline" id="hero-heading">
            <span className="hl one">
              <span className="ln" aria-hidden="true">
                00
              </span>
              Systems that scale.
            </span>
            <span className="hl two">Interfaces that feel.</span>
          </h1>
          <p className="subline">
            Building enterprise web platforms, real-time systems, and AI-powered
            tools — from architecture to pixel.
          </p>
          <div className="ctas">
            <Button variant="primary" href="#work" glyph="→">
              View work
            </Button>
            <Button
              variant="ghost"
              href={site.cvPath}
              glyph="↓"
              download
            >
              Download CV
            </Button>
          </div>
          <span className="scroll-cue">
            <span className="ar" aria-hidden="true">
              ↓
            </span>{" "}
            scroll to plot
          </span>
        </div>

        <div className="hero-plot" aria-hidden="true">
          <div className="axis" />
          <span className="pn n1" />
          <span className="pn n2" />
          <span className="coord">x: 040 — 640</span>
          <CircuitPath />
        </div>
      </div>
    </section>
  );
}
