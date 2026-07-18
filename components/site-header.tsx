"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-theme");
    const nextTheme = saved === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
  };

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link className="brand" href="/" aria-label="Lasha Abramishvili — home">
          <span className="brand-mark" aria-hidden="true">LA</span>
          <span className="brand-text">Lasha<span>.dev</span></span>
        </Link>

        <nav
          id="mobile-navigation"
          className={`main-nav ${menuOpen ? "main-nav--open" : ""}`}
          aria-label="Main navigation"
        >
          {navigation.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link className={active ? "nav-link nav-link--active" : "nav-link"} href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            );
          })}
          <Link className="button button--small nav-contact" href="/contact" onClick={() => setMenuOpen(false)}>Let&apos;s talk</Link>
        </nav>

        <div className="nav-actions">
          <button className="icon-button" type="button" onClick={toggleTheme} aria-label="Toggle light and dark theme">
            <Sun className="theme-icon theme-icon--sun" size={18} />
            <Moon className="theme-icon theme-icon--moon" size={18} />
          </button>
          <button
            className="icon-button menu-button"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
