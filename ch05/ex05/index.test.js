import { describe, it, expect } from "vitest";
import { filterEvenProps } from "./index.js";

describe("filterEvenProps", () => {
  it("偶数の値を持つプロパティだけを残したオブジェクトを返す", () => {
    const o = { x: 1, y: 2, z: 3 };
    expect(filterEvenProps(o)).toEqual({ y: 2 });
  });

  it("元のオブジェクトを変更しない", () => {
    const o = { x: 1, y: 2, z: 3 };
    filterEvenProps(o);
    expect(o).toEqual({ x: 1, y: 2, z: 3 });
  });

  it("偶数の値を持つプロパティがない場合、空のオブジェクトを返す", () => {
    const o = { x: 1, y: 3, z: 5 };
    expect(filterEvenProps(o)).toEqual({});
  });
});
