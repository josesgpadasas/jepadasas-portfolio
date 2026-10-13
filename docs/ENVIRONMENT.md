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

## Deploy on Vercel

1. Import the GitHub repo.
2. Set **Root Directory** to `frontend`.
3. Deploy — no environment variables required for the portfolio page.

## Optional infra

Shared Docker stack: `M:\sys_dev\personal\init_setup\templates\docker-compose.dev.yml`
