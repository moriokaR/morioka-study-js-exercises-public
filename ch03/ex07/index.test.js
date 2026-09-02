import { equalArrays } from "./index.js";
import { test, expect } from "vitest";

test("ch03-ex07", () => {
  const x = "ab";
  const y = ["a", "b"];

  expect(equalArrays(x, y)).toBe(true);
  expect(x).not.toEqual(y);
});
