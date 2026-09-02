import { describe, it, expect } from "vitest";
import { isNearlyEqual } from "./index.js";

describe("isNearlyEqual", () => {
  it("0.3 - 0.2 と 0.1 はほぼ等しい", () => {
    expect(isNearlyEqual(0.3 - 0.2, 0.1)).toBe(true);
  });

  it("0.2 - 0.1 と 0.1 はほぼ等しい", () => {
    expect(isNearlyEqual(0.2 - 0.1, 0.1)).toBe(true);
  });

  it("0.3 - 0.1 と 0.1 は等しくない", () => {
    expect(isNearlyEqual(0.3 - 0.1, 0.1)).toBe(false);
  });
});
