import { Hono } from 'hono';

export const router = new Hono();

router.get('/', (c) => {
  return c.text('Bookstore API is running!');
});

router.get('/health', (c) => {
  return c.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
  });
});