# BrightByte AI

A child-friendly AI learning platform for ages 8–14, with parent controls, safe experiments, and age-adaptive lessons.

## Architecture
See [docs/architecture.md](docs/architecture.md) for the full system diagram and flow.

## Database
- PostgreSQL schema: [docs/schema.sql](docs/schema.sql)

## Backend
- Node.js + Express
- JWT auth + refresh tokens
- Modular controllers and services

### Setup
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

## Frontend
- React + Vite + TypeScript
- Tailwind CSS
- React Router, Axios, Context API

### Setup
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables
Create a `.env` file in `frontend/` if you want to override the API URL:
```bash
VITE_API_URL=https://new-kid-ai.onrender.com
```

## Compliance
See [docs/compliance.md](docs/compliance.md) for GDPR/COPPA notes.

## Content Samples
See [docs/content.md](docs/content.md) for lesson and quiz examples.
