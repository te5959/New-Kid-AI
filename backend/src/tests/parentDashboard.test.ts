import { describe, it, expect, vi } from "vitest";
import { getParentDashboard } from "../controllers/parentController.js";

vi.mock("../config/prisma.js", () => ({
  prisma: {
    child: {
      findMany: vi.fn().mockResolvedValue([
        {
          id: "child-1",
          displayName: "Maya",
          age: 9,
          progress: [{ status: "completed" }],
          screenTime: { dailyMinutes: 30 },
          xpEvents: [{ points: 20 }]
        }
      ])
    }
  }
}));

describe("parent dashboard", () => {
  it("returns child summaries", async () => {
    const req = { user: { id: "parent-1" } } as any;
    const res = { json: vi.fn() } as any;
    await getParentDashboard(req, res);
    expect(res.json).toHaveBeenCalled();
  });
});
