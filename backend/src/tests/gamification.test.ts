import { describe, it, expect, vi } from "vitest";
import { recordLessonCompletion } from "../services/gamificationService.js";

vi.mock("../config/prisma.js", () => ({
  prisma: {
    progress: {
      upsert: vi.fn().mockResolvedValue({ id: "progress-1" })
    },
    xpEvent: {
      create: vi.fn().mockResolvedValue({})
    },
    streak: {
      findUnique: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockResolvedValue({})
    }
  }
}));

describe("gamification", () => {
  it("awards XP for lesson completion", async () => {
    const result = await recordLessonCompletion("child-1", "lesson-1", 80);
    expect(result.xpAwarded).toBeGreaterThan(0);
  });
});
