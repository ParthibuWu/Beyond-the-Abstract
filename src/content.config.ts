import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const research = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/research" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date().optional(),
    originalPaperDate: z.string().optional(),
    paperTitle: z.string().optional(),
    paperAuthors: z.array(z.string()).default([]),
    journal: z.string().optional(),
    doi: z.string().optional(),
    paperUrl: z.string().url().optional(),
    publicationStatus: z.enum(["peer-reviewed", "preprint", "conference", "unverified", "not-applicable"]).default("unverified"),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    readingTime: z.number().int().positive().default(6),
    difficulty: z.enum(["Introductory", "Intermediate", "Advanced"]).default("Intermediate"),
    featured: z.boolean().default(false),
    status: z.enum(["published", "draft", "outline"]).default("draft"),
    featuredImage: z.string().optional(),
    codeRepository: z.string().url().optional(),
    datasetLinks: z.array(z.string().url()).default([]),
    references: z.array(z.string()).default([]),
  }),
});

export const collections = { research };
