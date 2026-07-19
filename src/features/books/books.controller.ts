import type { Context } from 'hono';

import { createBook, getAllBooks, getBookById, getMyBooks,updateBookById,deleteBookById } from './books.service.js';
import { bookQuerySchema } from './books.query.validation.js';


export async function createBookController(c: Context) {
  const user = c.get('user');

  const data = await c.req.json();

  const result = await createBook(user.userId, data);

  return c.json(result, 201);
}


export async function getAllBooksController(c: Context) {
const query = bookQuerySchema.parse(c.req.query());

const result = await getAllBooks(query);

  return c.json(result, 200);
}


export async function getBookByIdController(c: Context) {
    const bookId  = Number(c.req.param('id'));
    const result = await getBookById(bookId)
    return c.json(result, 200)

}


export async function getMyBooksController(c: Context) {
  const user = c.get('user');

  const query = bookQuerySchema.parse(c.req.query());

  const result = await getMyBooks(
    user.userId,
    query,
  );

  return c.json(result, 200);
}


export async function updateBookByIdController(c: Context) {
  const user = c.get('user');

  const bookId = Number(c.req.param('id'));

  const data = await c.req.json();

  const result = await updateBookById(
    user.userId,
    bookId,
    data,
  );

  return c.json(result, 200);
}

export async function deleteBookByIdController(c: Context) {
  const user = c.get('user');

  const bookId = Number(c.req.param('id'));

  const result = await deleteBookById(
    user.userId,
    bookId,
  );

  return c.json(result, 200);
}