
import { db } from '../../db/db.js';
import {categories} from '../../db/schema/categories.js'
import { eq } from 'drizzle-orm';

export async function findCategoryById(categoryId: number) {
  return db.query.categories.findFirst({
    where: (categories, { eq }) => eq(categories.id, categoryId),
  });
}



export async function createCategory(data: typeof categories.$inferInsert ){
    const [createdCategory] = await db.insert(categories).values(data).returning();

    return createdCategory;
}


export async function findCategoryByName(name: string) {
  return db.query.categories.findFirst({
    where: (categories, { eq }) => eq(categories.name, name),
  });
}



export async function getAllCategories(){
    return db.query.categories.findMany();
}



export async function updateCategoryById(
  categoryId: number,
  data: typeof categories.$inferInsert,
) {
  const [updatedCategory] = await db
    .update(categories)
    .set(data)
    .where(eq(categories.id, categoryId))
    .returning();

  return updatedCategory;
}


export async function deleteCategoryById(categoryId: number) {
  const [deletedCategory] = await db
    .delete(categories)
    .where(eq(categories.id, categoryId))
    .returning();

  return deletedCategory;
}