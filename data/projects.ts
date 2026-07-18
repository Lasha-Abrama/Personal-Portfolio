import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    slug: "personal-finance-app",
    name: "Personal Finance App",
    eyebrow: "Full-stack finance platform",
    description:
      "A collaborative finance application for tracking balances, transactions, budgets, savings pots, bills, and account preferences in one responsive product.",
    problem:
      "Turns everyday money management into a structured workflow with secure user accounts and clear feedback for common financial actions.",
    technologies: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Zod",
      "JavaScript",
      "Cloudinary",
    ],
    features: [
      "JWT authentication and token invalidation",
      "Transfers, merchant payments, budgets, pots, and recurring bills",
      "Search, filtering, pagination, and responsive layouts",
      "Validated uploads and user-scoped database queries",
    ],
    category: "Full-stack",
    githubUrl: "https://github.com/Lasha-Abrama/Personal-Finance-App",
    liveUrl: "https://personal-finance-app-9uw3.onrender.com/login.html",
    featured: true,
    collaborative: true,
    visual: "finance",
  },
  {
    slug: "earth-lens",
    name: "EarthLens",
    eyebrow: "Country discovery experience",
    description:
      "A bilingual country explorer that combines profiles, weather, comparisons, favorites, and a travel wishlist in a polished React application.",
    problem:
      "Brings scattered country and travel-planning information into a consistent, resilient experience that remains useful when external services fail.",
    technologies: [
      "React 19",
      "Vite",
      "React Router",
      "SCSS Modules",
      "Framer Motion",
      "i18next",
      "Axios",
    ],
    features: [
      "Searchable atlas of 253 countries and territories",
      "English and Georgian localization",
      "Side-by-side country comparison and live weather",
      "Local favorites, wishlist, theme, and visit history",
    ],
    category: "Frontend",
    githubUrl: "https://github.com/Lasha-Abrama/Earth-Lens",
    liveUrl: "https://earth-lens-project.netlify.app/",
    featured: true,
    collaborative: false,
    visual: "atlas",
  },
  {
    slug: "healthcare-analytics-dashboard",
    name: "Healthcare Analytics Dashboard",
    eyebrow: "Power BI reporting project",
    description:
      "An interactive Power BI dashboard that organizes hospital activity, financial, and patient-experience data for exploratory analysis.",
    problem:
      "Transforms raw hospital records into a clearer operational view across visits, payments, severity, satisfaction, follow-ups, and no-shows.",
    technologies: ["Power BI", "Excel", "Power Query", "DAX", "Data modeling"],
    features: [
      "Overview and deeper insights report pages",
      "Revenue, insurance, patient payment, and debt analysis",
      "Care severity, satisfaction, length-of-stay, and no-show views",
      "Collaborative university final project",
    ],
    category: "Data analytics",
    githubUrl: "https://github.com/Lasha-Abrama/healthcare-analytics-dashboard",
    liveUrl: null,
    featured: true,
    collaborative: true,
    visual: "analytics",
  },
  {
    slug: "react-users-app",
    name: "React Users App",
    eyebrow: "Responsive API-driven directory",
    description:
      "A focused React application with a home experience and user directory populated from the JSONPlaceholder API.",
    problem:
      "Demonstrates a clean, mobile-first approach to client-side routing and remote-data states in a compact project.",
    technologies: ["React", "React Router", "Vite", "JavaScript", "CSS"],
    features: [
      "Loading, error, and empty states",
      "Responsive navigation and user cards",
      "Two-page client-side routing",
    ],
    category: "Frontend",
    githubUrl: "https://github.com/Lasha-Abrama/react-users-app",
    liveUrl: "https://lasha-abrama.github.io/react-users-app/",
    featured: false,
    collaborative: false,
    visual: "directory",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

