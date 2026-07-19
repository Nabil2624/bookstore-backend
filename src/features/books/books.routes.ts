import { Hono } from 'hono';

import { auth } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';

import { bookQuerySchema, bookSchema } from './books.query.validation.js';

import { createBookController, getAllBooksController, getBookByIdController, getMyBooksController, updateBookByIdController, deleteBookByIdController } from './books.controller.js';


const booksRouter = new Hono();

booksRouter.post(
  '/',
  auth,
  validate(bookSchema),
  createBookController,
);

booksRouter.get(
  '/',
  validate(bookQuerySchema, 'query'),
  getAllBooksController,
);

booksRouter.get(
  '/my',
  auth,
  validate(bookQuerySchema, 'query'),
  getMyBooksController,
);

booksRouter.put(
  '/:id',
  auth,
  validate(bookSchema),
  updateBookByIdController,
);

booksRouter.delete(
  '/:id',
  auth,
  deleteBookByIdController,
);


booksRouter.get('/:id', getBookByIdController);



export default booksRouter;