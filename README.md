# Building a Blog App to Practice Prisma ORM

A simple **Blog Application** built with **TypeScript, Express.js, Prisma, PostgreSQL**.

---

## Features

- User Management
- Blog Post Management
- Blog Stats Using Prisma Aggregate
- Modular project structure
- Ready to extend with blog modules

---

## Installation

Clone the repository:

```bash
git clone https://github.com/devsafix/next-blog-prisma-api
cd prisma-blog-app
```

Install dependencies:

```bash
# using npm
npm install

# using yarn
yarn install

# using pnpm
pnpm install
```

Setup environment variables:

```bash
cp .env.example .env
```

Run the development server:

```bash
# using npm
npm run dev

# using yarn
yarn dev

# using pnpm
pnpm dev
```

---

## Folder Structure

```
Prisma-Blog/
│── node_modules/          # Dependencies
│── src/
│   ├── app.ts             # Express app configuration
│   ├── server.ts          # Server entry point
│   ├── config/            # Environment & configuration files
│   └── modules/           # Application modules (posts, users, etc.)
│── package.json           # Project metadata & scripts
│── package-lock.json         # Lockfile (npm)
│── tsconfig.json          # TypeScript configuration
│── README.md              # Documentation
```

---

## Scripts

```bash
# Run in development mode
npm dev

# Build for production
npm build

# Run production build
npm start
```

---

## Learning Objective

- Connect a Node.js app with Prisma ORM
- Build modular APIs
- Manage environment variables
- Structure scalable backend projects
