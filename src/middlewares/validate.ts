import type {Context, Next} from 'hono';
import {z} from 'zod';

export function validate(schema: z.ZodTypeAny) {
  return async (c: Context, next: Next) => {
    const data = await c.req.json();

    const result = schema.safeParse(data);

    if (!result.success) {
      return c.json(
        {
          errors: result.error.flatten(),
        },
        400,
      );
    }

    await next();
  };
}