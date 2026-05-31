import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown files in the src/content/blog folder.
	loader: glob({ base: './src/content/blog', pattern: '**/index.md' }),
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			date: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			coverImage: z.string().optional(),
			categories: z.array(z.string()).optional(),
			shortSlug: z.string().optional(),
		}),
});

export const collections = { blog };
