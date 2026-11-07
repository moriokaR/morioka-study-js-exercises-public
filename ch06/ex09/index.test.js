import { test, expect, vi } from "vitest";

// 問題6.9: 「ここに１行のコードを書く」の部分に1行だけコードを書いて、
// 最後のマッチャー(expect)が成功するようにする。
test("6.9: JSON.stringify に sum の結果が含まれ、sum が呼ばれる", () => {
  const mock = vi.fn();

  const obj = {
    x: 0,
    y: 0,
    sum() {
      mock();
      return this.x + this.y;
    },
  };

  // JSON.stringify は、渡されたオブジェクトに toJSON という名前のメソッドがあると、それを呼び出して、
  // 「その返り値」を JSON の文字列にする(toJSON が無ければ、プロパティをそのまま文字列にする)。
  // 何もしないと sum は関数なので JSON.stringify の出力から消えて {"x":1,"y":2} になってしまう。
  // そこで toJSON を足して、x, y に加えて「sum() を呼んだ結果」を sum として返すオブジェクトを作る。
  //
  // - toString ではなく toJSON(toString は文字列変換用で、JSON.stringify は呼ばない)。
  // - toJSON が呼ばれるのは JSON.stringify(obj) の時点で、すでに obj.x = 1; obj.y = 2; の後なので、
  //   obj.x, obj.y には更新後の値(1, 2)が入っている。
  // - アロー関数の this は obj を指さない(この関数を書いた場所の外側の this になる)ので、
  //   this.x ではなく、同じスコープにある変数 obj を直接参照している。
  // - obj.sum() を「呼ぶ」ことで、中の mock() も実行され、最後の expect(mock).toHaveBeenCalled() が成功する。
  obj.toJSON = () => ({ x: obj.x, y: obj.y, sum: obj.sum() });

  obj.x = 1;
  obj.y = 2;
  expect(JSON.stringify(obj)).toBe(`{"x":1,"y":2,"sum":3}`);
  expect(mock).toHaveBeenCalled();
});
