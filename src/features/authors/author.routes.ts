import { Hono } from 'hono';

import {
  getAllAuthorsController,
  getAuthorByIdController,
  createAuthorController,
  updateAuthorController,
  deleteAuthorController,
} from './author.controller.js';

const authorRouter = new Hono();

authorRouter.get('/', getAllAuthorsController);
authorRouter.get('/:id', getAuthorByIdController);
authorRouter.post('/', createAuthorController);
authorRouter.put('/:id', updateAuthorController);
authorRouter.delete('/:id', deleteAuthorController);

export default authorRouter;