import { createChild, listChildren, getChild, updateChild } from "../services/child-service.js";

export const createChildProfile = async (req, res, next) => {
  try {
    const { displayName, age } = req.body;
    if (!displayName || !age) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const child = await createChild({
      parentId: req.user.sub,
      displayName,
      age
    });
    return res.status(201).json(child);
  } catch (error) {
    return next(error);
  }
};

export const listChildProfiles = async (req, res, next) => {
  try {
    const children = await listChildren(req.user.sub);
    return res.json(children);
  } catch (error) {
    return next(error);
  }
};

export const getChildProfile = async (req, res, next) => {
  try {
    const child = await getChild({ parentId: req.user.sub, childId: req.params.id });
    if (!child) {
      return res.status(404).json({ error: "Child not found." });
    }
    return res.json(child);
  } catch (error) {
    return next(error);
  }
};

export const updateChildProfile = async (req, res, next) => {
  try {
    const { displayName, age } = req.body;
    const child = await updateChild({
      parentId: req.user.sub,
      childId: req.params.id,
      displayName,
      age
    });
    if (!child) {
      return res.status(404).json({ error: "Child not found." });
    }
    return res.json(child);
  } catch (error) {
    return next(error);
  }
};
