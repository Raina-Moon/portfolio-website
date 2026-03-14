import type { APIRoute } from "astro";
import { mockPosts } from "@/libs/api/mockTroubleshooting";

const formatUrl = (origin: string, path: string) =>
  `${origin}${path.startsWith("/") ? path : `/${path}`}`;

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    return new Response("Missing site URL", { status: 500 });
  }

  const origin = site.toString().replace(/\/$/, "");
  const staticRoutes = [
    {
      loc: formatUrl(origin, "/"),
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      loc: formatUrl(origin, "/troubleshooting"),
      changefreq: "weekly",
      priority: "0.8",
    },
  ];

  const postRoutes = mockPosts.map((post) => ({
    loc: formatUrl(origin, `/troubleshooting/${post.id}`),
    lastmod: new Date(post.createdAt).toISOString(),
    changefreq: "monthly",
    priority: "0.7",
  }));

  const urls = [...staticRoutes, ...postRoutes]
    .map(
      (entry) => `<url>
  <loc>${entry.loc}</loc>
  ${"lastmod" in entry && entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ""}
  <changefreq>${entry.changefreq}</changefreq>
  <priority>${entry.priority}</priority>
</url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
