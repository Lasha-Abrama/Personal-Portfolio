"use client";

import Link from "next/link";
import { ArrowUp, BriefcaseBusiness, GitFork } from "lucide-react";
import { profile } from "@/data/profile";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-shell">
        <div>
          <Link className="brand" href="/" aria-label="Back to home">
            <span className="brand-mark" aria-hidden="true">LA</span>
            <span className="brand-text">Lasha<span>.dev</span></span>
          </Link>
          <p>Designed and built by Lasha Abramishvili.</p>
        </div>
        <div className="footer-links">
          <a href={profile.social[0].href} target="_blank" rel="noreferrer" aria-label="GitHub profile"><GitFork size={19} /></a>
          <a href={profile.social[1].href} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><BriefcaseBusiness size={19} /></a>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><ArrowUp size={19} /></button>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built with care in {profile.location}</span>
      </div>
    </footer>
  );
}
