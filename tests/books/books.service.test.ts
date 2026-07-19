import { describe, it, expect, vi } from 'vitest';

vi.mock('../../src/features/books/books.repository.js', () => ({
  findBookByTitle: vi.fn(),
  createBook: vi.fn(),
  createBookTags: vi.fn(),
  findBookById: vi.fn(),
  getAllBooks: vi.fn(),
  getMyBooks: vi.fn(),
  updateBookById: vi.fn(),
  deleteBookTags: vi.fn(),
}));

import * as booksRepository from '../../src/features/books/books.repository.js';
import { createBook } from '../../src/features/books/books.service.js';

describe('createBook', () => {
  it('should throw if book title already exists', async () => {
 vi.mocked(booksRepository.findBookByTitle).mockResolvedValue({
  id: 1,
  title: 'The Hobbit',
  description: 'Fantasy',
  price: 100,
  thumbnail: 'https://example.com/book.jpg',
  userId: 1,
  authorId: 1,
  categoryId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
});

// const fakeBook = () =>({})
    await expect(
      createBook(1, {
        title: 'The Hobbit',
        description: 'Fantasy',
        price: 100,
        thumbnail: 'https://example.com/book.jpg',
        authorId: 1,
        categoryId: 1,
        tagIds: [],
      }),
    ).rejects.toThrow('Book already exists');
  });
});