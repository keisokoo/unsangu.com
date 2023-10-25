const { log } = require("console");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://unsangu.com",
  generateIndexSitemap: false,
  additionalPaths: async (config) => {
    const result = [];

    // required value only
    result.push(
      {
        loc: "/apps",
        changefreq: "monthly",
        priority: 0.5,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/posts",
        changefreq: "monthly",
        priority: 0.5,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/posts/groups",
        changefreq: "monthly",
        priority: 0.5,
        lastmod: new Date().toISOString(),
      },
    );
    return result;
  },
};
