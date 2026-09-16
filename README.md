# Sai Jagannath Engineering & Construction — Website

Live at **https://sjec.in**. Marketing site for Sai Jagannath Engineering & Construction (Cuttack, Odisha),
an electrical HT/LT and instrumentation contractor for industrial plants.

Built with Next.js 16 (App Router), Tailwind CSS v4, Framer Motion, and SQLite
via Drizzle ORM. See [CLAUDE.md](CLAUDE.md) for the full handoff notes: stack
decisions, content status, remaining placeholders and next steps.

## Getting started

Requires Node.js 20.9+ (22 recommended, see `.nvmrc`).

```bash
npm install
npm run db:seed    # build sqlite.db from drizzle/ migrations + seed
npm run dev        # http://localhost:3000
```

## Scripts

| Command               | What it does                                    |
| --------------------- | ----------------------------------------------- |
| `npm run dev`         | Dev server with hot reload                      |
| `npm run build`       | Build the database, then the production build   |
| `npm run start`       | Serve the production build                      |
| `npm run lint`        | ESLint                                          |
| `npm run db:seed`     | Rebuild `sqlite.db` from migrations + seed      |
| `npm run db:generate` | Create a migration after editing `schema.ts`    |
| `npm run db:studio`   | Browse the database in Drizzle Studio           |
| `npm run package`     | ZIP for Hostinger upload (fallback)             |

## Editing content

Content is baked in at build time, so every change goes through Git: edit,
commit, push, and Hostinger redeploys.

- **Projects, services, stats, gallery, testimonial**: `src/db/seed.ts`, then
  `npm run db:seed` locally to preview.
- **Company details** (phones, email, address, clients, leadership,
  equipment): `src/content/company.ts`.
- **Photos**: `public/images/site/`.

## Deployment

GitHub → Hostinger (Business/Cloud plan, Node.js web app). See
[DEPLOYMENT.md](DEPLOYMENT.md).

## Environment

| Variable               | Purpose                                                        |
| ---------------------- | -------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Optional override for the site origin (e.g. a staging URL). Defaults to `https://sjec.in` in production builds and `http://localhost:3000` in dev. |

## Routes

- `/`: home
- `/projects`: all projects
- `/projects/[slug]`: project detail
- `/sitemap.xml`, `/robots.txt`
