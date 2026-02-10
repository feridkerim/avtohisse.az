import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    // Tree‑shake large UI/icon libraries to reduce bundle size
    optimizePackageImports: ["lucide-react", "@iconify/react", "react-icons"],
  },
};

export default nextConfig;
