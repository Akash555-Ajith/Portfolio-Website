import React from "react";
import { copy, EMAIL } from "@/app/data";

/**
 * Split a phrase into per-word spans. The controller staggers these by scroll
 * position, so the headline is assembled by the reader's own scrolling rather
 * than by a timer they can arrive after.
 */
const Words: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(" ").map((word, i) => (
      <React.Fragment key={i}>
        {i > 0 ? " " : null}
        <span className="sg-word" data-word>
          {word}
        </span>
      </React.Fragment>
    ))}
  </>
);

/**
 * 01 Event horizon — the hero, pinned for two screens while it emerges.
 *
 * A single measure of type on both breakpoints; phones centre it and drop the
 * eyebrow.
 */
const HeroSection: React.FC = () => (
  <section className="sg-ch1" data-ch id="ch1">
    <div className="sg-ch1-pin">
      <div className="sg-grid-overlay" aria-hidden />

      <div className="sg-hero" data-hero data-section-scroll tabIndex={0}>
        <div className="sg-eyebrow sg-hero-eyebrow sg-mono" data-hero-rest>
          01 &nbsp;
        </div>

        <div className="sg-hero-grid">
          <div className="sg-hero-main">
            <h1 className="sg-hero-h1">
              <Words text="I’m Akash Ajith." />{" "}
              <span className="sg-accent">
                <Words text="Web Developer." />
              </span>
            </h1>

            <p className="sg-hero-p" data-hero-rest>
              <span className="sg-label-long">{copy.introDesktop}</span>
              <span className="sg-label-short">{copy.introMobile}</span>
            </p>

            <div className="sg-hero-actions" data-hero-rest>
              <a className="sg-btn sg-btn-primary" href="#ch2" data-work>
                My projects
              </a>
              <a
                className="sg-btn sg-btn-ghost"
                href={`mailto:${EMAIL}`}
              >
                Email me
              </a>
            </div>

            <div className="sg-chips sg-mono" data-hero-rest>
              <span className="sg-chip sg-chip-gold">
                Third-year B.Tech
              </span>
              <span className="sg-chip">
                <span className="sg-label-long">CUSAT · Computer Science</span>
                <span className="sg-label-short">CUSAT · CS</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
