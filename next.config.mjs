const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Dev only: the Tianditu map key is whitelisted for 127.0.0.1 (not localhost), so local
  // preview of the team map runs at http://127.0.0.1:3000.
  allowedDevOrigins: ["127.0.0.1"],
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"]
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  }
};

export default nextConfig;
