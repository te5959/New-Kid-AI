import { describe, it, expect, vi } from "vitest";
import { requireChildOwnership } from "../middlewares/ownership.js";

vi.mock("../config/prisma.js", () => ({
  prisma: {
    child: {
      findFirst: vi.fn().mockResolvedValue({ id: "child-1" })
    }
  }
}));

describe("requireChildOwnership", () => {
  it("allows when child belongs to parent", async () => {
    const req = { params: { childId: "child-1" }, user: { id: "parent-1" } } as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;
    const next = vi.fn();
    await requireChildOwnership(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
