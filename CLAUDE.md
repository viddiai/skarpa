# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev        # Start dev server with Vite HMR (port 5000)

# Production build
npm run build      # Build frontend (Vite) + bundle server (esbuild)
npm run start      # Run production server

# Type checking
npm run check      # tsc — no emit, just validates types

# Database
npm run db:push    # Push Drizzle schema changes to PostgreSQL
```

No test framework is configured in this project.

## Architecture

Full-stack TypeScript SPA — React frontend served by an Express backend, with shared schemas across both layers.

### Layer overview

- **`client/src/`** — React 18 app (Vite). Routing via Wouter (not React Router). Server state via TanStack Query. Forms via React Hook Form + Zod.
- **`server/`** — Express API. `index-dev.ts` injects Vite middleware for HMR; `index-prod.ts` serves built static files. `app.ts` wires middleware. `routes.ts` defines all API endpoints.
- **`shared/schema.ts`** — Single source of truth: Drizzle table definitions + Zod insert schemas. Both server validation and client form types derive from here.
- **`api/index.ts`** — Vercel serverless entry point that re-exports the Express app.

### Storage abstraction

`server/storage.ts` exports an `IStorage` interface with two implementations:
- `MemStorage` — in-memory Maps, used automatically in development (no `DATABASE_URL` needed).
- `DatabaseStorage` — Drizzle ORM over Neon PostgreSQL, activated when `DATABASE_URL` is set.

The active instance is selected at startup and injected into routes — no code changes needed to switch.

### Admin panel

Protected by a simple Bearer token (`ADMIN_PASSWORD` env var). No persistent sessions — every request validates the token. Admin routes are at `/admin` and `/admin-login`; the analytics dashboard reads from dedicated DB tables (`page_views`, `outreach_metrics`).

### Deployment targets

- **Replit** — dev and prod configs in `.replit`.
- **Vercel** — `scripts/build-vercel.mjs` produces the `.vercel/output/` directory using Build Output API v3. This is a custom script, not a standard Vercel framework preset.

## Key conventions

- **Path aliases**: `@/*` → `client/src/*`, `@shared/*` → `shared/*`
- **UI components**: shadcn/ui (new-york style) in `client/src/components/ui/` — prefer editing existing components over adding new ones.
- **Design tokens**: HSL CSS variables in `client/src/index.css`; never hardcode colors — use `hsl(var(--...))`.
- **Language**: Site content is in Swedish (B2B M&A advisory, 25–300 MSEK deal size).
- **Tracking**: Page views use `sendBeacon` (`/api/track`); admin routes are excluded from tracking automatically.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | Production only | Neon PostgreSQL connection string |
| `ADMIN_PASSWORD` | Yes | Admin panel Bearer token |
| `PORT` | No | Defaults to 5000 |
