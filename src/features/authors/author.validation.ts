import { z } from 'zod';

export const authorSchema = z.object({
     name: z.string().trim().min(2).max(100),
})

export type CreateAuthorData = z.infer<typeof authorSchema>;
export type UpdateAuthorData = z.infer<typeof authorSchema>;


