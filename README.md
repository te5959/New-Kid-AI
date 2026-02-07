# BrightByte AI

A child-friendly AI learning platform for ages 8–14, with parent controls, safe experiments, and age-adaptive lessons.

## Architecture
See [docs/architecture.md](docs/architecture.md) for the full system diagram and flow.

## Local setup

### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate
npm run seed
npm run dev
```

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## Docker (Postgres + Backend)
```bash
docker compose up --build
```

## Render deployment (backend)
- Uses `backend/render.yaml`.
- Build command: `npm install && npm run prisma:generate && npm run build`.
- Start command: `npm run prisma:migrate && node dist/server.js`.

Required Render env vars:
- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `FRONTEND_URL`
- `APP_VERSION`

## Netlify deployment (frontend)
- Uses `frontend/netlify.toml` for SPA redirects.
- Set `VITE_API_URL` to your Render backend URL.

## Environment variables
See `backend/.env.example` and `frontend/.env.example` for required keys.
