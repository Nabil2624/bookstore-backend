import { Hono } from 'hono';

import {
  getAllAuthorsController,
  getAuthorByIdController,
  createAuthorController,
  updateAuthorController,
  deleteAuthorController,
} from './author.controller.js';

import { validate } from '../../middlewares/validate.js';
import { authorSchema } from './author.validation.js';

const authorRouter = new Hono();

authorRouter.get('/', getAllAuthorsController);
authorRouter.get('/:id', getAuthorByIdController);

authorRouter.post(
  '/',
  validate(authorSchema),
  createAuthorController,
);

authorRouter.put(
  '/:id',
  validate(authorSchema),
  updateAuthorController,
);

authorRouter.delete('/:id', deleteAuthorController);

export default authorRouter;