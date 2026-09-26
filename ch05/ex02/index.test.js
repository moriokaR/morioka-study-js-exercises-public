import { describe, it, expect } from "vitest";
import { escapeIfElse, escapeSwitch } from "./index.js";

describe.each([
  ["escapeIfElse", escapeIfElse],
  ["escapeSwitch", escapeSwitch],
])("%s", (name, fn) => {
  it("\\0 (NUL) を変換する", () => {
    expect(fn("a\0b")).toBe("a\\0b");
  });
  it("\\b (バックスペース) を変換する", () => {
    expect(fn("a\bb")).toBe("a\\bb");
  });
  it("\\t (タブ) を変換する", () => {
    expect(fn("a\tb")).toBe("a\\tb");
  });
  it("\\n (改行) を変換する", () => {
    expect(fn("a\nb")).toBe("a\\nb");
  });
  it("\\v (垂直タブ) を変換する", () => {
    expect(fn("a\vb")).toBe("a\\vb");
  });
  it("\\f (改ページ) を変換する", () => {
    expect(fn("a\fb")).toBe("a\\fb");
  });
  it("\\r (復帰) を変換する", () => {
    expect(fn("a\rb")).toBe("a\\rb");
  });
  it('\\" (ダブルクォート) を変換する', () => {
    expect(fn('a"b')).toBe('a\\"b');
  });
  it("\\' (シングルクォート) を変換する", () => {
    expect(fn("a'b")).toBe("a\\'b");
  });
  it("\\\\ (バックスラッシュ) を変換する", () => {
    expect(fn("a\\b")).toBe("a\\\\b");
  });
  it("対象外の文字はそのまま返す", () => {
    expect(fn("abc")).toBe("abc");
  });
});
