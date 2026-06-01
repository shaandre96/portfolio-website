import { site } from "@/lib/site";

export function Contact() {
  return (
    <section
      className="section contact-sec reveal"
      id="contact"
      data-screen-label="Contact"
      aria-labelledby="contact-heading"
    >
      <span className="eyebrow">
        <span className="terminus-ring" aria-hidden="true" />
        <span className="terminus" aria-hidden="true" />
        <span className="tick" aria-hidden="true" />
        node.05 — contact · end of line
      </span>
      <h2 className="big" id="contact-heading">
        Let&apos;s build something.
      </h2>

      <div className="rows">
        <a className="row" href={`mailto:${site.email}`}>
          <span className="r-label">Email</span>
          <span className="r-value">{site.email}</span>
          <span className="r-arrow" aria-hidden="true">
            ↗
          </span>
        </a>
        <a
          className="row"
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile (opens in a new tab)"
        >
          <span className="r-label">LinkedIn</span>
          <span className="r-value">{site.linkedinLabel}</span>
          <span className="r-arrow" aria-hidden="true">
            ↗
          </span>
        </a>
        <a
          className="row"
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile (opens in a new tab)"
        >
          <span className="r-label">GitHub</span>
          <span className="r-value">{site.githubLabel}</span>
          <span className="r-arrow" aria-hidden="true">
            ↗
          </span>
        </a>
        <div className="row avail">
          <span className="r-label">Availability</span>
          <span className="r-value">{site.availability}</span>
          <span className="r-arrow" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
