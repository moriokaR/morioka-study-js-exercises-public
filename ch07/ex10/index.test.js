import { describe, it, expect } from "vitest";
import { DynamicSizeArray } from "./index.js";

// 問題7.10 のテスト。
// 動的配列 DynamicSizeArray について、length / get / set / push の動きと、
// 範囲外アクセスのエラー、再配置が起きるサイズ(初期サイズ 4 を超えたとき)での push を確認する。

describe("length", () => {
  it("作った直後は 0 を返す", () => {
    const a = new DynamicSizeArray();
    expect(a.length()).toBe(0);
  });
  it("push するたびに、1 ずつ増える", () => {
    const a = new DynamicSizeArray();
    a.push(1);
    expect(a.length()).toBe(1);
  });
});

describe("push と get", () => {
  it("push した値を、get で取り出せる", () => {
    const a = new DynamicSizeArray();
    a.push(1);
    expect(a.get(0)).toBe(1);
  });
  it("初期サイズ(4)を超えて push しても、すべての値を get で取り出せる", () => {
    const a = new DynamicSizeArray();
    a.push(1);
    a.push(2);
    a.push(3);
    a.push(4);
    a.push(5);
    expect(a.get(0)).toBe(1);
    expect(a.get(1)).toBe(2);
    expect(a.get(2)).toBe(3);
    expect(a.get(3)).toBe(4);
    expect(a.get(4)).toBe(5);
  });
  it("何度も再配置が起きるほど push しても、すべての値を get で取り出せる", () => {
    const a = new DynamicSizeArray();
    for (let i = 1; i < 20; i++) {
      a.push(i);
      expect(a.get(i - 1)).toBe(i);
    }
  });
});

describe("get", () => {
  it("範囲外(負の数)の index を渡すと、エラーになる", () => {
    const a = new DynamicSizeArray();
    a.push(1);
    expect(() => a.get(-1)).toThrow();
  });
  it("まだ push していない位置(length 以上)を渡すと、エラーになる", () => {
    const a = new DynamicSizeArray();
    a.push(1);
    expect(() => a.get(2)).toThrow();
  });
});

describe("set", () => {
  it("すでにある要素を、新しい値に書き換えられる", () => {
    const a = new DynamicSizeArray();
    a.push(1);
    a.set(0, 2);
    expect(a.get(0)).toBe(2);
  });
  it("範囲外の index を渡すと、エラーになる", () => {
    const a = new DynamicSizeArray();
    a.push(1);
    expect(() => a.set(2, 2)).toThrow();
  });
});
