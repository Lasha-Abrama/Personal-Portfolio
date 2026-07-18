import { projects } from "@/data/projects";
import type { GithubRepository } from "@/types/portfolio";

const GITHUB_USER = "Lasha-Abrama";
const verifiedRepoCount = 33;

type GithubApiRepository = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

const fallbackRepositories: GithubRepository[] = projects.map((project) => ({
  name: project.name,
  description: project.description,
  htmlUrl: project.githubUrl,
  homepage: project.liveUrl,
  language: project.category === "Data analytics" ? "Power BI" : "JavaScript",
  topics: project.technologies.slice(0, 4),
  stars: 0,
  updatedAt: "2026-07-18T14:10:11Z",
}));

function headers() {
  const githubHeaders: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "lasha-portfolio",
  };
  if (process.env.GITHUB_TOKEN) githubHeaders.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return githubHeaders;
}

export async function GET() {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`, {
      headers: headers(),
      signal: AbortSignal.timeout(6000),
    });
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
    const raw = await response.json() as GithubApiRepository[];
    if (!Array.isArray(raw)) throw new Error("Unexpected GitHub response");

    const publicRepositories = raw.filter((repository) => !repository.fork && !repository.archived);
    const languages = new Map<string, number>();
    for (const repository of raw) {
      if (repository.language) languages.set(repository.language, (languages.get(repository.language) ?? 0) + 1);
    }
    const recent = publicRepositories
      .filter((repository) => repository.name !== GITHUB_USER)
      .slice(0, 6)
      .map<GithubRepository>((repository) => ({
        name: repository.name,
        description: repository.description,
        htmlUrl: repository.html_url,
        homepage: repository.homepage || null,
        language: repository.language,
        topics: Array.isArray(repository.topics) ? repository.topics.slice(0, 6) : [],
        stars: repository.stargazers_count,
        updatedAt: repository.updated_at,
      }));
    const newestDate = raw.map((repository) => repository.updated_at).sort().at(-1) ?? new Date().toISOString();

    return Response.json(
      {
        repoCount: raw.length,
        repositories: recent,
        languages: [...languages.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, count]) => ({ name, count })),
        source: "github",
        updatedAt: newestDate,
      },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
    );
  } catch {
    return Response.json(
      {
        repoCount: verifiedRepoCount,
        repositories: fallbackRepositories,
        languages: [
          { name: "JavaScript", count: 14 },
          { name: "CSS", count: 7 },
          { name: "EJS", count: 5 },
          { name: "HTML", count: 3 },
          { name: "Python", count: 3 },
        ],
        source: "fallback",
        updatedAt: "2026-07-18T14:10:11Z",
      },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" } },
    );
  }
}

