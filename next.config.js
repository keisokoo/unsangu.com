/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    domains: [process.env.NEXT_PUBLIC_SERVER_HOST],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
