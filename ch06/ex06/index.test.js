import { describe, it, expect } from "vitest";
import { getAllPropertyNames } from "./index.js";

describe("getAllPropertyNames", () => {
  it("自身の列挙可能なプロパティ名を含む", () => {
    const obj = { a: 1 };
    expect(getAllPropertyNames(obj)).toContain("a");
  });

  it("自身の列挙不可なプロパティ名も含む", () => {
    const obj = { a: 1 };
    // bは列挙不可(enumerable: false)な独自プロパティ
    Object.defineProperty(obj, "b", {
      value: 2,
      enumerable: false,
    });
    expect(getAllPropertyNames(obj)).toContain("a");
    expect(getAllPropertyNames(obj)).toContain("b");
  });

  it("自身のSymbolプロパティ名も含む", () => {
    const obj = { a: 1 };
    const sym = Symbol("test");
    // Symbolをキーにした独自プロパティ
    obj[sym] = "test";
    expect(getAllPropertyNames(obj)).toContain("a");
    // 探すのはあくまでSymbol自体(sym)であり、文字列の"sym"ではない
    expect(getAllPropertyNames(obj)).toContain(sym);
  });

  it("継承した列挙可能なプロパティ名を含む", () => {
    const parent = { a: 1 };

    // parentをプロトタイプとして持つ、新しい空のオブジェクト
    const obj = Object.create(parent);
    obj.b = 2;

    // aはparent由来の継承プロパティ、bはobj自身のプロパティ
    expect(getAllPropertyNames(obj)).toContain("a");
    expect(getAllPropertyNames(obj)).toContain("b");
  });

  it("継承した列挙不可なプロパティ名は含まない", () => {
    const parent = { a: 1 };
    // bはparent(プロトタイプ)側の列挙不可なプロパティ
    Object.defineProperty(parent, "b", {
      value: 2,
      enumerable: false,
    });

    // parentをプロトタイプとして持つ、新しい空のオブジェクト
    const obj = Object.create(parent);
    obj.c = 3;

    // aは継承した列挙可能なプロパティなので含まれる
    expect(getAllPropertyNames(obj)).toContain("a");
    // bは継承した列挙不可なプロパティなので含まれない
    // (継承プロパティは列挙可能なものだけが対象、という仕様のため)
    expect(getAllPropertyNames(obj)).not.toContain("b");
    // cはobj自身のプロパティなので含まれる
    expect(getAllPropertyNames(obj)).toContain("c");
  });
});
