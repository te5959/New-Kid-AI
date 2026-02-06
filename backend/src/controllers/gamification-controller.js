import { getXpSummary, getProgressSummary, getBadges, getStreak } from "../services/gamification-service.js";

export const getChildProgress = async (req, res, next) => {
  try {
    const summary = await getProgressSummary(req.params.id);
    return res.json(summary);
  } catch (error) {
    return next(error);
  }
};

export const getChildXp = async (req, res, next) => {
  try {
    const summary = await getXpSummary(req.params.id);
    return res.json(summary);
  } catch (error) {
    return next(error);
  }
};

export const getChildBadges = async (req, res, next) => {
  try {
    const badges = await getBadges(req.params.id);
    return res.json(badges);
  } catch (error) {
    return next(error);
  }
};

export const getChildStreak = async (req, res, next) => {
  try {
    const streak = await getStreak(req.params.id);
    return res.json(streak);
  } catch (error) {
    return next(error);
  }
};
