import { describe, it, expect } from "vitest";
import { is31DaysIfElse, is31DaysSwitch } from "./index.js";

describe.each([
  ["is31DaysIfElse", is31DaysIfElse],
  ["is31DaysSwitch", is31DaysSwitch],
])("%s", (name, fn) => {
  it("Jan (31日) を判定する", () => {
    expect(fn("Jan")).toBe(true);
  });
  it("Feb (31日ではない) を判定する", () => {
    expect(fn("Feb")).toBe(false);
  });
  it("Mar (31日) を判定する", () => {
    expect(fn("Mar")).toBe(true);
  });
  it("Apr (31日ではない) を判定する", () => {
    expect(fn("Apr")).toBe(false);
  });
  it("May (31日) を判定する", () => {
    expect(fn("May")).toBe(true);
  });
  it("Jun (31日ではない) を判定する", () => {
    expect(fn("Jun")).toBe(false);
  });
  it("Jul (31日) を判定する", () => {
    expect(fn("Jul")).toBe(true);
  });
  it("Aug (31日) を判定する", () => {
    expect(fn("Aug")).toBe(true);
  });
  it("Sep (31日ではない) を判定する", () => {
    expect(fn("Sep")).toBe(false);
  });
  it("Oct (31日) を判定する", () => {
    expect(fn("Oct")).toBe(true);
  });
  it("Nov (31日ではない) を判定する", () => {
    expect(fn("Nov")).toBe(false);
  });
  it("Dec (31日) を判定する", () => {
    expect(fn("Dec")).toBe(true);
  });
});
