import type { Metadata } from "next";
import { ArrowUpRight, GitFork } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ProjectExplorer } from "@/components/project-explorer";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected full-stack, frontend, and data analytics projects by Lasha Abramishvili.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero eyebrow="Project archive" title="Work that turns learning into something tangible." description="Each featured project is grounded in a public repository. Collaborative work is labeled, and live links are included only when they exist." />
      <section className="section section--page">
        <div className="container">
          <ProjectExplorer projects={projects} />
          <div className="archive-footer">
            <p>These are selected projects, not the full repository history.</p>
            <a className="button button--ghost" href="https://github.com/Lasha-Abrama?tab=repositories" target="_blank" rel="noreferrer"><GitFork size={18} />View all repositories<ArrowUpRight size={17} /></a>
          </div>
        </div>
      </section>
    </>
  );
}
