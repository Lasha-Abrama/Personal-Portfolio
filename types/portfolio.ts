export type SocialLink = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  firstName: string;
  role: string;
  location: string;
  email: string;
  status: string;
  intro: string;
  quote: string;
  bio: string[];
  social: SocialLink[];
  cvPath: string;
  profileImage: string | null;
};

export type ProjectCategory = "Full-stack" | "Frontend" | "Data analytics";

export type ProjectVisual = "finance" | "atlas" | "analytics" | "directory";

export type Project = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  problem: string;
  technologies: string[];
  features: string[];
  category: ProjectCategory;
  githubUrl: string;
  liveUrl: string | null;
  featured: boolean;
  collaborative: boolean;
  visual: ProjectVisual;
};

export type SkillGroup = {
  title: string;
  description: string;
  items: string[];
};

export type TimelineItem = {
  title: string;
  organization: string;
  period: string;
  status?: "Ongoing" | "Completed";
  description: string;
  details?: string[];
};

export type QuoteCategory = "inspiring" | "classic" | "funny";

export type ProgrammingQuote = {
  text: string;
  author: string;
  category: QuoteCategory;
};

export type GithubRepository = {
  name: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  updatedAt: string;
};

