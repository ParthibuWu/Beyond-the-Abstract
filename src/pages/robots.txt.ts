import type { APIContext } from "astro";

export function GET({ site }: APIContext) {
  const sitemap = site
    ? new URL(import.meta.env.BASE_URL + "sitemap-index.xml", site).href
    : "";
  const body = ["User-agent: *", "Allow: /", sitemap ? "Sitemap: " + sitemap : ""]
    .filter(Boolean)
    .join("\n");

  return new Response(body + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
