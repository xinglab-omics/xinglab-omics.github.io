const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  experimental: {
    inlineCss: true, // App Router
    // Next's Pages Router loads the Critters API, provided by the maintained Beasties fork.
    optimizeCss: { inlineThreshold: 48 * 1024 }
  },
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"]
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  }
};

export default nextConfig;
