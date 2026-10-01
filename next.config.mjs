import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  async rewrites() {
    const phpApi = process.env.PHP_API_URL;
    if (!phpApi) {
      return [];
    }
    return [
      {
        source: "/php-api/:path*",
        destination: `${phpApi}/:path*`,
      },
    ];
  },
};

export default nextConfig;
