# BrightByte AI Backend

## Local setup

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run seed
npm run dev
```

## Health check

`GET /health` returns `{ status, uptime, version }`.

## Render deployment

- Use `render.yaml`.
- Build command: `npm install && npm run prisma:generate && npm run build`
- Start command: `npm run prisma:migrate && node dist/server.js`

## Environment variables

See `.env.example` for required keys.
