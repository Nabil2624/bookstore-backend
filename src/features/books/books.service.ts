import { AppError } from '../../utils/AppError.js';

import {
  createBook as createBookRepository,
  createBookTags,
  deleteBookTags,
  findBookById,
  findBookByTitle,
  getAllBooks as getAllBooksRepository,
  getMyBooks as getMyBooksRepository,
  updateBookById as updateBookByIdRepository,
  deleteBookById as deleteBookByIdRepository
} from './books.repository.js';

import { findAuthorById } from '../authors/author.repository.js';
import { findCategoryById } from '../categories/categories.repository.js';
import { findTagById } from '../tags/tags.repository.js';

import type { BookQueryData, CreateBookData, UpdateBookData } from './books.query.validation.js';


export async function createBook(
  userId: number,
  data: CreateBookData,
) {

    const existingBook = await findBookByTitle(data.title);

if (existingBook) {
  throw new AppError('Book already exists', 409);
}

const author = await findAuthorById(data.authorId);

if (!author) {
  throw new AppError('Author not found', 404);
}

const category = await findCategoryById(data.categoryId);

if (!category) {
  throw new AppError('Category not found', 404);
}

for (const tagId of data.tagIds) {
  const tag = await findTagById(tagId);

  if (!tag) {
    throw new AppError(`Tag ${tagId} not found`, 404);
  }
}

const { tagIds, ...bookData } = data;

const createdBook = await createBookRepository({
  ...bookData,
  userId,
});

await createBookTags(createdBook.id, tagIds);

return createdBook;

}

export async function getAllBooks(query: BookQueryData) {
  return getAllBooksRepository(query);
}



export async function getBookById(bookId: number) {
  const book = await findBookById(bookId);

  if (!book) {
    throw new AppError('Book not found', 404);
  }

  return book;
}


export async function getMyBooks(
  userId: number,
  query: BookQueryData,
) {
  return getMyBooksRepository(userId, query);
}

export async function updateBookById(
  userId: number,
  bookId: number,
  data: UpdateBookData,
) {
  const book = await findBookById(bookId);

  if (!book) {
    throw new AppError('Book not found', 404);
  }

  if (book.userId !== userId) {
    throw new AppError('Forbidden', 403);
  }

  const existingBook = await findBookByTitle(data.title);

  if (existingBook && existingBook.id !== bookId) {
    throw new AppError('Book already exists', 409);
  }

  const author = await findAuthorById(data.authorId);

  if (!author) {
    throw new AppError('Author not found', 404);
  }

  const category = await findCategoryById(data.categoryId);

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  for (const tagId of data.tagIds) {
    const tag = await findTagById(tagId);

    if (!tag) {
      throw new AppError(`Tag ${tagId} not found`, 404);
    }
  }

  const { tagIds, ...bookData } = data;

  const updatedBook = await updateBookByIdRepository(
    bookId,
    bookData,
  );

  await deleteBookTags(bookId);

  await createBookTags(bookId, tagIds);

  return updatedBook;
}


export async function deleteBookById(
  userId: number,
  bookId: number,
) {
  const book = await findBookById(bookId);

  if (!book) {
    throw new AppError('Book not found', 404);
  }

  if (book.userId !== userId) {
    throw new AppError('Forbidden', 403);
  }

  await deleteBookTags(bookId);

  return deleteBookByIdRepository(bookId);
}