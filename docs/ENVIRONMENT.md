# Environment

## Backend (`backend/.env`)

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `3000` | API listen port |
| `CORS_ORIGINS` | `http://localhost:3001` | Browser origin for UI |
| `DATABASE_URL` | (see `.env.example`) | Optional; used by health check |

## Frontend (`frontend/.env.local`)

No env vars are required for production on **Vercel**. The site reads profile data from `frontend/src/data/portfolio/` (and exposes the same JSON at `/api/v1/portfolio`).

Optional (local full stack only): set `NEXT_PUBLIC_API_BASE_URL` if you add client-side calls to an external Nest API.

## Deploy on Vercel (Services — frontend + backend)

This repo includes a root [`vercel.json`](../vercel.json) for [Vercel Services](https://vercel.com/docs/services): Next.js (`frontend/`) and NestJS (`backend/`).

1. Import [jepadasas-portfolio](https://github.com/josesgpadasas/jepadasas-portfolio) on Vercel.
2. Leave the **repository root** as the project root (do not set Root Directory to `frontend` only).
3. In **Build & Deployment → Framework Preset**, choose **Services** (required when `services` is in `vercel.json`).
4. Deploy — no env vars required for the portfolio page (content is bundled in the Next.js app).

**Routing**

| Path | Service |
|------|---------|
| `/` (site UI) | `frontend` |
| `/api/*` (e.g. `/api/v1/portfolio`, `/api/docs`) | `backend` |

Optional on the backend service: `CORS_ORIGINS` = your production site URL if you call the API from the browser.

### Frontend-only (legacy)

You can still deploy only `frontend/` as a single Next.js project; profile data lives in `frontend/src/data/portfolio/`.

## Optional infra

Shared Docker stack: `M:\sys_dev\personal\init_setup\templates\docker-compose.dev.yml`
