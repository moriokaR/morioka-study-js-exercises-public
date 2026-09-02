import { describe, it, expect } from "vitest";
import { add, sub, mul, div } from "./index.js";

describe("add", () => {
  it("実部・虚部それぞれの足し算になる", () => {
    const a = { re: 1, im: 2 };
    const b = { re: 3, im: 4 };
    expect(add(a, b)).toEqual({ re: 4, im: 6 });
  });
});

describe("sub", () => {
  it("実部・虚部それぞれの引き算になる", () => {
    const a = { re: 1, im: 2 };
    const b = { re: 3, im: 4 };
    expect(sub(a, b)).toEqual({ re: -2, im: -2 });
  });
});

describe("mul", () => {
  it("複素数の掛け算の公式通りになる", () => {
    const a = { re: 1, im: 2 };
    const b = { re: 3, im: 4 };
    expect(mul(a, b)).toEqual({ re: -5, im: 10 });
  });
});

describe("div", () => {
  it("複素数の割り算の公式通りになる", () => {
    const a = { re: 1, im: 2 };
    const b = { re: 3, im: 4 };
    expect(div(a, b)).toEqual({ re: 0.44, im: 0.08 });
  });
});
