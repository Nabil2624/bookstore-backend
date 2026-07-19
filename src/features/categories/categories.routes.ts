import { Hono } from 'hono';

import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryByIdController,
  deleteCategoryByIdController,
} from './categories.controller.js';

import { validate } from '../../middlewares/validate.js';
import {auth} from '../../middlewares/auth.js'
import { categorySchema } from './categories.validation.js';

const categoriesRouter = new Hono();

categoriesRouter.get('/', getAllCategoriesController);
categoriesRouter.get('/:id', getCategoryByIdController);

categoriesRouter.post(
  '/',
  auth,
  validate(categorySchema),
  createCategoryController,
);

categoriesRouter.put(
  '/:id',
  auth,
  validate(categorySchema),
  updateCategoryByIdController,
);

categoriesRouter.delete('/:id',auth, deleteCategoryByIdController);

export default categoriesRouter;