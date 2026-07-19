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

export type CreateBookData = z.infer<typeof bookSchema>;
export type UpdateBookData = z.infer<typeof bookSchema>;