# Backend API Structure

## Auth
- `POST /api/auth/register` - Create parent account + consent.
- `POST /api/auth/login` - Authenticate parent.
- `POST /api/auth/refresh` - Refresh access token.
- `POST /api/auth/logout` - Revoke refresh token.

## Parents & Children
- `GET /api/parents/me` - Parent profile.
- `POST /api/children` - Create child profile.
- `GET /api/children` - List child profiles.
- `GET /api/children/:id` - Child profile.
- `PATCH /api/children/:id` - Update child profile.

## Learning
- `GET /api/learning-paths` - List learning paths.
- `GET /api/learning-paths/:id/lessons` - Lessons in path.
- `GET /api/lessons/:id` - Lesson detail.
- `POST /api/lessons/:id/complete` - Mark lesson complete.

## Progress & Gamification
- `GET /api/children/:id/progress` - Progress summary.
- `GET /api/children/:id/xp` - XP + level.
- `GET /api/children/:id/badges` - Badges.
- `GET /api/children/:id/streak` - Streaks.

## Parent Dashboard
- `GET /api/parents/dashboard` - Aggregated progress for all children.
- `POST /api/parents/limits/:childId` - Set screen-time limit.

## AI Playground
- `GET /api/ai/datasets` - Predefined datasets.
- `POST /api/ai/train` - Train simple classifier from labeled samples.
- `POST /api/ai/predict` - Predict class from sample.
- `GET /api/ai/chatbot` - Controlled, predefined responses.
