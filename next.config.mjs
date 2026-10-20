// Exportação estática para o GitHub Pages (site de projeto em /barba-negra).
// Em desenvolvimento e em domínio próprio, deixe NEXT_PUBLIC_BASE_PATH vazio.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { loader: "custom", loaderFile: "./src/imageLoader.ts" },
};
export default nextConfig;
