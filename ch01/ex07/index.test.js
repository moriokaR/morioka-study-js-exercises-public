import { describe, it, expect } from "vitest";
import { Point } from "./index.js";

describe("Point", () => {
  it("Point(1,1) add Point(2,-3)", () => {
    const p1 = new Point(1, 1);
    const p2 = new Point(2, -3);
    p1.add(p2);
    expect(p1.x).toBe(3);
    expect(p1.y).toBe(-2);
  });
});
