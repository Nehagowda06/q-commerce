import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next/Turbopack doesn't walk up and pick a stray
  // lockfile in the repo root.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
