import type { SkillGroup } from "@/types/portfolio";

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    description: "Responsive interfaces and client-side application structure.",
    items: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React",
      "React Router",
      "SCSS",
      "EJS",
      "Bootstrap",
    ],
  },
  {
    title: "Backend",
    description: "APIs, authentication, validation, and server-side workflows.",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT",
      "Zod",
      "Mongoose",
      "bcrypt",
    ],
  },
  {
    title: "Databases",
    description: "Relational and document-oriented data foundations.",
    items: ["MongoDB", "PostgreSQL", "SQL", "MySQL"],
  },
  {
    title: "Data analytics",
    description: "Preparing, modeling, and communicating data clearly.",
    items: ["Power BI", "Advanced Excel", "Power Query", "DAX"],
  },
  {
    title: "Programming languages",
    description: "Languages represented in public projects and current learning.",
    items: ["JavaScript", "Python"],
  },
  {
    title: "Developer tools",
    description: "Everyday tools for collaboration, testing, and design.",
    items: ["Git", "GitHub", "Postman", "VS Code", "Figma", "Canva", "Vite"],
  },
];

