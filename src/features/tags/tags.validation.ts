import { z } from 'zod';



export const tagSchema = z.object({
    name: z.string().trim().min(2).max(100)
});


export type CreateTagData = z.infer<typeof tagSchema >;
export type UpdateTagData = z.infer<typeof tagSchema >;

