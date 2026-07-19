# Bookstore Backend API

A RESTful backend API for a Bookstore application built with **Node.js**, **TypeScript**, **Hono**, **PostgreSQL**, **Drizzle ORM**, and **Redis (Memurai)**.

The project provides authentication, user management, and complete CRUD operations for books, authors, categories, and tags. It also supports searching, filtering, sorting, pagination, and ownership-based authorization.

---

# Features

## Authentication

* User registration
* User login
* JWT authentication
* Forgot password
* Reset password
* Change password
* User profile
* Logout
* Redis-based token storage
* Protected routes

## Authors

* Create author
* Get all authors
* Get author by ID
* Update author
* Delete author

## Categories

* Create category
* Get all categories
* Get category by ID
* Update category
* Delete category

## Tags

* Create tag
* Get all tags
* Get tag by ID
* Update tag
* Delete tag

## Books

* Create book
* Get all books
* Get book by ID
* Update book
* Delete book
* Get books created by the authenticated user

## Book Features

* Pagination
* Search by title
* Sorting
* Price filtering
* Category filtering
* Author relationship
* Category relationship
* Tag relationship

## Authorization

Authenticated users can:

* Create books
* Update only their own books
* Delete only their own books

---

# Tech Stack

* Node.js
* TypeScript
* Hono
* PostgreSQL
* Drizzle ORM
* Redis / Memurai
* JWT
* Zod
* Bcrypt
* Vitest
* ESLint
* Prettier

---

# Project Structure

```text
src
├── config
├── db
│   └── schema
├── features
│   ├── auth
│   ├── authors
│   ├── books
│   ├── categories
│   ├── tags
│   └── users
├── middlewares
├── routes
├── shared
├── types
├── utils
├── app.ts
└── index.ts
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/Nabil2624/bookstore-backend.git
```

Move into the project directory

```bash
cd bookstore-backend
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root.

```env
PORT=3000

DATABASE_URL=

REDIS_URL=

JWT_SECRET=
```

---

# Database

Generate migrations

```bash
npm run db:generate
```

Run migrations

```bash
npm run db:migrate
```

Open Drizzle Studio

```bash
npm run db:studio
```

---

# Redis

This project uses Redis for JWT token storage.

On Windows, Memurai can be used as a Redis-compatible server.

Start Memurai before running the application.

---

# Running the Project

Development

```bash
npm run dev
```

Build

```bash
npm run build
```

---

# Testing

Run tests

```bash
npm test
```

Watch mode

```bash
npm run test:watch
```

---

# Code Quality

Lint

```bash
npm run lint
```

Automatically fix lint issues

```bash
npm run lint:fix
```

Format code

```bash
npm run format
```

Check formatting

```bash
npm run format:check
```

---

# Authentication

Authentication uses JSON Web Tokens (JWT).

After a successful login:

1. A JWT is generated.
2. The token is stored in Redis (Memurai).
3. The client receives the JWT.
4. Protected endpoints require:

```
Authorization: Bearer <token>
```

The authentication middleware verifies:

* JWT signature
* JWT expiration
* Token existence inside Redis

When the user logs out, the token is deleted from Redis, making it immediately invalid.

---

# API Modules

| Module         | Description                                               |
| -------------- | --------------------------------------------------------- |
| Authentication | Registration, login, logout, profile, password management |
| Authors        | CRUD operations                                           |
| Categories     | CRUD operations                                           |
| Tags           | CRUD operations                                           |
| Books          | CRUD operations with filtering and ownership              |

---

# Book Query Parameters

The Books API supports the following query parameters:

| Parameter  | Description              |
| ---------- | ------------------------ |
| page       | Page number              |
| limit      | Number of items per page |
| search     | Search by title          |
| sort       | asc or desc              |
| categoryId | Filter by category       |
| minPrice   | Minimum price            |
| maxPrice   | Maximum price            |

Example

```
GET /api/books?page=1&limit=10&search=Harry&sort=asc&minPrice=100&maxPrice=500
```

---

# Postman Collection

A Postman collection is included in the project.

Import:

```
Postman/Bookstore API.postman_collection.json
```

Collection variables included:

* baseUrl
* token

---

# Future Improvements

Possible future enhancements include:

* Email service for password reset OTP
* Refresh tokens
* Role-based authorization (Admin/User)
* Book image uploads
* Rate limiting
* API documentation with Swagger/OpenAPI
* Docker support
* CI/CD pipeline

---

# License

This project is licensed under the ISC License.
