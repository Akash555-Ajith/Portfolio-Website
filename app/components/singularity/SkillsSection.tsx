import { learningSkills, skillGroups } from "@/app/data";

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
              <h3>{tool}</h3>
            </article>
          )) : skillGroups.map(group => (
            <article className="sg-skill-card" key={group.title}>
              <h3>{group.title}</h3>
              <div className="sg-skill-tools">{group.tools.map(tool => <span className="sg-chip" key={tool}>{tool}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
