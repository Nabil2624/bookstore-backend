import type { Context } from 'hono';
import {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategoryById,
  deleteCategoryById,
} from './categories.service.js';

export async function createCategoryController(c: Context) {
  const data = await c.req.json();

  const result = await createCategory(data);

  return c.json(result, 201);
}

export async function getCategoryByIdController(c: Context) {
  const categoryId = Number(c.req.param('id'));

  const result = await getCategoryById(categoryId);

  return c.json(result, 200);
}

export async function getAllCategoriesController(c: Context) {
  const result = await getAllCategories();

  return c.json(result, 200);
}

export async function updateCategoryByIdController(c: Context) {
  const categoryId = Number(c.req.param('id'));
  const data = await c.req.json();

  const result = await updateCategoryById(categoryId, data);

  return c.json(result, 200);
}

export async function deleteCategoryByIdController(c: Context) {
  const categoryId = Number(c.req.param('id'));

  const result = await deleteCategoryById(categoryId);

  return c.json(result, 200);
}
