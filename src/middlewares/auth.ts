import type { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError.js';
import { JwtPayload } from '../utils/jwt.js';
import { hasToken } from '../utils/tokenStore.js';

export async function auth(c: Context, next: Next) {
    const authorization = c.req.header('Authorization');

    if (!authorization) {
        throw new AppError('Unauthorized', 401);
    }

    const parts = authorization.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        throw new AppError('Unauthorized', 401);
    }

    const token = parts[1];

    


try {
const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET!,
) as JwtPayload;

const tokenExists = await hasToken(token);

if (!tokenExists) {
  throw new AppError('Unauthorized', 401);
}

c.set('user', decoded);

await next();
} catch {
    throw new AppError('Unauthorized', 401);
}
    
}