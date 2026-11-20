import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';
import { load as loadYaml } from 'js-yaml';

// Seeded from _handoff/content/work/projects.yaml (copied verbatim to src/content/work/projects.yaml).
const PROJECTS_FILE = 'src/content/work/projects.yaml';

interface ProjectsFile {
  projects: Array<Record<string, unknown> & { slug: string }>;
  reviews: { items: Array<Record<string, unknown> & { id: string }> };
}

const parse = (text: string) => loadYaml(text) as ProjectsFile;

const work = defineCollection({
  loader: file(PROJECTS_FILE, {
    parser: (text) => parse(text).projects.map((p) => ({ id: p.slug, ...p })),
  }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    homeCardTitle: z.string().nullable(),
    portfolioCardTitle: z.string(),
    footerLabel: z.string(),
    moreLabel: z.string(),
    order: z.number(),
    homeCard: z.number().nullable(),
    portfolioLayout: z.enum(['wide', 'grid']),
    featured: z.boolean().default(false),
    tags: z.array(z.string()),
    ownProject: z.boolean(),
    cardSummary: z.string().nullable(),
    problem: z.string(),
    built: z.string(),
  }),
});

const reviews = defineCollection({
  loader: file(PROJECTS_FILE, {
    parser: (text) => parse(text).reviews.items,
  }),
  schema: z.object({
    id: z.string(),
    project: z.string().nullable(),
    projectLabel: z.string(),
    excerpt: z.string(),
    full: z.string().optional(),
  }),
});

export const collections = { work, reviews };
