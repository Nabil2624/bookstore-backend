import type { Context } from 'hono';
import { createAuthor, deleteAuthor, getAllAuthors, getAuthorById, updateAuthor } from './author.service.js';


export async function getAllAuthorsController(c: Context) {
  const result = await getAllAuthors();

  return c.json(result, 200);
}


export async function createAuthorController(c: Context){
    const data = await c.req.json();

const result = await createAuthor(data);

return c.json(result, 201);
}


export async function getAuthorByIdController(c: Context) {
  const authorId = Number(c.req.param('id'));

  const result = await getAuthorById(authorId);

  return c.json(result, 200);
}


export async function updateAuthorController(c: Context) {
 const authorId = Number(c.req.param('id'));
    const data = await c.req.json();

    const result = await updateAuthor(authorId, data);

    return c.json(result, 200);
}


export async function deleteAuthorController(c: Context) {
    const authorId  = Number(c.req.param('id'));

    const result = await deleteAuthor(authorId);

    return c.json(result, 200)
}