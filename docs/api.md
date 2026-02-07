# Backend API Structure

## Auth
- `POST /api/auth/register` - Create parent account + consent.
- `POST /api/auth/login` - Authenticate parent.
- `POST /api/auth/refresh` - Refresh access token.
- `POST /api/auth/logout` - Revoke refresh token.

## Parents & Children
- `GET /api/parents/me` - Parent profile.
- `GET /api/parents/dashboard` - Parent dashboard summary.
- `GET /api/parents/approvals` - Pending lesson approvals.
- `POST /api/parents/approve` - Approve a lesson.
- `POST /api/children` - Create child profile.
- `GET /api/children` - List child profiles.
- `GET /api/children/:childId` - Child profile.
- `POST /api/children/:childId/limits` - Set screen-time limit.

## Learning
- `GET /api/learning-paths?age=&page=&pageSize=` - List learning paths.
- `GET /api/learning-paths/:pathId/lessons?age=&childId=` - Lessons in path.
- `GET /api/lessons/:lessonId?childId=` - Lesson detail (approved only).
- `POST /api/lessons/:lessonId/complete` - Submit answers + record completion.

## Progress & Gamification
- `GET /api/children/:childId/progress` - Progress summary.
- `GET /api/children/:childId/xp` - XP + level.
- `GET /api/children/:childId/badges` - Badges.
- `GET /api/children/:childId/streak` - Streaks.

## AI Playground
- `GET /api/ai/datasets` - Predefined datasets.
- `POST /api/ai/train` - Train simple classifier from labeled samples.
- `POST /api/ai/predict` - Predict class from sample.
- `GET /api/ai/chatbot` - Controlled, predefined responses.
