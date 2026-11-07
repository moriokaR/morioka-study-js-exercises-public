import { test, expect } from "vitest";

// 問題6.10: obj と等価なオブジェクト answer を、
// プロパティの簡略記法とスプレッド演算子を使って、なるべくシンプルに作成する。
test("6.10: 簡略記法とスプレッド演算子で作った answer が obj と等価", () => {
  const obj1 = {
    foo: Math.random(),
    bar: Math.random(),
  };

  const obj2 = {
    fizz: Math.random(),
    buzz: Math.random(),
  };

  const obj3 = {
    bar: Math.random(),
    buzz: Math.random(),
  };

  const num1 = Math.random();
  const num2 = Math.random();

  const arr1 = [Math.random(), Math.random(), Math.random()];
  const arr2 = [Math.random(), Math.random()];

  const obj = {
    num1: num1,
    num2: num2,
    foo: obj1.foo,
    bar: obj3.bar,
    fizz: obj2.fizz,
    buzz: obj2.buzz,
    arr: [arr1[0], arr1[1], arr1[2], num1, arr2[0], arr2[1]],
  };

  const answer = {
    // プロパティの簡略記法: プロパティ名と、値を入れる変数名が同じなら「名前: 名前」を「名前」だけで書ける。
    // (num1: num1, num2: num2 と同じ意味)
    num1,
    num2,

    // オブジェクトのスプレッド: ...obj1 は、obj1 のプロパティ(foo, bar)をその場に展開する。
    // 同じ名前のプロパティは「後ろに書いたほうで上書きされる」ので、並び順が重要。
    //   - bar は obj1 と obj3 の両方にあり、obj では obj3 の値 → obj3 を obj1 より後ろに置く
    //   - buzz は obj2 と obj3 の両方にあり、obj では obj2 の値 → obj2 を obj3 より後ろに置く
    //   この2つを同時に満たす並びは obj1 → obj3 → obj2 の1通りだけ。
    //   展開の流れ: obj1 で foo, bar → obj3 で bar と buzz を上書き → obj2 で fizz を追加し buzz を上書き
    // (...obj1.foo のように値を展開すると、数値にはプロパティが無いので何も追加されない。
    //  foo という「名前」ごと取り込むには、プロパティを持つオブジェクト全体を展開する)
    ...obj1,
    ...obj3,
    ...obj2,

    // 配列のスプレッド: 配列の中で ...arr1 と書くと、arr1 の要素を全部その場に並べる。
    // [arr1[0], arr1[1], arr1[2], num1, arr2[0], arr2[1]] と同じ並びになる。
    arr: [...arr1, num1, ...arr2],
  };

  expect(answer).toEqual(obj);
});
