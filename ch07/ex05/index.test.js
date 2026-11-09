import { describe, it, expect } from "vitest";
import { pop, push, shift, unshift, sort } from "./index.js";

// 問題7.5 のテスト。
// 各関数について、「戻り値が期待通りの新しい配列になること」と、
// 「元の配列が変更されていないこと」を確認する。

describe("pop", () => {
  it("末尾を取り除いた新しい配列が返る", () => {
    const seq = [1, 2, 3, 4, 5];
    expect(pop(seq)).toEqual([1, 2, 3, 4]);
  });
  it("元の配列は変更されない", () => {
    const seq = [1, 2, 3, 4, 5];
    pop(seq);
    expect(seq).toEqual([1, 2, 3, 4, 5]);
  });
  it("空配列を渡すと、空配列が返る", () => {
    expect(pop([])).toEqual([]);
  });
});

describe("push", () => {
  it("末尾に値を追加した新しい配列が返る", () => {
    const seq = [1, 2, 3, 4, 5];
    expect(push(seq, 6)).toEqual([1, 2, 3, 4, 5, 6]);
  });
  it("元の配列は変更されない", () => {
    const seq = [1, 2, 3, 4, 5];
    push(seq, 6);
    expect(seq).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("shift", () => {
  it("先頭を取り除いた新しい配列が返る", () => {
    const seq = [1, 2, 3, 4, 5];
    expect(shift(seq)).toEqual([2, 3, 4, 5]);
  });
  it("元の配列は変更されない", () => {
    const seq = [1, 2, 3, 4, 5];
    shift(seq);
    expect(seq).toEqual([1, 2, 3, 4, 5]);
  });
  it("空配列を渡すと、空配列が返る", () => {
    expect(shift([])).toEqual([]);
  });
});

describe("unshift", () => {
  it("先頭に値を追加した新しい配列が返る", () => {
    const seq = [1, 2, 3, 4, 5];
    expect(unshift(seq, 0)).toEqual([0, 1, 2, 3, 4, 5]);
  });
  it("元の配列は変更されない", () => {
    const seq = [1, 2, 3, 4, 5];
    unshift(seq, 0);
    expect(seq).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("sort", () => {
  it("指定した比較関数の順に並べ替えた新しい配列が返る", () => {
    const seq = [1, 2, 3, 4, 5];
    expect(sort(seq, (a, b) => b - a)).toEqual([5, 4, 3, 2, 1]);
  });
  it("元の配列は変更されない", () => {
    const seq = [1, 2, 3, 4, 5];
    sort(seq, (a, b) => b - a);
    expect(seq).toEqual([1, 2, 3, 4, 5]);
  });
});
