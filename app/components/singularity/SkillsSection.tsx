import { learningSkills, skillGroups } from "@/app/data";
import { SiC, SiCplusplus, SiPython, SiGithub, SiDocker, SiAmazonwebservices, SiAnsible,
  SiReact, SiHtml5, SiCss3, SiBootstrap, SiNodedotjs, SiPhp, SiSupabase, SiVercel, SiCloudflare } from "react-icons/si";

const logos = {
  React: { Icon: SiReact, color: "#61dafb" },
  HTML: { Icon: SiHtml5, color: "#f07852" },
  CSS: { Icon: SiCss3, color: "#55a9ee" },
  Bootstrap: { Icon: SiBootstrap, color: "#b18aff" },
  "Node.js": { Icon: SiNodedotjs, color: "#83cd29" },
  PHP: { Icon: SiPhp, color: "#a6b2e3" },
  Supabase: { Icon: SiSupabase, color: "#3ecf8e" },
  Vercel: { Icon: SiVercel, color: "#f0f6fc" },
  Cloudflare: { Icon: SiCloudflare, color: "#f9a443" },
  C: { Icon: SiC, color: "#88b9ee" },
  "C++": { Icon: SiCplusplus, color: "#65a9ed" },
  Python: { Icon: SiPython, color: "#ffd343" },
  GitHub: { Icon: SiGithub, color: "#f0f6fc" },
  Docker: { Icon: SiDocker, color: "#2496ed" },
  AWS: { Icon: SiAmazonwebservices, color: "#ff9900" },
  Ansible: { Icon: SiAnsible, color: "#ee3445" },
};

function SkillLogo({ name }: { name: string }) {
  const logo = logos[name.split(" · ")[0] as keyof typeof logos];
  if (!logo) return null;
  return <logo.Icon className="sg-skill-logo" style={{ color: logo.color }} aria-hidden="true" focusable="false" />;
}

export default function SkillsSection({ learning = false }: { learning?: boolean }) {
  return (
    <section className="sg-skills" data-ch id={learning ? "learning" : "skills"}>
      <div className="sg-section-inner" data-section-scroll tabIndex={0}>
        <div className="sg-eyebrow sg-mono">{learning ? "05" : "04"}</div>
        <h2 className="sg-h2">{learning ? "Currently " : "My "}<span className="sg-accent">{learning ? "learning" : "skills"}</span></h2>
        {learning && <p className="sg-ch3-note">DevOps tools I’m currently learning.</p>}
        <div className={`sg-skills-grid${learning ? " sg-learning-grid" : ""}`}>
          {learning ? learningSkills.map(tool => (
            <article className="sg-skill-card" key={tool}>
              <span className="sg-mono sg-learning-label">Currently learning · DevOps</span>
              <h3><SkillLogo name={tool} />{tool}</h3>
            </article>
          )) : skillGroups.map(group => (
            <article className="sg-skill-card" key={group.title}>
              <h3>{group.title}</h3>
              <div className="sg-skill-tools">{group.tools.map(tool => <span className="sg-chip" key={tool}><SkillLogo name={tool} />{tool}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
