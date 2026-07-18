import { Hono } from 'hono';

import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryByIdController,
  deleteCategoryByIdController,
} from './categories.controller.js';

import { validate } from '../../middlewares/validate.js';
import { categorySchema } from './categories.validation.js';

const categoriesRouter = new Hono();

categoriesRouter.get('/', getAllCategoriesController);
categoriesRouter.get('/:id', getCategoryByIdController);

categoriesRouter.post(
  '/',
  validate(categorySchema),
  createCategoryController,
);

categoriesRouter.put(
  '/:id',
  validate(categorySchema),
  updateCategoryByIdController,
);

categoriesRouter.delete('/:id', deleteCategoryByIdController);

export default categoriesRouter;