import { v4 as uuidv4 } from "uuid";
import { query } from "../models/db.js";

const levelThresholds = [0, 50, 120, 200, 300, 420, 560];

export const recordLessonCompletion = async ({ childId, lessonId, score }) => {
  const progressResult = await query(
    `INSERT INTO progress (id, child_id, lesson_id, status, score, completed_at)
     VALUES ($1, $2, $3, 'completed', $4, NOW())
     ON CONFLICT (child_id, lesson_id)
     DO UPDATE SET status = 'completed', score = EXCLUDED.score, completed_at = NOW()
     RETURNING id`,
    [uuidv4(), childId, lessonId, score]
  );

  const xpPoints = Math.max(10, Math.round(score * 0.5));
  await query(
    `INSERT INTO xp_events (id, child_id, source, points)
     VALUES ($1, $2, $3, $4)`,
    [uuidv4(), childId, `lesson:${lessonId}`, xpPoints]
  );

  return { progressId: progressResult.rows[0].id, xpAwarded: xpPoints };
};

export const getXpSummary = async (childId) => {
  const result = await query(
    "SELECT COALESCE(SUM(points), 0) AS total FROM xp_events WHERE child_id = $1",
    [childId]
  );
  const totalXp = Number(result.rows[0].total);
  const level = levelThresholds.filter((threshold) => totalXp >= threshold).length;
  const nextThreshold = levelThresholds[level] || levelThresholds[levelThresholds.length - 1];
  return { totalXp, level, nextThreshold };
};

export const getProgressSummary = async (childId) => {
  const result = await query(
    `SELECT status, COUNT(*)::int AS count
     FROM progress
     WHERE child_id = $1
     GROUP BY status`,
    [childId]
  );
  const summary = result.rows.reduce(
    (acc, row) => ({ ...acc, [row.status]: row.count }),
    { locked: 0, in_progress: 0, completed: 0 }
  );
  return summary;
};

export const getBadges = async (childId) => {
  const result = await query(
    `SELECT badges.code, badges.title, badges.description, badges.icon, child_badges.earned_at
     FROM child_badges
     JOIN badges ON badges.id = child_badges.badge_id
     WHERE child_badges.child_id = $1
     ORDER BY child_badges.earned_at DESC`,
    [childId]
  );
  return result.rows;
};

export const getStreak = async (childId) => {
  const result = await query(
    "SELECT current_days, longest_days, last_activity_date FROM streaks WHERE child_id = $1",
    [childId]
  );
  return result.rows[0] || { current_days: 0, longest_days: 0, last_activity_date: null };
};

export const updateStreak = async (childId) => {
  await query(
    `INSERT INTO streaks (child_id, current_days, longest_days, last_activity_date)
     VALUES ($1, 1, 1, CURRENT_DATE)
     ON CONFLICT (child_id)
     DO UPDATE
       SET current_days = CASE
           WHEN streaks.last_activity_date = CURRENT_DATE - INTERVAL '1 day'
           THEN streaks.current_days + 1
           WHEN streaks.last_activity_date = CURRENT_DATE THEN streaks.current_days
           ELSE 1
         END,
         longest_days = GREATEST(streaks.longest_days, streaks.current_days + 1),
         last_activity_date = CURRENT_DATE`,
    [childId]
  );
};
