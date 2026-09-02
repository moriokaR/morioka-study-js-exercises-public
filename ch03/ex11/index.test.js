import { describe, it, expect } from "vitest";
import { equals } from "./index.js";

describe("equals", () => {
  it("厳密等価ならtrue", () => {
    expect(equals(42, 42)).toBe(true);
    expect(equals(null, null)).toBe(true);
  });

  it("オブジェクト以外が混ざればfalse", () => {
    expect(equals({ x: 42 }, 42)).toBe(false);
    expect(equals(null, { x: 42 })).toBe(false);
  });

  it("プロパティの数・名前が一致しなければfalse", () => {
    expect(equals({ x: 1 }, { y: 1 })).toBe(false);
    expect(equals({ x: 1 }, { x: 1, y: 1 })).toBe(false);
  });

  it("プロパティの値を再帰的に比較する", () => {
    expect(equals({ x: { y: { z: 10 } } }, { x: { y: { z: 10 } } })).toBe(true);
    expect(equals({ x: { y: { z: 10 } } }, { x: { y: { z: 10, w: 1 } } })).toBe(
      false,
    );
  });
});
