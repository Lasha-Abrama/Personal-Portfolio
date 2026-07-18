"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/types/portfolio";
import { ProjectCard } from "./project-card";

const filters: Array<"All" | ProjectCategory> = ["All", "Full-stack", "Frontend", "Data analytics"];

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const visible = useMemo(
    () => active === "All" ? projects : projects.filter((project) => project.category === active),
    [active, projects],
  );

  return (
    <div>
      <div className="filter-row" role="group" aria-label="Filter projects by category">
        {filters.map((filter) => (
          <button className={active === filter ? "filter-button filter-button--active" : "filter-button"} type="button" key={filter} onClick={() => setActive(filter)} aria-pressed={active === filter}>
            {filter}
          </button>
        ))}
      </div>
      <div className="project-grid project-grid--archive">
        {visible.map((project) => <ProjectCard key={project.slug} project={project} />)}
      </div>
    </div>
  );
}
