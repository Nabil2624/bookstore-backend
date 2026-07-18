import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().trim().min(2).max(100),
});

export type CreateCategoryData = z.infer<typeof categorySchema>;
export type UpdateCategoryData = z.infer<typeof categorySchema>;