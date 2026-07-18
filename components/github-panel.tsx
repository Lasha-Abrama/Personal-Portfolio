"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, GitBranch, LoaderCircle } from "lucide-react";
import type { GithubRepository } from "@/types/portfolio";

type GithubPayload = {
  repoCount: number;
  repositories: GithubRepository[];
  languages: Array<{ name: string; count: number }>;
  source: "github" | "fallback";
  updatedAt: string;
};

const fallback: GithubPayload = {
  repoCount: 33,
  repositories: [],
  languages: [
    { name: "JavaScript", count: 14 },
    { name: "CSS", count: 7 },
    { name: "EJS", count: 5 },
    { name: "HTML", count: 3 },
    { name: "Python", count: 3 },
  ],
  source: "fallback",
  updatedAt: "2026-07-18T14:10:11Z",
};

export function GithubPanel() {
  const [data, setData] = useState<GithubPayload | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/github", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("GitHub request failed")))
      .then((payload) => setData(payload as GithubPayload))
      .catch(() => setData(fallback));
    return () => controller.abort();
  }, []);

  const content = data ?? fallback;

  return (
    <div className="github-panel">
      <div className="github-summary">
        <div className="github-mark"><GitBranch size={32} /></div>
        <div>
          <p className="eyebrow"><span aria-hidden="true" />Public work, live data</p>
          <h3>GitHub snapshot</h3>
          <p>
            A small view of recent public repository activity. Language counts describe repository metadata, not professional skill level.
          </p>
        </div>
        <div className="repo-count"><strong>{content.repoCount}</strong><span>public repositories</span></div>
      </div>
      <div className="language-row" aria-label="Most common primary repository languages">
        {content.languages.map((language) => <span key={language.name}>{language.name}<small>{language.count} repos</small></span>)}
      </div>
      <div className="recent-repos">
        {!data ? (
          <div className="github-loading"><LoaderCircle className="is-spinning" size={20} />Loading current repository data…</div>
        ) : content.repositories.length ? content.repositories.slice(0, 4).map((repository) => (
          <a href={repository.htmlUrl} target="_blank" rel="noreferrer" className="repo-row" key={repository.name}>
            <span><strong>{repository.name}</strong><small>{repository.description || "Public repository"}</small></span>
            <span>{repository.language || "Mixed"}<ArrowUpRight size={16} /></span>
          </a>
        )) : (
          <p className="github-fallback-note">Live repository details are temporarily unavailable; the verified profile summary is shown instead.</p>
        )}
      </div>
      <div className="github-panel__footer">
        <span>Updated {new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(content.updatedAt))}</span>
        <a href="https://github.com/Lasha-Abrama?tab=repositories" target="_blank" rel="noreferrer">View all on GitHub<ArrowUpRight size={16} /></a>
      </div>
    </div>
  );
}
