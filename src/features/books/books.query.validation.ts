import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string().trim().min(2).max(100),

  description: z.string().trim().min(2).max(1500),

  price: z.number().int().positive(),

  thumbnail: z.url(),

  authorId: z.number().int().positive(),

  categoryId: z.number().int().positive(),

  tagIds: z.array(z.number().int().positive()).default([]),
});

export const bookQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),

  limit: z.coerce.number().int().positive().max(100).default(10),

  search: z.string().trim().optional(),

  sort: z.enum(['asc', 'desc']).default('asc'),

  categoryId: z.coerce.number().int().positive().optional(),

  minPrice: z.coerce.number().int().nonnegative().optional(),

  maxPrice: z.coerce.number().int().nonnegative().optional(),
});

export type CreateBookData = z.infer<typeof bookSchema>;
export type UpdateBookData = z.infer<typeof bookSchema>;
export type BookQueryData = z.infer<typeof bookQuerySchema>;