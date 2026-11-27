import React from "react";
import Image from "next/image";
import { projects, GITHUB_URL } from "@/app/data";
import { trackProjectView } from "../GoogleAnalytics";
import { SiNextdotjs, SiTypescript, SiSupabase, SiPhp, SiMysql, SiBootstrap } from "react-icons/si";

const stackIcons = { "Next.js": SiNextdotjs, TypeScript: SiTypescript, Supabase: SiSupabase, PHP: SiPhp, MySQL: SiMysql, Bootstrap: SiBootstrap };

/**
 * 02 Accretion disk — the projects.
 *
 * The cards are absolutely positioned and get their size and transform from the
 * controller every frame: they sweep in one at a time onto a centred deck, then
 * unfold into an interlocking mosaic. Nothing here sets their geometry, so the
 * markup is just the card face.
 */
const ProjectsSection: React.FC = () => (
  <section className="sg-ch2" data-ch data-maze id="ch2">
    <div className="sg-ch2-pin">
      <header className="sg-ch2-head">
        <div>
          <div className="sg-eyebrow sg-mono">02 &nbsp;</div>
          <h2 className="sg-h2">
            My <span className="sg-accent">projects</span>
          </h2>
        </div>
        <div className="sg-ch2-meta sg-mono" hidden={!projects.length}>
          <div>
            <span className="sg-count" data-f-count>
              01
            </span>{" "}
            / {String(projects.length).padStart(2, "0")} captured
          </div>
          <div className="sg-ch2-phase" data-f-phase>
            Infalling
          </div>
        </div>
      </header>

      <div className={`sg-stage${projects.length === 2 ? " sg-featured-stage" : ""}`} data-f-stage data-section-scroll tabIndex={0}>
        {!projects.length && (
          <div className="sg-project-empty">
            <a className="sg-btn sg-btn-primary" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">Explore my GitHub</a>
          </div>
        )}
        {projects.map((p) => (
          <a
            key={p.id}
            className="sg-card"
            data-f-card
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackProjectView(p.title)}
          >
            <div className="sg-card-media">
              <Image
                src={p.img}
                alt={p.title}
                fill
                sizes="(max-width: 767px) 100vw, 640px"
              />
              <div className="sg-card-tag sg-mono">{p.tag}</div>
            </div>

            <div className="sg-card-body">
              <h3 className="sg-card-title" data-f-title>
                {p.title}
              </h3>
              <p className="sg-card-desc" data-f-desc>
                {p.des}
              </p>
              <div className="sg-card-foot">
                <div className="sg-project-stack">
                  {p.stack.map((name) => {
                    const Icon = stackIcons[name as keyof typeof stackIcons];
                    return <span key={name}>{Icon && <Icon aria-hidden />} {name}</span>;
                  })}
                </div>
                <span className="sg-card-live sg-mono">View on GitHub &#8599;</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
