import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const origin = site?.toString().replace(/\/$/, "") ?? "";
  const sitemapLine = origin ? `Sitemap: ${origin}/sitemap.xml\n` : "";

  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /troubleshooting/edit",
    "Disallow: /troubleshooting/edit/",
    sitemapLine.trim(),
  ]
    .filter(Boolean)
    .join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
