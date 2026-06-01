import { site } from "@/lib/site";
import { NodeMarker } from "@/components/ui/NodeMarker";

export function About() {
  return (
    <section
      className="section reveal"
      id="about"
      data-screen-label="About"
      aria-label="About"
    >
      <div className="about-body">
        <span className="eyebrow">
          <NodeMarker />
          <span className="tick" aria-hidden="true" />
          node.01 — about
        </span>
        <p className="statement">
          Lead full stack developer with <span className="em">4+ years</span>{" "}
          building enterprise platforms for{" "}
          <span className="em">major Australian brands</span>. I work{" "}
          <span className="em">end-to-end</span> — architecture, real-time
          systems, AI integration, and the interface details that make software
          feel considered. <span className="em">Multilingual</span> (English,
          Mandarin, Japanese, Korean); open to{" "}
          <span className="em">senior and lead roles internationally</span>.
        </p>
        <div className="about-meta">
          <span className="status">
            <span className="led" aria-hidden="true" />
            Open · International
          </span>
          <span className="langs">{site.languages}</span>
        </div>
      </div>
    </section>
  );
}
