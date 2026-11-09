import { describe, it, expect } from "vitest";
import { add, multiply } from "./index.js";

// 問題7.1 のテスト。
// 行列の加算(add)・乗算(multiply)について、正常ケースと、定義できないサイズの行列を渡したときのエラーを確認する。
// 行列は「配列の配列」で表す。配列の中身を比べるので toEqual を使い、エラーは関数で包んで toThrow で確認する。
describe("行列の加算", () => {
  it("同じサイズの行列を足すと、同じ位置の要素の和の行列が返る", () => {
    const a = [
      [1, 2],
      [3, 4],
    ];
    const b = [
      [5, 6],
      [7, 8],
    ];
    expect(add(a, b)).toEqual([
      [6, 8],
      [10, 12],
    ]);
  });
  it("行数が違う行列を渡すとエラーになる", () => {
    const a = [
      [1, 2],
      [3, 4],
    ];
    const b = [[5, 6]];
    expect(() => add(a, b)).toThrow();
  });
  it("列数が違う行列を渡すとエラーになる", () => {
    const a = [
      [1, 2],
      [3, 4],
    ];
    const b = [[5], [7]];
    expect(() => add(a, b)).toThrow();
  });
});

describe("行列の乗算", () => {
  it("掛け算ができるサイズの行列を掛けると、積の行列が返る", () => {
    const a = [
      [1, 2],
      [3, 4],
    ];
    const b = [
      [5, 6],
      [7, 8],
    ];
    expect(multiply(a, b)).toEqual([
      [19, 22],
      [43, 50],
    ]);
  });
  it("結果のサイズが m行p列になる(正方行列でない場合)", () => {
    const a = [[1, 2]];
    const b = [[5], [7]];
    expect(multiply(a, b)).toEqual([[19]]);
  });
  it("左の行列の列数と右の行列の行数が違うとエラーになる", () => {
    const a = [[1, 2]];
    const b = [[5, 6]];
    expect(() => multiply(a, b)).toThrow();
  });
});
