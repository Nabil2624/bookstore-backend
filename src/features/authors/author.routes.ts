import { Hono } from 'hono';

import {
  getAllAuthorsController,
  getAuthorByIdController,
  createAuthorController,
  updateAuthorController,
  deleteAuthorController,
} from './author.controller.js';

import { validate } from '../../middlewares/validate.js';
import {auth} from '../../middlewares/auth.js'
import { authorSchema } from './author.validation.js';

const authorRouter = new Hono();

authorRouter.get('/', getAllAuthorsController);
authorRouter.get('/:id', getAuthorByIdController);

authorRouter.post(
  '/',
  auth,
  validate(authorSchema),
  createAuthorController,
);

authorRouter.put(
  '/:id',
  auth,
  validate(authorSchema),
  updateAuthorController,
);

authorRouter.delete('/:id',auth, deleteAuthorController);

export default authorRouter;