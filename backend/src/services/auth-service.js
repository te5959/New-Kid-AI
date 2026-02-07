import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { query } from "../models/db.js";

const accessTokenTtl = "15m";
const refreshTokenTtlDays = 7;

const hashToken = async (token) => {
  return bcrypt.hash(token, 10);
};

export const registerParent = async ({ email, password, displayName }) => {
  const passwordHash = await bcrypt.hash(password, 12);
  const parentId = uuidv4();
  await query(
    `INSERT INTO parents (id, email, password_hash, display_name, consented_at)
     VALUES ($1, $2, $3, $4, NOW())`,
    [parentId, email, passwordHash, displayName]
  );
  return { id: parentId, email, displayName };
};

export const authenticateParent = async ({ email, password }) => {
  const result = await query("SELECT * FROM parents WHERE email = $1", [email]);
  const parent = result.rows[0];
  if (!parent) {
    return null;
  }
  const isValid = await bcrypt.compare(password, parent.password_hash);
  if (!isValid) {
    return null;
  }
  return {
    id: parent.id,
    email: parent.email,
    displayName: parent.display_name
  };
};

export const createTokens = async (parent) => {
  const accessToken = jwt.sign(
    { sub: parent.id, role: "parent" },
    process.env.JWT_SECRET,
    { expiresIn: accessTokenTtl }
  );

  const refreshToken = jwt.sign(
    { sub: parent.id, type: "refresh" },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: `${refreshTokenTtlDays}d` }
  );

  const refreshTokenHash = await hashToken(refreshToken);
  const refreshId = uuidv4();
  await query(
    `INSERT INTO refresh_tokens (id, parent_id, token_hash, expires_at)
     VALUES ($1, $2, $3, NOW() + INTERVAL '${refreshTokenTtlDays} days')`,
    [refreshId, parent.id, refreshTokenHash]
  );

  return { accessToken, refreshToken };
};

export const refreshAccessToken = async (refreshToken) => {
  const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const result = await query(
    `SELECT * FROM refresh_tokens WHERE parent_id = $1 AND revoked_at IS NULL`,
    [payload.sub]
  );
  const tokens = result.rows;
  const match = await Promise.all(
    tokens.map(async (tokenRow) => {
      const ok = await bcrypt.compare(refreshToken, tokenRow.token_hash);
      return ok ? tokenRow : null;
    })
  );
  const validRow = match.find(Boolean);
  if (!validRow) {
    return null;
  }

  await query(
    "UPDATE refresh_tokens SET revoked_at = NOW() WHERE id = $1",
    [validRow.id]
  );

  const parentResult = await query("SELECT id, email, display_name FROM parents WHERE id = $1", [payload.sub]);
  const parent = parentResult.rows[0];
  return createTokens({ id: parent.id, email: parent.email, displayName: parent.display_name });
};

export const revokeRefreshToken = async (refreshToken) => {
  const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const result = await query(
    `SELECT * FROM refresh_tokens WHERE parent_id = $1 AND revoked_at IS NULL`,
    [payload.sub]
  );
  const tokens = result.rows;
  const match = await Promise.all(
    tokens.map(async (tokenRow) => {
      const ok = await bcrypt.compare(refreshToken, tokenRow.token_hash);
      return ok ? tokenRow : null;
    })
  );
  const validRow = match.find(Boolean);
  if (!validRow) {
    return false;
  }
  await query("UPDATE refresh_tokens SET revoked_at = NOW() WHERE id = $1", [validRow.id]);
  return true;
};
