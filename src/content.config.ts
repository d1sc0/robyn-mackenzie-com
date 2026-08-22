import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    featureImage: z.string().optional(),
    draft: z.boolean().optional().default(false),
    tags: z.array(z.string()).optional().default([]),
    category: z.string().optional().default('Thoughts'),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date().optional(),
    description: z.string(),
    client: z.string().optional(),
    industry: z.string().optional(),
    year: z.string().optional(),
    role: z.string().optional(),
    featured: z.boolean().optional().default(false),
    order: z.number().optional().default(99),
    featureImage: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    challenge: z.string().optional(),
    result: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    featureImage: z.string().optional(),
  }),
});

export const collections = { posts, work, pages };
