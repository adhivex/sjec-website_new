// Canonical site origin, used by metadata, sitemap, robots and structured data.
// Production builds default to the live domain; dev uses localhost.
// NEXT_PUBLIC_SITE_URL overrides both (e.g. for a staging deploy).
const DEFAULT_URL = process.env.NODE_ENV === "production" ? "https://sjec.in" : "http://localhost:3000";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_URL).replace(/\/$/, "");

export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
