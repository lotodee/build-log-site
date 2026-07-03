import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Extend Starlight's built-in docs schema with the structured fields the
// overview table and status badges read (day_number, status, goal, etc).
// This is the single source of truth per status_site_skill_plan.md
// section 3: the overview table is a derived view over this frontmatter,
// never hand-maintained twice.
export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        day_number: z.union([z.number(), z.literal('M0')]).optional(),
        status: z.enum(['upcoming', 'in_progress', 'done']).optional(),
        date_landed: z.string().optional(),
        goal: z.string().optional(),
        non_negotiable: z.union([z.boolean(), z.string()]).optional(),
      }),
    }),
  }),
};
