import { describe, it, expect } from "vitest";
import { fib, fibFast } from "./index.js";

describe("math", () => {
  describe("fib", () => {
    it("1", () => {
      expect(fib(1)).toBe(1);
    });

    it("5", () => {
      expect(fib(5)).toBe(5);
    });

    it("12", () => {
      expect(fib(12)).toBe(144);
    });
  });

  // 以下、fibFast のテストは AI (Claude) が追加しました。
  describe("fibFast", () => {
    it("5", () => {
      expect(fibFast(5)).toBe(5);
    });

    it("12", () => {
      expect(fibFast(12)).toBe(144);
    });

    it("75", () => {
      expect(fibFast(75)).toBe(2111485077978050);
    });
  });
});
