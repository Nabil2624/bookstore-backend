import { pgTable, integer, primaryKey } from 'drizzle-orm/pg-core';

import { books } from './books.js';
import { tags } from './tags.js';

export const bookTags = pgTable(
  'book_tags',
  {
    bookId: integer('book_id')
      .notNull()
      .references(() => books.id),

    tagId: integer('tag_id')
      .notNull()
      .references(() => tags.id),
  },
  (table) => [
    primaryKey({
      columns: [table.bookId, table.tagId],
    }),
  ],
);