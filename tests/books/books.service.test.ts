import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../src/features/books/books.repository.js', () => ({
  findBookByTitle: vi.fn(),
  createBook: vi.fn(),
  createBookTags: vi.fn(),
  findBookById: vi.fn(),
  getAllBooks: vi.fn(),
  getMyBooks: vi.fn(),
  updateBookById: vi.fn(),
  deleteBookById: vi.fn(),
  deleteBookTags: vi.fn(),
}));

vi.mock('../../src/features/authors/author.repository.js', () => ({
  findAuthorById: vi.fn(),
}));

vi.mock('../../src/features/categories/categories.repository.js', () => ({
  findCategoryById: vi.fn(),
}));

vi.mock('../../src/features/tags/tags.repository.js', () => ({
  findTagById: vi.fn(),
}));

import * as booksRepository from '../../src/features/books/books.repository.js';
import * as authorRepository from '../../src/features/authors/author.repository.js';
import * as categoryRepository from '../../src/features/categories/categories.repository.js';
import * as tagRepository from '../../src/features/tags/tags.repository.js';

import { createBook, getBookById } from '../../src/features/books/books.service.js';
// import { findCategoryById } from '../../src/features/categories/categories.repository.js';

const bookData = {
  title: "The Hobbit",
  description: "Fantasy",
  price: 100,
  thumbnail: "https://example.com/book.jpg",
  authorId: 1,
  categoryId: 1,
  tagIds: [],
};

describe('createBook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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


it('should throw if Author does not exist', async ()=> {
     vi.mocked(booksRepository.findBookByTitle)
    .mockResolvedValue(undefined);
    vi.mocked(authorRepository.findAuthorById).mockResolvedValue(undefined);

    await expect(
        createBook(1,bookData)
    ).rejects.toThrow('Author not found')
})



it('should throw if category does not exist', async () => {
  vi.mocked(booksRepository.findBookByTitle).mockResolvedValue(undefined);

  vi.mocked(authorRepository.findAuthorById).mockResolvedValue({
    id: 1,
    name: 'J.K. Rowling',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  vi.mocked(categoryRepository.findCategoryById).mockResolvedValue(undefined);

  await expect(
    createBook(1, bookData)
  ).rejects.toThrow('Category not found');
});

it('should throw id a tag does not not exist ', async ()=> {
  vi.mocked(booksRepository.findBookByTitle).mockResolvedValue(undefined);

  vi.mocked(authorRepository.findAuthorById).mockResolvedValue({
     id: 1,
    name: 'J.K. Rowling',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
vi.mocked(categoryRepository.findCategoryById).mockResolvedValue(undefined);

await expect(
  createBook(1, bookData)
).rejects.toThrow('Category not found')
});


it('should throw if a tag does not exist', async () => {
  vi.mocked(booksRepository.findBookByTitle).mockResolvedValue(undefined);

  vi.mocked(authorRepository.findAuthorById).mockResolvedValue({
    id: 1,
    name: 'Author',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  vi.mocked(categoryRepository.findCategoryById).mockResolvedValue({
    id: 1,
    name: 'Fantasy',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  vi.mocked(tagRepository.findTagById).mockResolvedValue(undefined);

  await expect(
    createBook(1, {
      ...bookData,
      tagIds: [5],
    }),
  ).rejects.toThrow('Tag 5 not found');
});


it('should create a book successfully', async () => {
  vi.mocked(booksRepository.findBookByTitle).mockResolvedValue(undefined);

  vi.mocked(authorRepository.findAuthorById).mockResolvedValue({
    id: 1,
    name: 'Author',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  vi.mocked(categoryRepository.findCategoryById).mockResolvedValue({
    id: 1,
    name: 'Fantasy',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  vi.mocked(booksRepository.createBook).mockResolvedValue({
    id: 10,
    ...bookData,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  vi.mocked(booksRepository.createBookTags).mockResolvedValue(undefined);

  const result = await createBook(1, bookData);

  expect(result.id).toBe(10);

  expect(booksRepository.createBook).toHaveBeenCalledWith({
    title: bookData.title,
    description: bookData.description,
    price: bookData.price,
    thumbnail: bookData.thumbnail,
    authorId: 1,
    categoryId: 1,
    userId: 1,
  });

  expect(booksRepository.createBookTags).toHaveBeenCalledWith(10, []);
});
});


it('should throw if book is not found', async () => {
  vi.mocked(booksRepository.findBookById).mockResolvedValue(undefined);

  await expect(getBookById(1)).rejects.toThrow('Book not found');
});

it('should return the book', async () => {
  const book = {
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
  author: {
    id: 1,
    name: 'J.K. Rowling',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  category: {
    id: 1,
    name: 'Fantasy',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  bookTags: [],
};

  vi.mocked(booksRepository.findBookById).mockResolvedValue(book);

  const result = await getBookById(1);

  expect(result).toEqual(book);
});