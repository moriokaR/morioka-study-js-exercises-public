import { describe, it, expect } from "vitest";

describe("Hundred Points Symbol (💯)", () => {
  it("lengthの値を確認する", () => {
    expect("💯".length).toBe(2);
  });

  it("UTF-16のサロゲートペア表現と同値であること", () => {
    expect("💯").toBe("\uD83D\uDCAF");
  });

  it("UTF-32のコードポイント表現と同値であること", () => {
    expect("💯").toBe("\u{0001F4AF}");
  });
});
