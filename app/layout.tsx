import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { profile } from "@/data/profile";
import "./globals.css";

async function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;

  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host?.includes("localhost") ? "http" : "https");

  return host ? `${protocol}://${host}` : "http://localhost:3000";
}

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = await resolveSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "Lasha Abramishvili | Full-Stack Developer Portfolio",
      template: "%s | Lasha Abramishvili",
    },
    description:
      "The software development and data analytics portfolio of Lasha Abramishvili, an Information Technology student in Tbilisi, Georgia.",
    keywords: [
      "Lasha Abramishvili",
      "full-stack developer",
      "backend developer",
      "Information Technology student",
      "Tbilisi developer",
      "data analytics",
    ],
    authors: [{ name: profile.name }],
    creator: profile.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "/",
      siteName: "Lasha Abramishvili — Portfolio",
      title: "Lasha Abramishvili | Aspiring Full-Stack Developer",
      description: profile.intro,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Lasha Abramishvili — Full-Stack Developer Portfolio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Lasha Abramishvili | Aspiring Full-Stack Developer",
      description: profile.intro,
      images: ["/og.png"],
    },
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08090d",
  colorScheme: "dark light",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const siteUrl = await resolveSiteUrl();
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: siteUrl,
    address: { "@type": "PostalAddress", addressLocality: "Tbilisi", addressCountry: "GE" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Business and Technology University" },
    sameAs: profile.social.map((social) => social.href),
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      </body>
    </html>
  );
}
