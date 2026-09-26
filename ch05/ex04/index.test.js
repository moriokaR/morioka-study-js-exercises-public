import { describe, it, expect } from "vitest";
import { fibonacciWhile, fibonacciDoWhile, fibonacciFor } from "./index.js";

describe("fibonacciWhile", () => {
  it("フィボナッチ数列の最初の10個を返す", () => {
    expect(fibonacciWhile()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
});

describe("fibonacciDoWhile", () => {
  it("フィボナッチ数列の最初の10個を返す", () => {
    expect(fibonacciDoWhile()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
});

describe("fibonacciFor", () => {
  it("フィボナッチ数列の最初の10個を返す", () => {
    expect(fibonacciFor()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
});
