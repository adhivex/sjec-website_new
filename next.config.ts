import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // HTTPS only for a year. No includeSubDomains: other sjec.in subdomains
  // (mail etc.) aren't managed here.
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    qualities: [75, 85],
    localPatterns: [{ pathname: "/images/**", search: "" }],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Pages must be revalidated, never reused blindly. Next serves them
        // with `s-maxage=31536000`, which lets any shared cache (a CDN, a
        // mobile carrier proxy) keep the HTML for a year. After a deploy that
        // stale HTML asks for script chunks that no longer exist, so the page
        // renders but nothing works — that is how the mobile menu "did
        // nothing" on a real phone while every test passed.
        // Hashed assets under /_next/static keep their immutable caching.
        source: "/((?!_next/static|_next/image).*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
    ];
  },
  async redirects() {
    return [
      // One canonical host: www.sjec.in → sjec.in
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.sjec.in" }],
        destination: "https://sjec.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
