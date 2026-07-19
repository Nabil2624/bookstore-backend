import { redis } from '../config/redis.js';

const EXPIRES_IN = 60 * 60 * 24 * 7; // 7 days

export async function saveToken(
  token: string,
  userId: number,
) {
  await redis.set(
    token,
    String(userId),
    {
      EX: EXPIRES_IN,
    },
  );
}

export async function hasToken(token: string) {
  return (await redis.exists(token)) === 1;
}

export async function deleteToken(token: string) {
  await redis.del(token);
}