const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  // Send the small Tailwind stylesheet with the document on high-latency first visits.
  experimental: { inlineCss: true },
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"]
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  }
};

export default nextConfig;
