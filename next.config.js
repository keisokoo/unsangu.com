const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    webpackBuildWorker: true,
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost:3030",
      },
      {
        protocol: "https",
        hostname: "**.obj.kr",
      },
      {
        protocol: "https",
        hostname: "**.unsangu.com",
      },
      {
        protocol: "https",
        hostname: "unsangu.com",
      },
    ],
  },
  reactStrictMode: false,
};

module.exports = withBundleAnalyzer(nextConfig);
