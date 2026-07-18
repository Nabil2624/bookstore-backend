import { AppError } from '../../utils/AppError.js';
import {
  createTag as createTagRepository,
  deleteTagById as deleteTagByIdRepository,
  findAllTags,
  findTagById,
  findTagByName,
  updateTagById as updateTagByIdRepository,
} from './tags.repository.js';
import {
  CreateTagData,
  UpdateTagData,
} from './tags.validation.js';

export async function createTag(data: CreateTagData) {
  const existingTagName = await findTagByName(data.name);

  if (existingTagName) {
    throw new AppError('Tag already exists', 409);
  }

  return createTagRepository(data);
}

export async function getTagById(tagId: number) {
  const tag = await findTagById(tagId);

  if (!tag) {
    throw new AppError('Tag not found', 404);
  }

  return tag;
}

export async function getTagByName(name: string) {
  const tag = await findTagByName(name);

  if (!tag) {
    throw new AppError('Tag not found', 404);
  }

  return tag;
}

export async function getAllTags() {
  return findAllTags();
}

export async function updateTagById(
  tagId: number,
  data: UpdateTagData,
) {
  const existingTag = await findTagById(tagId);

  if (!existingTag) {
    throw new AppError('Tag not found', 404);
  }

  const existingTagName = await findTagByName(data.name);

  if (
    existingTagName &&
    existingTagName.id !== tagId
  ) {
    throw new AppError('Tag already exists', 409);
  }

  return updateTagByIdRepository(tagId, data);
}

export async function deleteTagById(tagId: number) {
  const tag = await findTagById(tagId);

  if (!tag) {
    throw new AppError('Tag not found', 404);
  }

  await deleteTagByIdRepository(tagId);

  return {
    message: 'Tag deleted successfully',
  };
}