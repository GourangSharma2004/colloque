/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://colloque.in",
  generateRobotsTxt: false,
  outDir: "public",
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ["/studio/*", "/api/*", "/auth/*"],
  additionalPaths: async () => {
    return [
      { loc: "/", changefreq: "daily", priority: 1.0 },
      { loc: "/intellect", changefreq: "weekly", priority: 0.9 },
      { loc: "/book-summaries", changefreq: "weekly", priority: 0.9 },
      { loc: "/ai-resources", changefreq: "weekly", priority: 0.9 },
      { loc: "/community", changefreq: "weekly", priority: 0.8 },
      { loc: "/the-log", changefreq: "weekly", priority: 0.8 },
      { loc: "/privacy", changefreq: "monthly", priority: 0.3 },
      { loc: "/terms", changefreq: "monthly", priority: 0.3 },
    ];
  },
};
