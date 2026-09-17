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
    return [{ source: "/:path*", headers: securityHeaders }];
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
