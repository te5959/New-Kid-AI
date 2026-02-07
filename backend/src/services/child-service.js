import { v4 as uuidv4 } from "uuid";
import { query } from "../models/db.js";

export const createChild = async ({ parentId, displayName, age }) => {
  const childId = uuidv4();
  await query(
    `INSERT INTO children (id, parent_id, display_name, age)
     VALUES ($1, $2, $3, $4)`,
    [childId, parentId, displayName, age]
  );
  return { id: childId, displayName, age };
};

export const listChildren = async (parentId) => {
  const result = await query(
    "SELECT id, display_name, age FROM children WHERE parent_id = $1 ORDER BY created_at",
    [parentId]
  );
  return result.rows.map((row) => ({
    id: row.id,
    displayName: row.display_name,
    age: row.age
  }));
};

export const getChild = async ({ parentId, childId }) => {
  const result = await query(
    "SELECT id, display_name, age FROM children WHERE id = $1 AND parent_id = $2",
    [childId, parentId]
  );
  const row = result.rows[0];
  if (!row) {
    return null;
  }
  return { id: row.id, displayName: row.display_name, age: row.age };
};

export const updateChild = async ({ parentId, childId, displayName, age }) => {
  const result = await query(
    `UPDATE children
     SET display_name = COALESCE($1, display_name),
         age = COALESCE($2, age)
     WHERE id = $3 AND parent_id = $4
     RETURNING id, display_name, age`,
    [displayName, age, childId, parentId]
  );
  const row = result.rows[0];
  if (!row) {
    return null;
  }
  return { id: row.id, displayName: row.display_name, age: row.age };
};
