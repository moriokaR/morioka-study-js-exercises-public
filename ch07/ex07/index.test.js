import { describe, it, expect } from "vitest";
import { sort } from "./index.js";

// 問題7.7 のテスト。
// 自分で実装した sort(array, compare) について、
// 並び順(compare を省略した場合と指定した場合)と、境界になるケース(空配列、要素が1つ など)を確認する。

describe("sort", () => {
  it("compare を省略すると、小さい順に並ぶ", () => {
    expect(sort([3, 1, 2])).toEqual([1, 2, 3]);
  });
  it("compare を指定すると、その順に並ぶ", () => {
    expect(
      sort([3, 1, 2], (lhs, rhs) => (lhs > rhs ? -1 : lhs < rhs ? +1 : 0)),
    ).toEqual([3, 2, 1]);
  });
  it("逆順に並んだ配列も、正しく並ぶ", () => {
    expect(sort([3, 2, 1])).toEqual([1, 2, 3]);
  });
  it("すでに並んでいる配列は、そのまま変わらない", () => {
    expect(sort([1, 2, 3])).toEqual([1, 2, 3]);
  });
  it("同じ値を含む配列も、正しく並ぶ", () => {
    expect(sort([3, 1, 1, 2])).toEqual([1, 1, 2, 3]);
  });
  it("空配列を渡すと、空配列が返る", () => {
    expect(sort([])).toEqual([]);
  });
  it("要素が1つの配列は、そのまま返る", () => {
    expect(sort([1])).toEqual([1]);
  });
});
