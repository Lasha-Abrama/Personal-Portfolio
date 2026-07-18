# Lasha Abramishvili - Personal Portfolio

A complete, multi-page portfolio for Lasha Abramishvili, an Information Technology student and aspiring full-stack developer in Tbilisi, Georgia. The site presents selected software and data projects, technical skills, education, current learning goals, public GitHub activity, and a practical contact workflow.

## Main features

- Premium dark-first design with an optional light theme
- Responsive home, projects, about, contact, and custom 404 pages
- Typed, centralized portfolio content
- Subtle Framer Motion reveals and an accessible reduced-motion mode
- Animated programming quote component with a curated local collection
- Server-side GitHub API integration with caching, timeouts, and verified fallback data
- Filterable project archive with real source and live-demo links
- Contact form with validation, loading/success/error states, a honeypot, and minimum completion time
- Optional Resend delivery with a safe `mailto:` fallback
- Public-safe downloadable CV with private phone and street address omitted
- Open Graph and X metadata, generated social card, sitemap, robots, manifest, canonical metadata, and Person structured data
- Keyboard-accessible navigation, focus styles, semantic sections, and skip link

## Technology

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4 (available through the global stylesheet pipeline)
- Framer Motion
- Lucide React
- Standard Next.js production output for Vercel or another Node-compatible host

## Local setup

Requirements:

- Node.js 20.9 or newer
- npm

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open the local URL printed by the development server (normally `http://localhost:3000`).

Quality checks:

```bash
npm run lint
./node_modules/.bin/tsc --noEmit
npm run build
npm test
```

## Environment variables

All variables are optional for local development.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production canonical URL used by metadata, sitemap, and social sharing. |
| `GITHUB_TOKEN` | Optional server-only GitHub token that increases API limits. Never use a `NEXT_PUBLIC_` prefix. |
| `QUOTE_API_URL` | Optional trusted JSON quote endpoint. The local quote collection remains the fallback. |
| `RESEND_API_KEY` | Optional server-only Resend API key for contact-form delivery. |
| `CONTACT_TO_EMAIL` | Destination address used by the contact route when Resend is configured. |
| `CONTACT_FROM_EMAIL` | Verified Resend sender, for example `Portfolio <hello@your-domain.com>`. |

Do not commit `.env.local` or any real secret.

## GitHub integration

`app/api/github/route.ts` calls GitHub from the server, so an optional token is never exposed to the browser. It:

- requests public repositories only;
- excludes forks and archived repositories from the recent-work list;
- applies a six-second timeout;
- adds shared cache and stale-while-revalidate headers;
- returns verified local fallback data if GitHub is unavailable or rate-limited.

The language summary counts each repository's primary language metadata. It is explicitly labeled as repository information, not a measurement of professional skill.

## Programming quote system

The quote API landscape was reviewed during implementation. Keyless public programming-quote endpoints were rate-limited or unavailable during verification, so the production-safe default is the curated typed collection in `data/quotes.ts`.

The browser requests `app/api/quote/route.ts`. If `QUOTE_API_URL` is configured, that server route tries the remote endpoint with a 2.5-second timeout and validates the response before use. Any error, invalid payload, rate limit, or repeated quote falls back to the local collection. Reduced-motion users see timed transitions without typing/deleting animation.

Expected remote payloads may use one of these text fields: `text`, `quote`, `content`, or `en`; and `author` or `authorName` for attribution.

## Contact form configuration

Without email credentials, the form validates the message and returns a pre-filled `mailto:` draft. That mode works without exposing a service secret.

To enable direct delivery with Resend:

1. Verify a sending domain in Resend.
2. Add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` to the hosting provider.
3. Redeploy.

The implementation intentionally does not expose the Resend key to client code. If you prefer Formspree or Web3Forms, replace only the server logic in `app/api/contact/route.ts` and preserve the current response shape.

## Editing portfolio content

Most personal content lives in these files:

- `data/profile.ts` - name, role, email, biography, links, status, image path, and learning goals
- `data/projects.ts` - project descriptions, technologies, features, categories, source links, and live links
- `data/skills.ts` - grouped skills
- `data/experience.ts` - education and training timeline
- `data/quotes.ts` - local programming quotes and verified/anonymous attribution
- `types/portfolio.ts` - shared TypeScript models

When adding a project, include only supported claims and set `collaborative: true` where appropriate.

## Replacing images and files

- Profile image: add an optimized photo such as `public/images/profile.webp`, then set `profileImage` in `data/profile.ts` to `/images/profile.webp`. The current monogram is an intentional placeholder.
- Project previews: project cards use original CSS-rendered, copyright-safe visuals. Replace `ProjectVisual` with local screenshots if desired.
- Social card: replace `public/og.png` with a 1200 x 630 image, keeping the same filename or updating metadata in `app/layout.tsx`.
- Favicon: replace `public/favicon.svg` with a final personal mark.
- CV: the current `public/documents/lasha-abramishvili-cv.pdf` is a generated public-safe version. Replace it with an approved public CV using the same filename to keep every button working.

The uploaded source CV was used for factual content but was not copied directly because it contains a phone number and full street address.

To regenerate the public-safe CV after editing the generator:

```bash
/path/to/python scripts/generate_public_cv.py
```

The script requires ReportLab.

## Project structure

```text
app/
  about/              About route
  api/contact/        Validated contact endpoint
  api/github/         Server-side GitHub integration
  api/quote/          Quote validation and fallback endpoint
  contact/            Contact route
  projects/           Filterable project archive
  globals.css         Design system and responsive styles
  layout.tsx          Global shell, metadata, and structured data
  manifest.ts         Web app manifest
  robots.ts           Crawler rules
  sitemap.ts          Sitemap
components/           Reusable UI and interactive components
data/                 Central editable portfolio content
public/
  documents/          Public-safe CV
  images/             Profile and local image replacements
  og.png              Social-sharing card
scripts/              Public CV generator
types/                Shared TypeScript types
```

## Vercel deployment

1. Push the project to a Git repository.
2. Import the repository in Vercel.
3. Confirm the framework as Next.js. Vercel will automatically use `npm run build`.
4. Add `NEXT_PUBLIC_SITE_URL` with the final production URL.
5. Add optional GitHub and Resend variables in Project Settings - Environment Variables.
6. Deploy, then test `/`, `/projects`, `/about`, `/contact`, `/sitemap.xml`, the CV download, the contact fallback, and social previews.

The project uses the standard Next.js build and does not contain a hosting-provider sign-in gate. It does not require a database or object storage.

## Known limitations and review items

- LinkedIn's public page content was not reliably accessible during implementation, so no LinkedIn-only claims were added. The profile link is included for recruiters.
- Training dates, GPA, and language levels are taken from the supplied CV and should be reviewed before public launch.
- The Personal Finance App and Healthcare Analytics Dashboard are accurately marked as collaborative projects.
- GitHub API data is unauthenticated by default and may use fallback content when rate-limited.
- A remote quote provider is intentionally not enabled by default because the tested keyless endpoints were unreliable.
- Direct contact delivery requires optional Resend configuration; otherwise the form creates a local email draft.
- Update `NEXT_PUBLIC_SITE_URL` before public deployment so canonical and sharing URLs use the final domain.
