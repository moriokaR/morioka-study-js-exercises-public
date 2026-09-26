import { describe, it, expect } from "vitest";
import { parseJson } from "./index.js";

describe("parseJson", () => {
  it("パースできる文字列を渡すと、success: true とパース結果を返す", () => {
    expect(parseJson('{"a":1}')).toEqual({ success: true, data: { a: 1 } });
  });

  it("パースできない文字列を渡すと、success: false とエラーを返す", () => {
    expect(parseJson("a")).toEqual({
      success: false,
      error: expect.any(Error),
    });
  });
});
