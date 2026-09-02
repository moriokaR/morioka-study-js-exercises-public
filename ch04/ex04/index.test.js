import { describe, it, expect } from "vitest";
import { bitCount } from "./index.js";

describe("bitCount", () => {
  it("0b111は3を返す", () => {
    expect(bitCount(0b111)).toEqual(3);
  });

  it("0b1111111111111111111111111111111は31を返す", () => {
    expect(bitCount(0b1111111111111111111111111111111)).toEqual(31);
  });
});
