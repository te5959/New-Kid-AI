import { describe, it, expect } from "vitest";
import { trainClassifier } from "../services/playgroundService.js";

describe("playground", () => {
  it("returns null for unknown dataset", () => {
    const result = trainClassifier("unknown", []);
    expect(result).toBeNull();
  });
});
