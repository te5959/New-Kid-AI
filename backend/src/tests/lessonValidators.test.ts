import { describe, it, expect } from "vitest";
import { completeLessonSchema } from "../validators/lessonValidators.js";

describe("lesson validators", () => {
  it("rejects invalid scores", () => {
    const result = completeLessonSchema.safeParse({ childId: "not-uuid", answers: [] });
    expect(result.success).toBe(false);
  });
});
