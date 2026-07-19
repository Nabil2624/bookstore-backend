import type { Context, Next } from 'hono';
import { z } from 'zod';

export function validate(
  schema: z.ZodTypeAny,
  source: 'body' | 'query' = 'body',
) {
  return async (c: Context, next: Next) => {
    const data =
      source === 'body'
        ? await c.req.json()
        : c.req.query();

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