-- Initial schema for BrightByte AI

CREATE TABLE "Parent" (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  "passwordHash" TEXT NOT NULL,
  "displayName" TEXT NOT NULL,
  "consentedAt" TIMESTAMP NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "RefreshToken" (
  id TEXT PRIMARY KEY,
  "parentId" TEXT NOT NULL REFERENCES "Parent"(id) ON DELETE CASCADE,
  "tokenHash" TEXT NOT NULL,
  "expiresAt" TIMESTAMP NOT NULL,
  "revokedAt" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "Child" (
  id TEXT PRIMARY KEY,
  "parentId" TEXT NOT NULL REFERENCES "Parent"(id) ON DELETE CASCADE,
  "displayName" TEXT NOT NULL,
  age INTEGER NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "LearningPath" (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  "minAge" INTEGER NOT NULL,
  "maxAge" INTEGER NOT NULL,
  "sortOrder" INTEGER NOT NULL
);

CREATE TABLE "Lesson" (
  id TEXT PRIMARY KEY,
  "learningPathId" TEXT NOT NULL REFERENCES "LearningPath"(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  "contentJson" JSONB NOT NULL,
  "minAge" INTEGER NOT NULL,
  "maxAge" INTEGER NOT NULL,
  "sortOrder" INTEGER NOT NULL
);

CREATE TABLE "Quiz" (
  id TEXT PRIMARY KEY,
  "lessonId" TEXT NOT NULL REFERENCES "Lesson"(id) ON DELETE CASCADE,
  questions JSONB NOT NULL
);

CREATE TABLE "Progress" (
  id TEXT PRIMARY KEY,
  "childId" TEXT NOT NULL REFERENCES "Child"(id) ON DELETE CASCADE,
  "lessonId" TEXT NOT NULL REFERENCES "Lesson"(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  score INTEGER NOT NULL,
  "completedAt" TIMESTAMP,
  UNIQUE ("childId", "lessonId")
);

CREATE TABLE "XpEvent" (
  id TEXT PRIMARY KEY,
  "childId" TEXT NOT NULL REFERENCES "Child"(id) ON DELETE CASCADE,
  source TEXT NOT NULL,
  points INTEGER NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "Badge" (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL
);

CREATE TABLE "ChildBadge" (
  id TEXT PRIMARY KEY,
  "childId" TEXT NOT NULL REFERENCES "Child"(id) ON DELETE CASCADE,
  "badgeId" TEXT NOT NULL REFERENCES "Badge"(id) ON DELETE CASCADE,
  "earnedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE ("childId", "badgeId")
);

CREATE TABLE "Streak" (
  "childId" TEXT PRIMARY KEY REFERENCES "Child"(id) ON DELETE CASCADE,
  "currentDays" INTEGER NOT NULL,
  "longestDays" INTEGER NOT NULL,
  "lastActivityDate" TIMESTAMP
);

CREATE TABLE "ScreenTimeLimit" (
  "childId" TEXT PRIMARY KEY REFERENCES "Child"(id) ON DELETE CASCADE,
  "dailyMinutes" INTEGER NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "LessonApproval" (
  id TEXT PRIMARY KEY,
  "parentId" TEXT NOT NULL REFERENCES "Parent"(id) ON DELETE CASCADE,
  "childId" TEXT NOT NULL REFERENCES "Child"(id) ON DELETE CASCADE,
  "lessonId" TEXT NOT NULL REFERENCES "Lesson"(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE ("childId", "lessonId")
);

CREATE TABLE "ChildActivity" (
  id TEXT PRIMARY KEY,
  "childId" TEXT NOT NULL REFERENCES "Child"(id) ON DELETE CASCADE,
  minutes INTEGER NOT NULL,
  "activityDate" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX "RefreshToken_parentId_idx" ON "RefreshToken"("parentId");
CREATE INDEX "Child_parentId_idx" ON "Child"("parentId");
CREATE INDEX "Lesson_path_idx" ON "Lesson"("learningPathId", "sortOrder");
CREATE INDEX "Progress_child_idx" ON "Progress"("childId");
CREATE INDEX "XpEvent_child_idx" ON "XpEvent"("childId");
CREATE INDEX "LessonApproval_parent_idx" ON "LessonApproval"("parentId");
CREATE INDEX "LessonApproval_lesson_idx" ON "LessonApproval"("lessonId");
CREATE INDEX "ChildActivity_child_idx" ON "ChildActivity"("childId", "activityDate");
