import { tags } from '../../db/schema/tags.js';
import { db } from '../../db/db.js';
import { eq } from 'drizzle-orm';

export async function createTag(data: typeof tags.$inferInsert) {
  const [createdTag] = await db.insert(tags).values(data).returning();

  return createdTag;
}

export async function findTagById(tagId: number) {
  return db.query.tags.findFirst({
    where: (tags, { eq }) => eq(tags.id, tagId),
  });
}

export async function findAllTags() {
  return db.query.tags.findMany();
}

export async function findTagByName(tagName: string) {
  return db.query.tags.findFirst({
    where: (tags, { eq }) => eq(tags.name, tagName),
  });
}

export async function updateTagById(
  tagId: number,
  data: typeof tags.$inferInsert,
) {
  const [updatedTag] = await db
    .update(tags)
    .set(data)
    .where(eq(tags.id, tagId))
    .returning();

  return updatedTag;
}

export async function deleteTagById(tagId: number) {
  const [deletedTag] = await db
    .delete(tags)
    .where(eq(tags.id, tagId))
    .returning();

  return deletedTag;
}