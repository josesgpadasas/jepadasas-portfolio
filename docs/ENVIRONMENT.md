# Environment

## Backend (`backend/.env`)

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `3000` | API listen port |
| `CORS_ORIGINS` | `http://localhost:3001` | Browser origin for UI |
| `DATABASE_URL` | (see `.env.example`) | Optional; used by health check |

## Frontend (`frontend/.env.local`)

| Variable | Default | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:3000/api/v1` | Portfolio fetch base |

## Optional infra

Shared Docker stack: `M:\sys_dev\personal\init_setup\templates\docker-compose.dev.yml`
