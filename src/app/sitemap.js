const routes = [
  "",
  "/flights",
  "/hotels",
  "/holiday-packages",
  "/bus",
  "/visa",
  "/about",
  "/contact",
];

export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
