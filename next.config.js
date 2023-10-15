/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    domains: [
      process.env.NEXT_PUBLIC_SERVER_HOST,
      "dev.obj.kr",
      "unsangu.com",
      "localhost:3000",
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
