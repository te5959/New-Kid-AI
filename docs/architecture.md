# System Architecture

```
[Child App (React Web)] -----> [API Gateway (Express)] -----> [PostgreSQL]
       |                                 |                        |
       |                                 |                        |
       |                                 +--> [Lesson Engine]
       |                                 +--> [Gamification Engine]
       |                                 +--> [AI Playground Service]
       |                                 +--> [Analytics Aggregator]
       |
[Parent App (React Web)] ----> [Auth Service (JWT + Refresh)]
```

## Flow Overview

1. **Authentication**
   - Parent creates account and grants consent.
   - Parent creates one or more child profiles.
   - JWT access token + refresh token for sessions.

2. **Learning Path Delivery**
   - Frontend requests learning paths and lessons.
   - Lesson engine returns age-adaptive content blocks.

3. **Progress & Gamification**
   - Client submits lesson completion and quiz results.
   - Gamification engine awards XP, badges, and streaks.

4. **AI Playground**
   - Child selects a dataset and labels samples.
   - Service trains a simple, controlled classifier and returns results.
   - No free-text prompts; only predefined options.

5. **Dashboards**
   - Child dashboard: progress, XP, level, streak.
   - Parent dashboard: approvals, screen-time limits, summaries.

## Technology Stack

- **Frontend:** React + Vite, React Router, accessible UI components.
- **Backend:** Node.js + Express, modular controllers/services.
- **Database:** PostgreSQL with relational schema, indexed.
- **Auth:** JWT access + refresh tokens with rotation.
- **AI Playground:** Deterministic, safe logic (no external AI).
