import { describe, it, expect } from "vitest";
import { hash, newHashTable } from "./index.js";

describe("hash", () => {
  it("文字列をハッシュ値(数値)に変換する", () => {
    expect(typeof hash("abc")).toBe("number");
  });
  it("同じ文字列からは常に同じハッシュ値が返る", () => {
    const num = hash("abc");
    expect(hash("abc")).toBe(num);
  });
  it("異なる文字列からは異なるハッシュ値が返る(文字の並び順違いも含む)", () => {
    expect(hash("abc")).not.toBe(hash("cba"));
  });
});

describe("newHashTable", () => {
  describe("get/put", () => {
    it("putしたkeyのvalueをgetで取得できる", () => {
      const table = newHashTable(10);
      table.put("key1", "value1");
      expect(table.get("key1")).toBe("value1");
    });
    it("存在しないkeyをgetするとundefinedが返る", () => {
      const table = newHashTable(10);
      table.put("key1", "value1");
      expect(table.get("key2")).toBe(undefined);
    });
    it("同じkeyでputすると値が上書きされる", () => {
      const table = newHashTable(10);
      table.put("key1", "value1");
      table.put("key1", "value2");
      expect(table.get("key1")).toBe("value2");
    });
    // hash("key1") % 10 => 8
    // hash("key6") % 10 => 8
    it("ハッシュ値が衝突するkey同士でも、それぞれ正しい値を取得できる", () => {
      const table = newHashTable(10);
      table.put("key1", "value1");
      table.put("key6", "value2");
      expect(hash("key1") % 10).toBe(hash("key6") % 10);
      expect(table.get("key1")).toBe("value1");
      expect(table.get("key6")).toBe("value2");
    });
  });

  describe("size", () => {
    it("putするたびにsizeが増える", () => {
      const table = newHashTable(10);
      table.put("key1", "value1");
      expect(table.size).toBe(1);
    });
    it("同じkeyで上書きしてもsizeは増えない", () => {
      const table = newHashTable(10);
      table.put("key1", "value1");
      table.put("key1", "value2");
      expect(table.size).toBe(1);
    });
  });

  describe("remove", () => {
    it("removeしたkeyはgetするとundefinedになる", () => {
      const table = newHashTable(10);
      table.put("key1", "value1");
      table.remove("key1");
      expect(table.get("key1")).toBeUndefined();
    });
    it("removeするとsizeが減る", () => {
      const table = newHashTable(10);
      table.put("key1", "value1");
      table.remove("key1");
      expect(table.size).toBe(0);
    });
    // hash("key1") % 10 => 8
    // hash("key6") % 10 => 8
    it("衝突しているkeyの一部だけをremoveしても、他のkeyには影響しない", () => {
      const table = newHashTable(10);
      table.put("key1", "value1");
      table.put("key6", "value2");
      expect(hash("key1") % 10).toBe(hash("key6") % 10);
      table.remove("key1");
      expect(table.get("key6")).toBe("value2");
    });
  });
});
