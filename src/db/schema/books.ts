import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

import { users } from './users.js';
import { authors } from './authors.js';
import { categories } from './categories.js';

export const books = pgTable('books', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  price: integer('price').notNull(),
  thumbnail: text('thumbnail').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  authorId: integer('author_id')
    .notNull()
    .references(() => authors.id),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id),
});
