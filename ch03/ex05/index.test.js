import { describe, it, expect } from "vitest";
import { lfToCrlf, crlfToLf } from "./index.js";

describe("lfToCrlf", () => {
  it("LFをCR+LFに変換する", () => {
    expect(lfToCrlf("a\nb")).toBe("a\r\nb");
  });
});

describe("crlfToLf", () => {
  it("CR+LFをLFに変換する", () => {
    expect(crlfToLf("a\r\nb")).toBe("a\nb");
  });
});
