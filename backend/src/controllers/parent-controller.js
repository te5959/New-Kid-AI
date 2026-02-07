import { query } from "../models/db.js";

export const getParentProfile = async (req, res, next) => {
  try {
    const result = await query(
      "SELECT id, email, display_name FROM parents WHERE id = $1",
      [req.user.sub]
    );
    return res.json(result.rows[0]);
  } catch (error) {
    return next(error);
  }
};

export const getParentDashboard = async (req, res, next) => {
  try {
    const childrenResult = await query(
      "SELECT id, display_name, age FROM children WHERE parent_id = $1",
      [req.user.sub]
    );
    const childIds = childrenResult.rows.map((row) => row.id);
    const progressResult = childIds.length
      ? await query(
          `SELECT child_id, COUNT(*) FILTER (WHERE status = 'completed') AS completed
           FROM progress
           WHERE child_id = ANY($1)
           GROUP BY child_id`,
          [childIds]
        )
      : { rows: [] };

    const progressMap = progressResult.rows.reduce((acc, row) => {
      acc[row.child_id] = Number(row.completed);
      return acc;
    }, {});

    const dashboard = childrenResult.rows.map((child) => ({
      id: child.id,
      displayName: child.display_name,
      age: child.age,
      lessonsCompleted: progressMap[child.id] || 0
    }));

    return res.json({ children: dashboard });
  } catch (error) {
    return next(error);
  }
};

export const setScreenTimeLimit = async (req, res, next) => {
  try {
    const { childId } = req.params;
    const { dailyMinutes } = req.body;
    if (!dailyMinutes || dailyMinutes < 10) {
      return res.status(400).json({ error: "Daily minutes must be at least 10." });
    }
    await query(
      `INSERT INTO screen_time_limits (child_id, daily_minutes)
       VALUES ($1, $2)
       ON CONFLICT (child_id)
       DO UPDATE SET daily_minutes = EXCLUDED.daily_minutes, updated_at = NOW()`,
      [childId, dailyMinutes]
    );
    return res.json({ childId, dailyMinutes });
  } catch (error) {
    return next(error);
  }
};
