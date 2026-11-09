// reduce を使って、次の関数を実装する。
// (配列の繰り返しは reduce で行う。for / while / 他の配列メソッドは使わない)
// テストは、公開されているテスト (index.test.js) を使う。
//
// reduce の基本の形:
//   array.reduce((total, a, i) => 次のtotal, 初期値)
//   - total: これまでの結果(最初は「初期値」)
//   - a:     今見ている要素
//   - i:     今見ている要素の位置(0 始まり)。使わなければ書かなくてよい
//   - 戻り値: 次の要素を見るときの total になる。最後の total が、reduce の結果になる
//   - 空き要素 ([1, , 3] の真ん中)は、reduce が自動で飛ばす
//   - 初期値は「配列が空のときの結果」でもある

// sum(array): 配列の合計を返す。
//   初期値は 0。要素を順に足していく。
//   空配列なら、足す要素がないので、初期値の 0 がそのまま返る。
//   array = [] は、引数なしの sum() で、undefined.reduce(...) のエラーにならないため。
//   (引数が undefined のときだけ、デフォルト値の [] が使われる)
export function sum(array = []) {
  return array.reduce((total, a) => total + a, 0);
}

// join(array, separator): 要素を区切り文字でつないだ文字列を返す。
//   初期値は ""(文字列を作る出発点)。空配列なら "" が返る。
//   区切りは「要素の間」にだけ入れる。i === 0(最初の要素)は区切りなし、
//   2番目以降は「区切り + 要素」を足す。
//   (a ?? "") は、a が null か undefined のとき "" にする。
//   これで join([1, null, 3]) が "1,,3" になる。
//   separator = "," は、省略したとき(undefined)だけ使われる。
//   "" や null を渡したときは、そのまま使われる
//   (join([1, 2, 3], null) は "1null2null3" になる)。
//   array にはデフォルト値を付けない。join() は、エラーになるのが正しい。
export function join(array, separator = ",") {
  return array.reduce(
    (total, a, i) =>
      i === 0
        ? total + (a ?? "").toString()
        : total + separator + (a ?? "").toString(),
    "",
  );
}

// reverse(array): 要素の並びを逆にした、新しい配列を返す。
//   初期値は []。要素を見るたびに、「その要素を、これまでの結果の前に付けた」
//   新しい配列を作る。
//     [1, 2, 3] の場合: [] → [1] → [2, 1] → [3, 2, 1]
//   [a, ...total] は、a を先頭にして、total の要素を後ろに並べた新しい配列。
//   元の配列(array)も、total も書き換えない。
//   (total.unshift(a) だと、total を書き換える上に、戻り値が配列ではなく
//   新しい長さになるので、reduce の「次の total」として使えない)
export function reverse(array) {
  return array.reduce((total, a) => [a, ...total], []);
}

// every(array, predicate): 全部の要素が predicate を満たすなら true を返す。
//   初期値は true。「満たさない要素は、まだ見つかっていない」状態から始める。
//   空配列は、満たさない要素がないので true になる。
//   total && predicate(...) は、「これまでが全部 true で、かつ今の要素も true」。
//   一度 false になると、total が false になり、最後まで false のまま。
//   (&& は、左が false なら右を評価しないので、false になった後は predicate を呼ばない)
//   predicate には (要素, 位置, 配列) を渡す。配列は、コピーではなく、
//   元の array を渡す。コールバックが arr を書き換えても、それが反映される。
export function every(array, predicate) {
  return array.reduce((total, a, i) => total && predicate(a, i, array), true);
}

// some(array, predicate): 1つでも predicate を満たす要素があれば true を返す。
//   初期値は false。「満たす要素は、まだ見つかっていない」状態から始める。
//   空配列は、満たす要素がないので false になる。
//   total || predicate(...) は、「これまでに見つかった、または今の要素が満たす」。
//   一度 true になると、total が true になり、最後まで true のまま。
//   (|| は、左が true なら右を評価しないので、true になった後は predicate を呼ばない)
//   predicate に渡す引数は every と同じ。
//   every とは、初期値(true ↔ false)とつなぎ方(&& ↔ ||)が逆になっている。
export function some(array, predicate) {
  return array.reduce((total, a, i) => total || predicate(a, i, array), false);
}
