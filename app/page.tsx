import type { Metadata } from "next";
import { HomeContent } from "@/components/home-content";

export const metadata: Metadata = {
  title: "Lasha Abramishvili | Aspiring Full-Stack Developer",
  description:
    "Portfolio of Lasha Abramishvili, an Information Technology student focused on full-stack development, backend systems, and data analytics.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <HomeContent />;
}

