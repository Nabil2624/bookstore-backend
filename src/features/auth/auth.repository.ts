import { db } from '../../db/db.js';
import { users } from '../../db/schema/index.js';
import { eq } from 'drizzle-orm';
import { UpdateProfileData } from './auth.validation.js';

export async function findUserByEmail(email: string) {
  return db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });
}

export async function findUserByUsername(username: string) {
  return db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  });
}

export async function createUser(data: typeof users.$inferInsert) {
  const [createdUser] = await db.insert(users).values(data).returning();

  return createdUser;
}

export async function updatePassword(userId: number, hashedPassword: string) {
  await db
    .update(users)
    .set({
      password: hashedPassword,
    })
    .where(eq(users.id, userId));
}

export async function findUserById(userId: number) {
  return db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });
}

export async function updateUserProfile(userId: number, data: UpdateProfileData) {
  const [updatedUser] = await db
    .update(users)
    .set({
      name: data.name,
      username: data.username,
      email: data.email,
    })
    .where(eq(users.id, userId))
    .returning();

  return updatedUser;
}
