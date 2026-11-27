import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");
const owner = process.env.GITHUB_REPOSITORY_OWNER || env.GITHUB_REPOSITORY_OWNER || "your-github-username";
const repositoryValue = process.env.GITHUB_REPOSITORY || env.GITHUB_REPOSITORY || "";
const repository = repositoryValue.split("/").at(-1) || "beyond-the-abstract";
const isUserSite = repository === owner + ".github.io";
const defaultBase = isUserSite ? "/" : "/" + repository;

export default defineConfig({
  site: process.env.SITE_URL || env.SITE_URL || "https://" + owner + ".github.io",
  base: process.env.BASE_PATH || env.BASE_PATH || defaultBase,
  output: "static",
  integrations: [sitemap()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
      wrap: false,
    },
  },
});
