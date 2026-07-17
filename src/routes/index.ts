import { Hono } from 'hono';
import authRouter from '../features/auth/auth.routes.js';
import authorRouter from '../features/authors/author.routes.js';
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

router.route('/auth', authRouter);
router.route('/authors',authorRouter )