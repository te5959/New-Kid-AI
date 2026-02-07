import { describe, it, expect, vi } from "vitest";

vi.mock("../config/env.js", () => ({
  env: {
    JWT_SECRET: "test-secret-test-secret-test-secret-test-secret",
    JWT_REFRESH_SECRET: "refresh-secret-refresh-secret-refresh-secret"
  }
}));

import { registerSchema } from "../validators/authValidators.js";
import { signAccessToken, verifyAccessToken } from "../utils/jwt.js";

describe("auth utilities", () => {
  it("validates register payload", () => {
    const result = registerSchema.safeParse({
      email: "parent@example.com",
      password: "password123",
      displayName: "Parent"
    });
    expect(result.success).toBe(true);
  });

  it("signs and verifies access tokens", () => {
    const token = signAccessToken("parent-1");
    const payload = verifyAccessToken(token);
    expect(payload.sub).toBe("parent-1");
  });
});
