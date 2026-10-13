# Personal portfolio (Next.js + NestJS)

Monorepo aligned with [`init_setup` reference architecture](M:\sys_dev\personal\init_setup\docs\REFERENCE-ARCHITECTURE.md): **Next.js** UI on port **3001**, **NestJS** API on port **3000** with OpenAPI at `/api/docs`.

| App | URL |
|-----|-----|
| Site | http://localhost:3001 |
| API | http://localhost:3000/api/v1 |
| Portfolio JSON (Next.js) | http://localhost:3001/api/v1/portfolio |
| Portfolio JSON (Nest, optional) | http://localhost:3000/api/v1/portfolio |

## Run locally

```powershell
cd M:\sys_dev\personal\portfolio\backend
copy .env.example .env
npm install
npm run start:dev

cd M:\sys_dev\personal\portfolio\frontend
npm install
npm run dev
```

Or use `scripts\start-dev.ps1` (starts both apps).

## Content

Edit **`frontend/src/data/portfolio/profile.ts`** and **`projects.ts`** (source of truth for the live site). When using the optional Nest API locally, keep **`backend/src/modules/portfolio/`** in sync. Empty, `N/A`, and “not applicable” strings are stripped via `util.ts`.

## Deploy (Vercel)

Use the repo root with **[Vercel Services](https://vercel.com/docs/services)** (`vercel.json`): Next.js + NestJS on one domain. Set the project **Framework Preset** to **Services**. Details in [`docs/ENVIRONMENT.md`](docs/ENVIRONMENT.md).

Portrait: `frontend/public/profile.jpg`.

## Docs

- [`docs/SYSTEM.md`](docs/SYSTEM.md)
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/ENVIRONMENT.md`](docs/ENVIRONMENT.md)
- [`docs/CHANGELOG.md`](docs/CHANGELOG.md)
