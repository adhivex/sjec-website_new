# CLAUDE.md — Handoff Notes for the Sai Jagannath Engineering & Construction Website

This file exists so a fresh Claude Code session (or any developer) can pick this
project up with full context. Read this before making changes.

## What this project is

A premium marketing website for **Sai Jagannath Engineering & Construction**
(Cuttack, Odisha), an electrical HT/LT and instrumentation contractor for
steel/DRI, cement, pellet and power plants, built for OrangeKite's client.
All real content comes from the client's profile PDF in the project root
(`SAI JAGANNATH PROFILE with credentials.pdf`).

**Domain: https://sjec.in** — the default origin for production builds
(`src/lib/site.ts`).

Design direction chosen by the client: **"Modern Premium"** — ivory/navy palette
with a brass accent, serif display type (Fraunces) over a clean sans body
(Work Sans), editorial spacing, not industrial/loud. Two other design directions
("Industrial Edge" — dark/amber, and "Blueprint Precision" — navy
blueprint-grid) were explored and rejected in favor of this one; don't
reintroduce their visual language unless asked.

## Stack (all decisions already made — don't re-litigate without asking)

- **Next.js 16** (App Router, TypeScript, `src/` dir, Turbopack)
- **Tailwind CSS v4** — brand tokens defined as CSS variables in
  `src/app/globals.css` under `@theme inline` (`--color-ivory`, `--color-navy`,
  `--color-brass`, etc.) — use these utility classes (`bg-ivory`, `text-navy`,
  `text-brass`, `border-line`, `text-muted`, `text-stone`) rather than
  hardcoding hex values anywhere new.
- **Fonts**: Fraunces (display, `.font-display`) + Work Sans (body, default),
  self-hosted via `next/font/google` in `src/app/layout.tsx` (CSS variables
  `--font-fraunces` / `--font-work-sans`, consumed by `@theme` in
  `globals.css`). The build needs to reach Google Fonts once to download them.
- **Database**: SQLite via **Drizzle ORM** + `better-sqlite3` (NOT Prisma —
  Prisma was tried first but its CLI needs to reach `binaries.prisma.sh`;
  the leftover `prisma/` folder is unused). Schema: `src/db/schema.ts`.
  Client: `src/db/index.ts`. Config: `drizzle.config.ts`.
  **better-sqlite3 is pinned to v12**: v13 ships no prebuilt binaries and
  always compiles from source, which fails on Windows machines without
  Python and the Visual Studio build tools.
- **Animation**: CSS only — **there is no animation library**. Framer Motion
  was removed (Sept 2026) because it rendered every scroll reveal with
  `opacity: 0` in the HTML: on real phones the page showed empty boxes until
  hydration finished, which read as "the site is broken". Keep animations
  subtle (0.6–0.7s, 18–24px y-offset, ease `[0.22, 1, 0.36, 1]`) — the client
  asked for "subtle premium," not flashy.
  - **No content may depend on JavaScript to become visible.** This is the
    rule that matters; everything below follows from it.
  - Above the fold (hero, `/projects` and `/projects/[slug]` headers): the
    CSS classes `.animate-rise` (transform only) and `.animate-rise-fade`
    from `globals.css`, which run at first paint. `Hero.tsx` is a server
    component for the same reason.
  - Below the fold: `src/components/Reveal.tsx` (`Reveal`, `RevealStagger`,
    `RevealItem`) are plain server components that only add class names.
    `src/components/ScrollReveal.tsx` (one small client component in the root
    layout) hides *only* what is below the fold when it runs and fades it in
    with an IntersectionObserver. No script, slow script, failed script or
    reduced-motion preference can leave content hidden.
  - If you reintroduce an animation library, check the server HTML for
    `opacity:0` first, and test with JavaScript disabled.
- **Accessibility tokens (WCAG AA)**: `text-brass` (#b08d57) is only 2.96:1
  on ivory, so it's for icons, buttons and borders only. Use `text-brass-ink`
  for small brass text and `text-brass-deep` for large brass numerals. `stone`
  (#766b56) and `muted` (#636a77) were darkened from the original values to
  pass 4.5:1 on both ivory and ivory-deep. Keep tap targets at least 24px
  tall and form fields at 16px below `lg` (iOS zooms on smaller text).
- **Icons**: `lucide-react`.
- **Images**: real site photos cropped from the profile PDF live in
  `public/images/site/` and render through `next/image` (`qualities` and
  `localPatterns` are set in `next.config.ts`, which Next 16 requires).
- **Brand assets**: the client's artwork (wheel-and-torch mark, SJEC wordmark)
  is in `design/brand-source/` — originals, not served. Web versions are in
  `public/images/brand/`:
  - `logo-nav.png` — wheel + SJEC without the lockup's tagline line, used in
    the nav and footer. The lockup's own tagline is unreadable below ~64px, so
    NavBar sets it as HTML text underneath instead.
  - `logo.png` — the full lockup, for schema.org `logo` only.
  - `logo-icon.png` — the wheel on its own.
  - `hero.jpg` — the home hero background.
  - App icons (`src/app/icon.png`, `apple-icon.png`, `favicon.ico`) are the
    brass wheel on the navy brand square, generated from the source artwork.
  Regenerate them with `scripts/brand-assets.mjs` if the artwork changes.
- **Home hero**: a full-bleed photograph with a navy overlay
  (`bg-navy/80`, and a left-to-right gradient from `lg`). Measured contrast
  behind the text is 8:1 or better — keep it there if the overlay changes.
  The NavBar is solid ivory at all times because the dark hero sits directly
  beneath it. Don't add `placeholder="blur"` to the hero: on a full-viewport
  image the blurred placeholder measurably increased main-thread work.
- **Contact form**: intentionally static — `src/components/ContactSection.tsx`
  only sets local state on submit, no network call. The client explicitly said
  "no working backend for now." After submit it tells the visitor that online
  enquiries aren't connected yet and shows the phone/email instead. A
  `contactSubmissions` table already exists for when that changes.

## Project structure

```
src/
  app/
    layout.tsx               — root layout, fonts, metadata (metadataBase from lib/site.ts)
    page.tsx                 — home page; server component, fetches content from SQLite
    projects/page.tsx        — all projects: ongoing/completed grids + summary table
    projects/[slug]/page.tsx — project detail (static via generateStaticParams)
    not-found.tsx            — branded 404
    error.tsx                — branded error boundary (uses Next 16 `retry()`)
    sitemap.ts, robots.ts    — generated from the DB + SITE_URL
    icon.svg, apple-icon.png, favicon.ico — "SJ" monogram (navy/brass)
    globals.css              — brand tokens, smooth scroll, reduced-motion override
  content/
    company.ts               — company facts shared across components: name, phones,
                               email, address, licence/GSTIN, clients, leadership,
                               industries, equipment. Edit here, not inline.
  components/
    NavBar.tsx          — sticky nav + mobile menu; links are absolute (/#about) so they work on subpages
    Hero.tsx            — animated hero, hero photo, stats row (stats from DB)
    Services.tsx        — services grid (from DB, icon name → lucide icon map) + industries strip
    Projects.tsx        — featured project cards on the home page (from DB)
    ProjectCard.tsx     — shared project card + status badge
    About.tsx           — story, mission/vision/quality, leadership, equipment, clients (static)
    Safety.tsx          — "zero harm" safety commitment (static)
    Gallery.tsx         — "Glimpses of our execution" masonry + keyboard-accessible lightbox (from DB)
    StructuredData.tsx  — schema.org Electrician JSON-LD on the home page (profile facts only)
    Process.tsx         — static 4-step process
    Testimonial.tsx     — testimonial quote + closing CTA band
    ContactSection.tsx  — contact details + static form
    Footer.tsx          — footer (from content/company.ts)
    Reveal.tsx          — scroll-reveal wrappers (class names only, no JS)
    ScrollReveal.tsx    — client: hides below-the-fold reveals after hydration, fades them in
  db/
    schema.ts           — projects (client, status, capacity, valueCr, period, …),
                          services, testimonials, stats, galleryImages, contactSubmissions
    index.ts            — Drizzle client singleton (SQLite file: sqlite.db at project root)
    seed.ts             — seeds the real profile content (see "Content status")
  lib/
    id.ts               — tiny dependency-free id generator for primary keys
    site.ts             — SITE_URL / absoluteUrl(): https://sjec.in in production,
                          localhost in dev, NEXT_PUBLIC_SITE_URL overrides
public/images/site/     — site photos extracted from the profile PDF
drizzle/                — committed SQL migrations (applied by scripts/db-setup.ts)
scripts/db-setup.ts     — migrate + seed; runs before every build
scripts/package.mjs     — builds the Hostinger ZIP (bsdtar, forward-slash paths)
drizzle.config.ts       — drizzle-kit config (dialect: sqlite)
.github/                — CI workflow + Dependabot
DEPLOYMENT.md           — GitHub → Hostinger deployment guide
_archive/               — the original handoff zips (gitignored)
```

## Content status

Real content from the profile PDF is in place: company name, address, phones,
email, electrical licence, GSTIN, about/mission/vision/quality text, services
(scope of work), industries, clients, leadership, equipment, safety policy,
all 14 projects (7 completed, 7 ongoing, with capacity/period/value), stats
derived from those figures, and site photos.

Deliberately **not** published from the PDF: bank account/IFSC, PAN, ESIC,
EPF and labour licence numbers; partners' personal mobile numbers; and the
profile's claim of an "Australian Government OHS accreditation", which looks
like copied boilerplate. Confirm with the client before using any of these.

Still placeholder. **Do not invent these; wait for the client:**

- The testimonial (`src/db/seed.ts`) — the profile has no client quote.
- Per-project scope of work — each project description ends with a
  `[Detailed scope of work …]` paragraph.
- Site-specific project photos — project cards use representative photos
  (captioned as such on the detail page).
- Logo — the nav uses a typographic wordmark.

Corrections made while transcribing the PDF (confirm with the client):

- The second phone number is printed as "89172898829" (11 digits). The team
  page lists "8917298829" for partner Bibhuti Bhushan Pratihari, so the site
  uses that.
- The email is printed as "saijagannathengineering@gmail." (truncated). The
  site assumes `@gmail.com`.
- "Kaplish Cement Works" → Dalmia's Kapilas Cement Works; "Vetnary" →
  Veterinary; "Pranakrushna Sahooi" → Sahoo.

## Hosting & deployment

Hosted on **Hostinger (Business/Cloud plan) as a Node.js web app, deployed
from GitHub** (`main` branch). Full steps: [DEPLOYMENT.md](DEPLOYMENT.md).

- Hostinger overwrites the app's files on every deploy, so **the database is
  only a build-time content source**. `npm run build` runs
  `scripts/db-setup.ts` (apply the `drizzle/` migrations, then seed) before
  `next build`. Every page is statically generated (no `revalidate`, and
  `dynamicParams = false` on project pages), so the running server never
  opens `sqlite.db`. Don't add runtime database reads or writes without
  revisiting this. A contact-form backend would need Hostinger MySQL or
  another hosted database.
- `sqlite.db` is gitignored and regenerated on every build.
- `tsx` is a runtime dependency (not a devDependency) because the build uses it.
- `allowScripts` in package.json approves the install scripts for
  better-sqlite3, esbuild and unrs-resolver (npm 11+).
- GitHub Actions (`.github/workflows/ci.yml`) runs lint, typecheck and the
  build on every push and PR. Dependabot runs monthly and ignores major
  better-sqlite3 upgrades.
- The profile PDF and `_archive/` are gitignored because the PDF contains
  bank, PAN, ESIC and EPF details. Never commit them.

## Commands

```bash
npm install           # install deps
npm run dev           # dev server (http://localhost:3000)
npm run db:seed       # rebuild sqlite.db from migrations + seed (on Windows, stop the dev server first)
npm run db:generate   # after editing schema.ts: write a new migration into drizzle/
npm run db:studio     # visual DB browser (drizzle-kit studio)
npm run build         # db setup + production build (what Hostinger runs)
npm run start         # run the production build
npm run lint          # eslint
npm run typecheck     # next typegen + tsc (typegen creates the gitignored next-env.d.ts and PageProps types)
npm run package       # deploy/sjec-site.zip for Hostinger ZIP upload (fallback)
```

## Known-good state

- `npm run build` and `npm run lint` pass clean.
- Routes: `/`, `/projects`, `/projects/[slug]` (14 static pages), the 404
  page, `/sitemap.xml` and `/robots.txt`.
- A clean copy of the ZIP package installs, builds twice, and serves every
  route with no database present at runtime (verified).
- `next.config.ts` sends security headers (HSTS without includeSubDomains,
  nosniff, frame and referrer policy), hides `X-Powered-By`, and redirects
  `www.sjec.in` to `https://sjec.in`. Every page sets a canonical URL.
- Live QA (Sept 2026): headless Edge at 375/768/1440px passes the menu,
  anchor, lightbox, form, project-page and 404 checks, with zero axe WCAG
  2 AA violations. Lighthouse scores 99–100 on desktop; on mobile, accessibility
  and SEO score 100 and performance 85–96 under simulated throttling.
- **Mobile regression test — run this before every release**: load the page
  with JavaScript disabled and confirm nothing renders at zero opacity and
  every section is readable. `scripts/check-no-js.mjs` does it headlessly.
  A build that fails this looks broken on real phones even though every
  emulated check passes.

## Next steps (not yet done — pick up here)

Done so far: real content, images, project detail pages, font self-hosting,
sitemap/robots, structured data, favicon, gallery lightbox, error page.

1. **Remaining placeholders**: see "Content status" above (testimonial,
   per-project scope, site-specific photos, logo).
2. **Contact form backend** (only if/when the client wants it wired up):
   add `src/app/api/contact/route.ts`, validate with the already-installed
   `zod`, insert into the existing `contactSubmissions` table via Drizzle,
   and optionally send a notification email (Nodemailer/Resend — neither is
   installed yet). Then restore a real "thank you" state.
3. **Go live**: push to GitHub and connect Hostinger, following
   DEPLOYMENT.md.
4. **After launch**: submit https://sjec.in/sitemap.xml in Google Search
   Console.
