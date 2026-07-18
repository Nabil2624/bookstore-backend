import { Hono } from 'hono';

import { auth } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';

import {
  createTagController,
  getAllTagsController,
  getTagByIdController,
  updateTagByIdController,
  deleteTagByIdController,
} from './tags.controller.js';

import { tagSchema } from './tags.validation.js';

const tagsRouter = new Hono();

tagsRouter.get('/', getAllTagsController);
tagsRouter.get('/:id', getTagByIdController);

tagsRouter.post(
  '/',
  auth,
  validate(tagSchema),
  createTagController,
);

tagsRouter.put(
  '/:id',
  auth,
  validate(tagSchema),
  updateTagByIdController,
);

tagsRouter.delete(
  '/:id',
  auth,
  deleteTagByIdController,
);

export default tagsRouter;