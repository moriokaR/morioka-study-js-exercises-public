// このリポジトリのvitest.config.jsはglobals:trueではないため、
// 問題側から提供されたテストファイルに不足しているtest/expectのimportを追加している
// (テストの中身・アサーションは一切変更していない)
import { test, expect } from "vitest";
import { assign } from "./index.js";

// targetとsameTargetは内容が同じだが別のオブジェクト(参照が違う)。
// assign()もObject.assign()もtargetを直接書き換える(破壊的な)関数なので、
// 同じオブジェクトを2回(自作のassign()と本物のObject.assign()の両方に)渡すと、
// 1回目の実行で書き換わってしまい正しく比較できなくなる。
// そのため、期待値の計算(本物のObject.assign())にはsameTargetを使い、
// 実際のテスト対象(自作のassign())にはtargetを使う、という形で分けている。
function testCase(target, sameTarget, sources) {
  try {
    return {
      target,
      sources,
      // 期待値は決め打ちの値ではなく、実際のObject.assign()を実行した結果そのもの
      expected: Object.assign(sameTarget, ...sources),
      exception: null,
    };
  } catch (e) {
    // Object.assign()がエラーを投げるケース(targetがnull/undefinedなど)は、
    // そのエラー自体をexceptionとして保持しておく
    return { target, sources, expected: null, exception: e };
  }
}

const sym1 = Symbol("sym1");
const sym2 = Symbol("sym2");

// nameというアクセサプロパティ(getter/setter)を持ち、
// 実体は列挙不可の_nameプロパティに保存されているオブジェクトを作る。
// assign()が値をコピーするとき、プロパティの定義(descriptor)をそのままコピーするのではなく、
// sourceのgetterで値を読み取り、targetのsetterに書き込む(単純な代入と同じ)動きになっているかを
// 確認するためのテストケース。
function getterSetterObj(name) {
  const obj = {
    get name() {
      return this._name;
    },
    set name(v) {
      this._name = v;
    },
  };
  return Object.defineProperty(obj, "_name", {
    value: name,
    enumerable: false,
    writable: true,
    configurable: false,
  });
}

// 列挙可能なSymbolプロパティ(sym1)と、列挙不可なSymbolプロパティ(sym2)を持つオブジェクト。
// 「Symbolプロパティも列挙可能なものだけコピーする」動きを確認するためのテストケース。
const objWithSymbolProps = {
  [sym1]: "symbol1",
};
Object.defineProperty(objWithSymbolProps, sym2, {
  enumerable: false,
  value: "symbol2",
});

test.each([
  // sourceが0個(何もマージしない)
  testCase({ foo: "foo" }, { foo: "foo" }, []),
  // 複数のsourceを普通にマージする基本ケース
  testCase({}, {}, [
    { foo: "foo", bar: "bar" },
    { fizz: "fizz", buzz: "buzz" },
  ]),
  // 複数のsourceで同じキー(foo)が重複している場合、後のsourceの値で上書きされる
  testCase({ foo: "foo", hello: "world" }, { foo: "foo", hello: "world" }, [
    { foo: "fooo", bar: "bar" },
    { foo: "foooo", fizz: "fizz", buzz: "buzz" },
  ]),
  // ネストしたオブジェクト(parent.child)。深いマージではなく、
  // parentキーごとsourceの値で上書きされる(浅いコピーである)ことの確認
  testCase(
    { parent: { child: { foo: "fooo", bar: "bar" } } },
    { parent: { child: { foo: "fooo", bar: "bar" } } },
    [{ parent: { child: { fizz: "fizz", buzz: "buzz" } } }],
  ),
  // sourcesの配列に、オブジェクト以外の値(数値・真偽値・配列・null・undefined)が混ざっているケース。
  // 数値・真偽値はコピーするプロパティを持たず、配列はインデックスが列挙可能なプロパティとしてコピーされ、
  // null/undefinedはエラーにならずスキップされる、という違いを確認する
  testCase({ foo: "foo", hello: "world" }, { foo: "foo", hello: "world" }, [
    123,
    true,
    ["aa", "bb", "cc"],
    null,
    undefined,
  ]),
  // targetが数値のケース。プリミティブなのでラッパーオブジェクトに変換されて使われる
  testCase(1, 1, [{ foo: "foo", bar: "bar" }]),
  // targetが真偽値のケース。数値と同様にラッパーオブジェクトに変換される
  testCase(true, true, [{ foo: "foo", bar: "bar" }]),
  // targetが配列のケース。すでにオブジェクトなので変換されず、そのまま書き換えられる
  testCase(
    ["aa", "bb", "cc"],
    ["aa", "bb", "cc"],
    [{ foo: "foo", bar: "bar" }],
  ),
  // targetがMapのケース。すでにオブジェクトなので変換されず、そのまま書き換えられる
  testCase(new Map(), new Map(), [{ foo: "foo", bar: "bar" }]),
  // targetがDateのケース。すでにオブジェクトなので変換されず、そのまま書き換えられる
  testCase(new Date(), new Date(), [{ foo: "foo", bar: "bar" }]),
  // targetがnullのケース。エラー(TypeError)が投げられることを確認する
  testCase(null, null, [{ foo: "foo", bar: "bar" }]),
  // targetがundefinedのケース。nullと同様にエラーが投げられることを確認する
  testCase(undefined, undefined, [{ foo: "foo", bar: "bar" }]),
  // sourceがSymbolプロパティを持つケース。列挙可能なSymbol(sym1)だけコピーされることを確認する
  testCase({ foo: "foo" }, { foo: "foo" }, [objWithSymbolProps]),
  // targetとsourceの両方がgetter/setterを持つケース。
  // sourceのgetterで読み取った値を、targetのsetter経由で書き込む動きになっていることを確認する
  testCase(getterSetterObj("alice"), getterSetterObj("alice"), [
    getterSetterObj("bob"),
  ]),
])(
  "test case $#: expected: $expected, exception: $exception",
  ({ target, sources, expected, exception }) => {
    // exceptionが入っているケースは、自作のassign()も同じエラーを投げることを確認する
    if (exception) {
      expect(() => assign(target, ...sources)).toThrowError(exception);
    } else {
      // exceptionが入っていないケースは、自作のassign()の結果が
      // 本物のObject.assign()の結果(expected)と一致することを確認する
      expect(assign(target, ...sources)).toEqual(expected);
    }
  },
);
