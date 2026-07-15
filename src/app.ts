import { Hono } from 'hono';

import { router } from './routes/index.js';

export const app = new Hono();

app.route('/api', router);

app.onError((err, c) => {
  console.error(err);

  return c.json(
    {
      success: false,
      message: 'Internal Server Error',
    },
    500,
  );
});

app.notFound((c) => {
  return c.json(
    {
      success: false,
      message: 'Route not found',
    },
    404,
  );
});