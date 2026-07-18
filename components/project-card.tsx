import { ArrowUpRight, GitFork, Users } from "lucide-react";
import type { Project } from "@/types/portfolio";
import { ProjectVisual } from "./project-visual";

export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <article className={`project-card ${compact ? "project-card--compact" : ""}`}>
      <ProjectVisual type={project.visual} />
      <div className="project-card__body">
        <div className="project-meta">
          <span>{project.category}</span>
          {project.collaborative ? <span><Users size={14} /> Collaborative</span> : <span>Independent</span>}
        </div>
        <p className="project-eyebrow">{project.eyebrow}</p>
        <h3>{project.name}</h3>
        <p className="project-description">{project.description}</p>
        {!compact ? <p className="project-problem"><strong>What it solves:</strong> {project.problem}</p> : null}
        <div className="tag-list" aria-label={`${project.name} technologies`}>
          {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
        </div>
        {!compact ? (
          <ul className="feature-list">
            {project.features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
        ) : null}
        <div className="project-links">
          <a href={project.githubUrl} target="_blank" rel="noreferrer"><GitFork size={17} />Source</a>
          {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer">Live project<ArrowUpRight size={17} /></a> : <span className="no-demo">Repository showcase</span>}
        </div>
      </div>
    </article>
  );
}
