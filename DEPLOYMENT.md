# Deployment — GitHub → Hostinger (https://sjec.in)

The site runs on a Hostinger **Business or Cloud** plan as a Node.js web app,
deployed from GitHub. Every push to `main` runs CI on GitHub, and Hostinger
builds and serves the same code.

## How the build works

`npm run build` does two things:

1. `scripts/db-setup.ts` creates `sqlite.db` from the committed migrations in
   `drizzle/` and fills it from `src/db/seed.ts`.
2. `next build` prerenders every page from that database.

Every page is static, so the running site never reads the database. That
matters on Hostinger, which overwrites the app's files on every deploy:
anything written on the server at runtime would be lost. **To change content,
edit the seed (or `src/content/company.ts`), then commit and push.**

## 1. Create the GitHub repository (once)

1. On GitHub, create a new **private** repository, e.g. `sjec-website`.
   Leave "Add a README", ".gitignore" and "license" unticked.
2. Connect this folder to it and push:

   ```bash
   git remote add origin https://github.com/<account>/sjec-website.git
   git push -u origin main
   ```

3. Open the repo's **Actions** tab and check that the CI run passes.

## 2. Connect Hostinger (once)

1. hPanel → **Websites** → **Add website** → **Deploy Web App** →
   **Import Git Repository**.
2. Authorise GitHub and pick the repository. A Hostinger plan can link to
   only one GitHub account at a time, so use the account (or organisation)
   that holds the other client repos.
3. Build settings:

   | Setting          | Value                                   |
   | ---------------- | --------------------------------------- |
   | Framework        | Next.js                                 |
   | Branch           | `main`                                  |
   | Node.js version  | 22.x (matches `.nvmrc`)                 |
   | Install command  | `npm ci` (the default `npm install` also works) |
   | Build command    | `npm run build`                         |
   | Start command    | `npm run start`                         |
   | Output directory | `.next`                                 |

4. Environment variables: none required. `https://sjec.in` is the built-in
   default (`src/lib/site.ts`). Set `NEXT_PUBLIC_SITE_URL` only for a staging
   copy on another address.
5. Deploy, then open the temporary Hostinger URL and check the site.

## 3. Domain and HTTPS (once)

1. Attach `sjec.in` to the web app in hPanel. If the domain is registered
   elsewhere, point its DNS at Hostinger as hPanel instructs.
2. Make sure the SSL certificate is active, and that `http://` and `www.`
   both redirect to `https://sjec.in`.
3. In Google Search Console, add `https://sjec.in` and submit
   `https://sjec.in/sitemap.xml`.

## Everyday updates

```bash
git add -A
git commit -m "Describe the change"
git push
```

Hostinger redeploys from `main`. Turn on auto-deploy in the app's settings,
or click **Redeploy**. For larger changes, use a branch and pull request so
CI checks them before they reach `main`.

## Changing the database schema

1. Edit `src/db/schema.ts`.
2. Run `npm run db:generate`, which writes a new migration into `drizzle/`.
3. Update `src/db/seed.ts` to match, then run `npm run db:seed` locally.
4. Commit the migration together with the code.

## Fallback: ZIP upload

If GitHub isn't available, `npm run package` creates `deploy/sjec-site.zip`.
Upload it via hPanel → Deploy Web App → **Upload your website files** and use
the same build settings.

## Troubleshooting

- **Build fails installing `better-sqlite3`**: the package downloads a
  prebuilt binary during `npm ci`. Check the build log for network errors,
  and keep it on v12 (v13 has no prebuilt binaries).
- **Build fails fetching fonts**: `next/font` downloads Fraunces and Work Sans
  from Google Fonts at build time. Retry the deploy.
- **A content change doesn't show**: confirm the commit reached `main` and
  that Hostinger redeployed it. Content only changes with a new build.
