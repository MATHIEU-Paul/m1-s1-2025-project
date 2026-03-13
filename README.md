# Babel's Library - Final Web Development Project

Full-stack library management application built for the M1 2026 Web Application Development course.

## Overview

Babel's Library is a modular web app to manage:

- clients
- books
- authors
- purchases/sales history

It includes authentication, image handling, list querying (sorting/order/pagination), breadcrumb navigation, and a dashboard with sales metrics.

## Tech Stack

### Frontend

- TypeScript
- React 18
- Vite
- Ant Design
- @tanstack/react-router
- Axios

### Backend

- TypeScript
- NestJS
- TypeORM
- SQLite
- REST API

## Monorepo Structure

```text
.
|- nest-api/    # NestJS + TypeORM REST API
|- react-app/   # React + Vite frontend
`- README.md
```

## Main Features

- Authentication: register, login, current user, logout
- Clients CRUD with list and detail pages
- Books CRUD with genres/types support
- Authors CRUD with author-related sales insights
- Purchases management linked to books and clients
- Home dashboard with KPIs and latest sales
- Image serving endpoint for books/authors/clients
- Reusable queryable lists (sorting, order, pagination)
- Dark/light mode with persisted preference
- Dynamic page titles and custom branding

## Quick Start

Open two terminals from the repository root.

### 1) Start the API (NestJS)

```bash
cd nest-api
npm install
npm run start:dev
```

API base URL: <http://localhost:3000>

### 2) Start the frontend (React)

```bash
cd react-app
npm install
npm run dev
```

Vite will print the frontend URL (usually <http://localhost:5173>).

## Environment and Runtime Notes

- Frontend API base URL is currently defined in `react-app/src/config/api.ts` as `http://localhost:3000`.
- Backend port defaults to `3000` and can be overridden via `PORT`.
- Request body size limit defaults to `5mb` and can be overridden via `BODY_SIZE_LIMIT`.
- SQLite database is stored in `nest-api/db` (single file).
- Uploaded/static images are served from `nest-api/images/{books|authors|clients}`.

## API Domains (High Level)

- `/auth` -> register, login, current user, logout
- `/authors` -> authors CRUD and list querying
- `/books` -> books CRUD + `/books/types` + `/books/genres`
- `/clients` -> clients CRUD and list querying
- `/purchases` -> sales creation, by-client/by-book history, home summary
- `/images/:folder/:filename` -> static image delivery

## Project Team

- Paul CAUCHE
- Leo COPPIN
- Adrien DELERUE
- Paul MATHIEU

## Academic Context

This project was developed as part of the M1 2026 final assignment and aims to demonstrate clean architecture, modularity, and full-stack integration using modern TypeScript tooling.
