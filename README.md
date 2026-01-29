# Pastebin App

A simple Pastebin-like application built using **Next.js App Router**, **Prisma**, and **PostgreSQL (Neon)**.

## Features
- Create text pastes
- Optional title
- View tracking
- Optional expiration & max views
- REST API using Next.js route handlers

## Tech Stack
- Next.js 16 (App Router)
- Prisma ORM
- PostgreSQL (Neon)
- TypeScript

## API Endpoints

### Create Paste
POST /api/paste

Request:
```json
{
  "title": "Sample",
  "content": "Hello World",
  "expiresAt": null,
  "maxViews": null
}
