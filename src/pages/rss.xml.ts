import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  if (!context.site) throw new Error("Set the site URL in astro.config.mjs before generating the RSS feed.");
  const published = await getCollection("research", ({ data }) => data.status === "published");

  return rss({
    title: "Beyond the Abstract",
    description: "Independent educational notes on computational biology, scientific machine learning, and scientific methods.",
    site: context.site,
    items: published.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.pubDate,
      link: import.meta.env.BASE_URL + "research/" + entry.id + "/",
      categories: [entry.data.category, ...entry.data.tags],
    })),
    customData: "<language>en</language>",
  });
}
