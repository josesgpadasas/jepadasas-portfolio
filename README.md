# Personal portfolio (Next.js + NestJS)

Monorepo aligned with [`init_setup` reference architecture](M:\sys_dev\personal\init_setup\docs\REFERENCE-ARCHITECTURE.md): **Next.js** UI on port **3001**, **NestJS** API on port **3000** with OpenAPI at `/api/docs`.

| App | URL |
|-----|-----|
| Site | http://localhost:3001 |
| API | http://localhost:3000/api/v1 |
| Portfolio JSON | http://localhost:3000/api/v1/portfolio |

## Run locally

```powershell
cd M:\sys_dev\personal\portfolio\backend
copy .env.example .env
npm install
npm run start:dev

cd M:\sys_dev\personal\portfolio\frontend
copy .env.example .env.local
npm install
npm run dev
```

Or use `scripts\start-dev.ps1` (starts both apps).

## Content

Edit **`backend/src/modules/portfolio/portfolio.data.ts`** to match your personal data sheet. Empty, `N/A`, and “not applicable” strings are stripped automatically via `portfolio.util.ts`.

Portrait: `frontend/public/profile.jpg`.

## Docs

- [`docs/SYSTEM.md`](docs/SYSTEM.md)
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/ENVIRONMENT.md`](docs/ENVIRONMENT.md)
- [`docs/CHANGELOG.md`](docs/CHANGELOG.md)
