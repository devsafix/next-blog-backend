# Modern Blog Backend API

A robust, high-performance **RESTful API** for a modern blogging platform. Built with **TypeScript**, **Express.js**, **Prisma**, and **PostgreSQL**, designed to support a Next.js 16 frontend.

This backend features secure authentication using HttpOnly cookies, role-based access control, advanced content management, and is fully containerized with **Docker** for easy deployment.

---

## Tech Stack

- **Core:** Node.js, Express.js, TypeScript
- **Database & ORM:** PostgreSQL, Prisma
- **Validation:** Zod
- **Authentication:** JSON Web Tokens (JWT), Bcrypt, HttpOnly Cookies
- **Containerization:** Docker (Multi-stage build)

---

## Features

### **Authentication & Security**

- **Secure Login/Register:** Password hashing with `bcrypt` and input validation with `Zod`.
- **Session Management:** Uses **HttpOnly, Secure Cookies** for JWT storage (prevents XSS).
- **Role-Based Access Control (RBAC):** Middleware to protect routes for `ADMIN` vs `USER`.

### **Content Management (Blog)**

- **CRUD Operations:** Full management for blog posts.
- **Advanced Querying:** Server-side **Pagination**, **Search**, and **Tag Filtering**.
- **Sorting:** Flexible sorting options (Newest, Oldest, Popularity).
- **Stats:** Aggregated data for the Admin Dashboard (Total views, post counts, etc.).

### **Engagement**

- **Review System:** Users can leave reviews/comments on posts.
- **Relations:** Reviews are linked to Users and Posts via foreign keys.

### **DevOps & Architecture**

- **Modular Structure:** Service-Controller-Route pattern for scalability.
- **Dockerized:** Production-ready `Dockerfile` with multi-stage builds.
- **Auto-Migrations:** Entrypoint script handles DB migrations on container startup.

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL Database (Local or Cloud like Neon/Supabase)
- Docker (Optional, for containerized run)

### 1\. Installation

Clone the repository:

```bash
git clone https://github.com/devsafix/blog-app-backend
cd blog-app-backend
```

Install dependencies:

```bash
npm install
```

### 2\. Environment Setup

**Required Variables:**

```env
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# Security
JWT_SECRET="your-super-secret-key-change-this"
```

### 3\. Database Setup

Run Prisma migrations to create tables in your PostgreSQL database:

```bash
npx prisma migrate dev --name init
```

### 4\. Running the Server

**Development Mode:**

```bash
npm run dev
# Server runs on http://localhost:5000
```

**Production Build:**

```bash
npm run build
npm start
```

---

## Docker Deployment

This project includes a production-optimized `Dockerfile`.

**1. Build the Image:**

```bash
docker build -t blog-backend .
```

**2. Run the Container:**

```bash
docker run -d -p 5000:5000 \
  --name blog-api \
  -e DATABASE_URL="your_production_db_url" \
  -e JWT_SECRET="your_production_secret" \
  blog-backend
```

---

## Folder Structure

```
src/
│── config/             # Database connection & env config
│── middleware/         # Auth checks, RBAC, Error handling, Validation
│── modules/            # Feature-based modules
│   ├── auth/           # Login, Register, Google Auth
│   ├── user/           # User profile management
│   ├── post/           # Blog CRUD, Stats, Search
│   └── review/         # Commenting system
│── utils/              # Helper functions (Cookie setters, etc.)
│── app.ts              # Express App setup (Middlewares, CORS)
│── server.ts           # Entry point
```

---

## API Endpoints Overview

**Auth**

- `POST /api/v1/auth/register` - Create account
- `POST /api/v1/auth/login` - Login (Set Cookie)
- `POST /api/v1/auth/logout` - Logout (Clear Cookie)

**Users**

- `GET /api/v1/user/profile` - Get current user info
- `PATCH /api/v1/user/:id` - Update profile

**Posts**

- `GET /api/v1/post` - Get all posts (Pagination + Search + Filter)
- `GET /api/v1/post/:id` - Get single post details
- `POST /api/v1/post` - Create post (Admin only)
- `PATCH /api/v1/post/:id` - Update post (Admin only)
- `DELETE /api/v1/post/:id` - Delete post (Admin only)
- `GET /api/v1/post/stats` - Get dashboard stats

**Reviews**

- `POST /api/v1/review` - Add a review
- `GET /api/v1/review/:postId` - Get reviews for a post

---

## Scripts

```bash
npm run dev      # Start dev server with hot-reload
npm run build    # Compile TypeScript to JavaScript
npm start        # Run the compiled dist/server.js
npm run migrate  # Run Prisma migrations (used in Docker)
```

---

## Learning Objectives Achieved

- Building a **Type-Safe API** with TypeScript.
- Implementing **Secure Authentication** without exposing tokens to the client-side JS.
- Using **Prisma ORM** for complex relations (One-to-Many).
- Writing **Modular Code** separate from the routing logic.
- **Dockerizing** a Node.js application for cloud deployment.
