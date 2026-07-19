import { db } from '../../db/db.js';
import {books} from '../../db/schema/books.js';
import { bookTags } from '../../db/schema/bookTags.js';
import {
  and,
  asc,
  count,
  desc,
  eq,
  gte,
  ilike,
  lte,
} from 'drizzle-orm';
import type { BookQueryData } from './books.query.validation.js';




export async function findBookById(bookId: number) {
  return db.query.books.findFirst({
    where: (books, { eq }) => eq(books.id, bookId),

    with: {
      author: true,
      category: true,
      bookTags: {
        with: {
          tag: true,
        },
      },
    },
  });
}


export async function findBookByTitle(title: string) {
  return db.query.books.findFirst({
    where: (books, { eq }) => eq(books.title, title),
  });
}

export async function createBook(data: typeof books.$inferInsert) {
  const [createdBook] = await db
    .insert(books)
    .values(data)
    .returning();

  return createdBook;
}



export async function updateBookById(
  bookId: number,
  data: Partial<typeof books.$inferInsert>,
) {
  const [updatedBook] = await db
    .update(books)
    .set(data)
    .where(eq(books.id, bookId))
    .returning();

  return updatedBook;
}



export async function deleteBookById(bookId: number) {
  const [deletedBook] = await db
    .delete(books)
    .where(eq(books.id, bookId))
    .returning();

  return deletedBook;
}

export async function createBookTags(
  bookId: number,
  tagIds: number[],
) {
  if (tagIds.length === 0) return;

  await db.insert(bookTags).values(
    tagIds.map((tagId) => ({
      bookId,
      tagId,
    })),
  );
}


export async function deleteBookTags(bookId: number) {
  await db
    .delete(bookTags)
    .where(eq(bookTags.bookId, bookId));
}



export async function getAllBooks(query: BookQueryData){
    const {
  page,
  limit,
  search,
  sort,
  categoryId,
  minPrice,
  maxPrice,
} = query;

const offset = (page - 1) * limit;

const filters = and(
  search ? ilike(books.title, `%${search}%`) : undefined,

  categoryId
    ? eq(books.categoryId, categoryId)
    : undefined,

  minPrice !== undefined
    ? gte(books.price, minPrice)
    : undefined,

  maxPrice !== undefined
    ? lte(books.price, maxPrice)
    : undefined,
);

const data = await db.query.books.findMany({
  where: filters,

  limit,

  offset,

  orderBy:
    sort === 'asc'
      ? asc(books.title)
      : desc(books.title),

  with: {
    author: true,
    category: true,
  },
});

const [{ total }] = await db
  .select({
    total: count(),
  })
  .from(books)
  .where(filters);

  return {
  data,
  total,
};
}



export async function getMyBooks(userId: number, query: BookQueryData){
    const {
  page,
  limit,
  search,
  sort,
  categoryId,
  minPrice,
  maxPrice,
} = query;

const offset = (page - 1) * limit;

const filters = and(
    eq(books.userId, userId),

  search ? ilike(books.title, `%${search}%`) : undefined,

  categoryId
    ? eq(books.categoryId, categoryId)
    : undefined,

  minPrice !== undefined
    ? gte(books.price, minPrice)
    : undefined,

  maxPrice !== undefined
    ? lte(books.price, maxPrice)
    : undefined,
);

const data = await db.query.books.findMany({
  where: filters,

  limit,

  offset,

  orderBy:
    sort === 'asc'
      ? asc(books.title)
      : desc(books.title),

  with: {
    author: true,
    category: true,
  },
});

const [{ total }] = await db
  .select({
    total: count(),
  })
  .from(books)
  .where(filters);

  return {
  data,
  total,
};
}



