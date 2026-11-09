// 挿入ソート以外のソート関数を実装する。
// 引数は sort(array, compare) の形で、問題文の挿入ソートと同じにする。
// (compare を省略したときの既定: (lhs, rhs) => (lhs < rhs ? -1 : lhs > rhs ? +1 : 0))
// 時間計算量の説明は index.md に書く。

// sort(array, compare): バブルソートで array を並べ替える。
//   「隣り合う2つを比べて、順番が逆なら入れ替える」を、配列の端まで繰り返す。
//   1回通す(内側のループ)と、そのとき一番後ろに来るべき値が末尾に移動する。
//   これを array.length 回(外側のループ)繰り返すと、全体が並ぶ。
//
// compare は「2つの要素 lhs, rhs を受け取り、どちらを先にするかを数で返す関数」。
//   負の数: lhs を rhs の前に置く / 正の数: lhs を rhs の後ろに置く / 0: 同順
//   省略したときは、<, > で比べるので、数でも文字列でも小さい順(辞書順)に並ぶ。
//   (lhs - rhs だと、文字列では NaN になって並ばない)
//
// 引数の array を直接書き換えて(破壊的に)、その array を返す。
export function sort(
  array,
  compare = (lhs, rhs) => (lhs < rhs ? -1 : lhs > rhs ? +1 : 0),
) {
  // 外側のループ: 「1回通す」を繰り返す。ここでは i は数えるだけで、中では使わない。
  for (let i = 0; i < array.length; i++) {
    // 内側のループ: 先頭から順に、隣り合う2つを比べる。
    // array[j + 1] が配列の外に出ないように、j は array.length - 2 まで。
    for (let j = 0; j < array.length - 1; j++) {
      // 隣り合う array[j] と array[j + 1] を比べて、順番が逆なら入れ替える
      const a = array[j];
      const b = array[j + 1];
      // compare が正の数のときだけ入れ替える。
      // (if (compare(a, b)) だと、負の数も true になって、毎回入れ替わってしまう)
      if (compare(a, b) > 0) {
        array[j + 1] = a;
        array[j] = b;
      }
    }
  }
  return array;
}
