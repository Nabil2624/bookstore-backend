import type { Context } from 'hono';

import {
  createTag,
  deleteTagById,
  getAllTags,
  getTagById,
  updateTagById,
} from './tags.service.js';

export async function createTagController(c: Context) {
  const data = await c.req.json();

  const result = await createTag(data);

  return c.json(result, 201);
}

export async function getTagByIdController(c: Context) {
  const tagId = Number(c.req.param('id'));

  const result = await getTagById(tagId);

  return c.json(result, 200);
}

export async function getAllTagsController(c: Context) {
  const result = await getAllTags();

  return c.json(result, 200);
}

export async function updateTagByIdController(c: Context) {
  const tagId = Number(c.req.param('id'));
  const data = await c.req.json();

  const result = await updateTagById(tagId, data);

  return c.json(result, 200);
}

export async function deleteTagByIdController(c: Context) {
  const tagId = Number(c.req.param('id'));

  const result = await deleteTagById(tagId);

  return c.json(result, 200);
}