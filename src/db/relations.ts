import { relations } from 'drizzle-orm';

import { users } from './schema/users.js';
import { books } from './schema/books.js';
import { authors } from './schema/authors.js';
import { categories } from './schema/categories.js';
import { tags } from './schema/tags.js';
import { bookTags } from './schema/bookTags.js';

export const usersRelations = relations(users, ({ many }) => ({
  books: many(books),
}));

export const authorsRelations = relations(authors, ({ many }) => ({
  books: many(books),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  books: many(books),
}));

export const booksRelations = relations(books, ({ one, many }) => ({
  user: one(users, {
    fields: [books.userId],
    references: [users.id],
  }),

  author: one(authors, {
    fields: [books.authorId],
    references: [authors.id],
  }),

  category: one(categories, {
    fields: [books.categoryId],
    references: [categories.id],
  }),

  bookTags: many(bookTags),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  bookTags: many(bookTags),
}));

export const bookTagsRelations = relations(bookTags, ({ one }) => ({
  book: one(books, {
    fields: [bookTags.bookId],
    references: [books.id],
  }),

  tag: one(tags, {
    fields: [bookTags.tagId],
    references: [tags.id],
  }),
}));