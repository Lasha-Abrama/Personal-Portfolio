import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  Code2,
  Database,
  Download,
  GitFork,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Sparkles,
  Target,
  TerminalSquare,
} from "lucide-react";
import { education, training } from "@/data/experience";
import { featuredProjects } from "@/data/projects";
import { interests, learningNow, profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { ContactForm } from "./contact-form";
import { CopyEmailButton } from "./copy-email-button";
import { GithubPanel } from "./github-panel";
import { MotionReveal } from "./motion-reveal";
import { ProjectCard } from "./project-card";
import { QuoteRotator } from "./quote-rotator";
import { SectionHeading } from "./section-heading";

const skillIcons = [Code2, Layers3, Database, Sparkles, TerminalSquare, Target];

export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-background" aria-hidden="true"><span /><span /><span /></div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="status-pill"><i aria-hidden="true" />{profile.status}</div>
          <p className="hero-kicker">Hello, I&apos;m</p>
          <h1 id="hero-title">Lasha<br /><span>Abramishvili.</span></h1>
          <p className="hero-role">{profile.role}<span>/</span> IT Student</p>
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-actions">
            <Link className="button" href="#projects">View projects<ArrowRight size={18} /></Link>
            <a className="button button--ghost" href={profile.cvPath} download>Download CV<Download size={18} /></a>
            <Link className="text-link" href="/contact">Contact me<ArrowUpRight size={17} /></Link>
          </div>
          <div className="hero-socials">
            <a href={profile.social[0].href} target="_blank" rel="noreferrer"><GitFork size={18} />GitHub</a>
            <a href={profile.social[1].href} target="_blank" rel="noreferrer"><BriefcaseBusiness size={18} />LinkedIn</a>
            <span><MapPin size={17} />{profile.location}</span>
          </div>
        </div>

        <MotionReveal className="hero-visual" delay={0.1}>
          <div className="portrait-orbit" aria-hidden="true"><span /><span /></div>
          <div className="portrait-card">
            <div className="portrait-code" aria-hidden="true">
              <span>01</span><code><i>const</i> developer = &#123;</code>
              <span>02</span><code>&nbsp; name: <b>&quot;Lasha&quot;</b>,</code>
              <span>03</span><code>&nbsp; focus: <b>&quot;backend&quot;</b>,</code>
              <span>04</span><code>&nbsp; mindset: <b>&quot;keep learning&quot;</b></code>
              <span>05</span><code>&#125;;</code>
            </div>
            <div className="portrait-placeholder">
              {profile.profileImage ? <Image src={profile.profileImage} alt={`${profile.name} portrait`} fill sizes="210px" priority /> : <><span>LA</span><small>Profile image<br />placeholder</small></>}
            </div>
            <div className="portrait-caption"><span>Based in Tbilisi</span><strong>Available for the right opportunity</strong></div>
          </div>
          <div className="floating-note floating-note--top"><Code2 size={18} /><span>Build.<br /><strong>Learn. Refine.</strong></span></div>
          <div className="floating-note floating-note--bottom"><i aria-hidden="true" /><span>Current focus<br /><strong>Backend systems</strong></span></div>
        </MotionReveal>
      </div>
      <div className="container hero-footnote"><span>01 — Introduction</span><p>“{profile.quote}”</p><a href="#about" aria-label="Scroll to about section">Scroll to explore<ArrowRight size={15} /></a></div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container about-grid">
        <MotionReveal>
          <SectionHeading eyebrow="About me" title="Curious about the whole system." description="From the interface people use to the data and services underneath it." />
          <div className="about-copy">
            {profile.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <Link className="text-link" href="/about">More about my journey<ArrowUpRight size={17} /></Link>
        </MotionReveal>
        <MotionReveal className="about-board" delay={0.1}>
          <div className="about-board__header"><span>Areas I care about</span><small>lasha / interests</small></div>
          <div className="interest-list">
            {interests.map((interest, index) => <div key={interest}><span>{String(index + 1).padStart(2, "0")}</span><strong>{interest}</strong><ArrowUpRight size={16} /></div>)}
          </div>
          <div className="about-board__note"><BookOpen size={20} /><p><strong>Student now. Practitioner in progress.</strong><br />Learning through coursework, structured training, and projects that require real decisions.</p></div>
        </MotionReveal>
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section className="section section--muted" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <MotionReveal>
          <SectionHeading eyebrow="Technical toolkit" title="Skills grouped by how I use them." description="No percentage bars—just technologies supported by my CV, public profile, or repositories." />
        </MotionReveal>
        <div className="skills-grid">
          {skillGroups.map((group, index) => {
            const Icon = skillIcons[index];
            return (
              <MotionReveal className="skill-card" delay={index * 0.04} key={group.title}>
                <div className="skill-icon"><Icon size={21} /></div>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <div className="tag-list">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <div className="section-heading-row">
          <MotionReveal><SectionHeading eyebrow="Selected work" title="Projects with a clear purpose." description="A focused selection across full-stack development, frontend product work, and data analytics." /></MotionReveal>
          <Link className="text-link" href="/projects">Explore all projects<ArrowUpRight size={17} /></Link>
        </div>
        <div className="project-grid">
          {featuredProjects.map((project, index) => <MotionReveal delay={index * 0.07} key={project.slug}><ProjectCard project={project} compact /></MotionReveal>)}
        </div>
        <div className="projects-cta"><p>More experiments, coursework, and earlier projects live on GitHub.</p><a className="button button--ghost" href="https://github.com/Lasha-Abrama?tab=repositories" target="_blank" rel="noreferrer"><GitFork size={18} />View GitHub profile</a></div>
      </div>
    </section>
  );
}

export function GithubSection() {
  return (
    <section className="section section--muted" id="github" aria-labelledby="github-title">
      <div className="container">
        <MotionReveal><SectionHeading eyebrow="Open source footprint" title="A current view of public work." description="Fetched server-side from GitHub when available, with a verified local fallback for rate limits or network issues." /></MotionReveal>
        <MotionReveal delay={0.08}><GithubPanel /></MotionReveal>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  const timeline = [...education, ...training];
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="container experience-grid">
        <MotionReveal>
          <SectionHeading eyebrow="Education & training" title="Building the foundation deliberately." description="Formal study supported by focused development programs and project-based practice." />
          <p className="timeline-note">This timeline contains education and training only; no professional experience has been invented.</p>
        </MotionReveal>
        <div className="timeline">
          {timeline.map((item, index) => (
            <MotionReveal className="timeline-item" delay={index * 0.05} key={`${item.organization}-${item.title}`}>
              <div className="timeline-marker"><span>{index === 0 ? <GraduationCap size={18} /> : <BookOpen size={18} />}</span></div>
              <div className="timeline-content">
                <div className="timeline-top"><span>{item.period}</span>{item.status ? <small>{item.status}</small> : null}</div>
                <h3>{item.title}</h3>
                <strong>{item.organization}</strong>
                <p>{item.description}</p>
                {item.details ? <ul>{item.details.map((detail) => <li key={detail}><Check size={15} />{detail}</li>)}</ul> : null}
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function JourneySection() {
  return (
    <section className="section section--journey" id="journey" aria-labelledby="journey-title">
      <div className="container">
        <MotionReveal><SectionHeading eyebrow="Currently learning" title="The next layer of the journey." description="Moving from focused student projects toward software that is easier to test, deploy, and maintain with a team." align="center" /></MotionReveal>
        <div className="journey-grid">
          {learningNow.map((item, index) => (
            <MotionReveal className="journey-card" delay={index * 0.06} key={item.title}>
              <span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p>
            </MotionReveal>
          ))}
        </div>
        <MotionReveal className="journey-line"><span>Student projects</span><i /><span>Professional engineering practice</span></MotionReveal>
      </div>
    </section>
  );
}

export function ContactSection({ condensed = false }: { condensed?: boolean }) {
  return (
    <section className={`section contact-section ${condensed ? "contact-section--condensed" : ""}`} id="contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <MotionReveal>
          <SectionHeading eyebrow="Start a conversation" title="Let’s build something useful." description="I’m open to internships, junior opportunities, collaborative projects, and thoughtful conversations about software or data." />
          <div className="contact-details">
            <a href={`mailto:${profile.email}`}><Mail size={19} /><span><small>Email</small>{profile.email}</span></a>
            <a href={profile.social[1].href} target="_blank" rel="noreferrer"><BriefcaseBusiness size={19} /><span><small>LinkedIn</small>/in/lashaabramishvili</span></a>
            <a href={profile.social[0].href} target="_blank" rel="noreferrer"><GitFork size={19} /><span><small>GitHub</small>@Lasha-Abrama</span></a>
          </div>
          <CopyEmailButton email={profile.email} />
        </MotionReveal>
        <MotionReveal className="contact-form-shell" delay={0.08}>
          <div className="contact-form__header"><span>Tell me what you’re working on.</span><i aria-hidden="true" /></div>
          <ContactForm />
        </MotionReveal>
      </div>
    </section>
  );
}

export function HomeContent() {
  return (
    <>
      <HeroSection />
      <QuoteRotator />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <GithubSection />
      <ExperienceSection />
      <JourneySection />
      <ContactSection />
    </>
  );
}
