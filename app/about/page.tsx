import type { Metadata } from "next";
import { Languages, MapPin, School } from "lucide-react";
import { ExperienceSection, JourneySection, SkillsSection } from "@/components/home-content";
import { PageHero } from "@/components/page-hero";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
  description: "Background, education, interests, skills, and current learning goals of Lasha Abramishvili.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Lasha" title="A student developer learning to think in systems." description="I care about what users see, what services do behind the scenes, and how data can make decisions clearer." />
      <section className="section section--page">
        <div className="container about-page-grid">
          <div className="about-page-copy">
            {profile.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <aside className="about-facts" aria-label="Quick facts">
            <div><MapPin size={19} /><span><small>Based in</small>Tbilisi, Georgia</span></div>
            <div><School size={19} /><span><small>Studying</small>Information Technology at BTU</span></div>
            <div><Languages size={19} /><span><small>Languages</small>Georgian (native), English (B2), German (A1)</span></div>
          </aside>
        </div>
      </section>
      <ExperienceSection />
      <SkillsSection />
      <JourneySection />
    </>
  );
}

