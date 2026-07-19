import { serve } from '@hono/node-server';

import { app } from './app.js';
import { redis } from './config/redis.js';

const port = Number(process.env.PORT) || 3000;

await redis.connect();

console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});