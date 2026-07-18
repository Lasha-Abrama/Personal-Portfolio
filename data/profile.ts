import type { Profile } from "@/types/portfolio";

export const profile: Profile = {
  name: "Lasha Abramishvili",
  firstName: "Lasha",
  role: "Aspiring Full-Stack Developer",
  location: "Tbilisi, Georgia",
  email: "abramishvililasha05@gmail.com",
  status: "Open to internships and junior opportunities",
  intro:
    "Information Technology student building practical web products, reliable backend systems, and clear data experiences.",
  quote: "Building meaningful software, one project at a time.",
  bio: [
    "I am an Information Technology student at Business and Technology University in Tbilisi, with a growing focus on full-stack and backend development.",
    "I enjoy working through the parts behind an interface: APIs, authentication, validation, databases, and the structure that keeps software maintainable. Data analytics is a parallel interest that strengthens how I approach problems and communicate insights.",
    "My current goal is to deepen my engineering fundamentals, contribute to a professional team, and turn academic and personal project experience into dependable production skills.",
  ],
  social: [
    { label: "GitHub", href: "https://github.com/Lasha-Abrama" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/lashaabramishvili/",
    },
  ],
  cvPath: "/documents/lasha-abramishvili-cv.pdf",
  profileImage: null,
};

export const interests = [
  "Backend systems",
  "REST APIs",
  "Full-stack products",
  "Database design",
  "Data analytics",
  "Accessible interfaces",
];

export const learningNow = [
  {
    title: "Type-safe application development",
    text: "Building confidence with TypeScript, Next.js, and patterns that make larger codebases easier to change.",
  },
  {
    title: "Backend architecture",
    text: "Going deeper on NestJS, testing, GraphQL, system design, and clean service boundaries.",
  },
  {
    title: "Delivery and cloud fundamentals",
    text: "Developing practical familiarity with Docker, AWS, deployment workflows, and production-minded debugging.",
  },
];

