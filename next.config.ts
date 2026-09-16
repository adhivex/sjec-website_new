import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85],
    localPatterns: [{ pathname: "/images/**", search: "" }],
  },
};

export default nextConfig;
