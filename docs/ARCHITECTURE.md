# Architecture (deviations from org reference)

Follows the standard **Next.js + NestJS modular monolith** pattern from `init_setup`.

| Area | Choice |
|------|--------|
| UI | Next.js App Router, Tailwind CSS v4, solid-color civic palette (no gradient fills) |
| API | NestJS, global prefix `/api/v1`, Swagger at `/api/docs` |
| Domain module | `portfolio` — single read endpoint |
| Database | Health check only (Postgres optional via Docker dev stack); portfolio content is code-backed in `frontend/src/data/portfolio/` |
| Production deploy | **Vercel Services** — root `vercel.json` routes `/` → Next.js, `/api/*` → NestJS; UI also reads `frontend/src/data/portfolio/` without requiring the API |
| Auth | Not required for public portfolio |

**Future:** Move profile to PostgreSQL + admin OIDC if content needs CMS-style updates.
