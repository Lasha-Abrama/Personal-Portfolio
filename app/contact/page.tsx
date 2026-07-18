import type { Metadata } from "next";
import { ContactSection } from "@/components/home-content";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Lasha Abramishvili about internships, junior development roles, and collaborative projects.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Good work starts with a clear conversation." description="If you have an internship, junior role, collaborative project, or useful feedback, I would be glad to hear from you." />
      <ContactSection condensed />
    </>
  );
}

