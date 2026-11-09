// 問題文の3つの関数を、繰り返し文(for, while)や if 文を使わず、
// map, filter, reduce, forEach 等のメソッドを使って書き直す。
// (三項演算子 ? : や、filter などに渡す条件式は使ってよい)

// fizzbuzz(n): 1 から n までを、3の倍数なら "Fizz"、5の倍数なら "Buzz"、
// 両方の倍数なら "FizzBuzz"、どちらでもなければその数を、1行ずつ表示する。
//
// 処理の流れ(配列を作って、変換して、表示する、の3段階):
//   Array.from(...)  → [1, 2, 3, ..., n]
//   .map(...)        → [1, 2, "Fizz", 4, "Buzz", ...]
//   .forEach(...)    → 1つずつ console.log
export function fizzbuzz(n) {
  // Array.from({ length: n }, 関数) は、長さ n の配列を作り、
  // 各位置に「関数の戻り値」を入れる。
  // 関数の第1引数(_)は使わない値、第2引数(i)が位置(0 始まり)。
  // 欲しいのは 1 始まりなので、本体で i + 1 を返す。
  // (引数の () の中で i - 1 のような計算はできない。計算は本体に書く)
  Array.from({ length: n }, (_, i) => i + 1)
    // map は、配列の各要素を変換して、新しい配列を作る。
    // ここでは、1 始まりの数 m を、三項演算子で出し分ける。
    // 「3と5の両方の倍数」を最初に判定するのがポイント
    // (先に m % 3 === 0 を判定すると、15 が "Fizz" になってしまう)。
    .map((m) =>
      m % 3 === 0 && m % 5 === 0
        ? "FizzBuzz"
        : m % 3 === 0
        ? "Fizz"
        : m % 5 === 0
        ? "Buzz"
        : m,
    )
    // forEach は、各要素に対して処理を行うだけで、値を返さない。
    // 変換後の配列を、1つずつ表示する。
    .forEach((x) => {
      console.log(x);
    });
}

// sumOfSquaredDifference(f, g): 2つの配列 f, g の、同じ位置の差の2乗の合計。
// 例: f = [1, 2, 3], g = [1, 4, 5] なら、(1-1)^2 + (2-4)^2 + (3-5)^2 = 0 + 4 + 4 = 8
//
// reduce は、配列を 1 つの値にまとめるメソッド。
//   reduce((これまでの合計, 要素, 位置) => 次の合計, 合計の初期値)
// ここでは「f の各位置 i について、(f[i] - g[i]) ** 2 を足していく」。
//   - total: これまでの合計(最初は 0)
//   - _:     f の要素そのもの。f[i] で取れるので使わない
//   - i:     位置。f[i] と g[i] を同じ位置で取るために使う
// reduce の戻り値(最後の total)が、そのまま関数の戻り値になる。
export function sumOfSquaredDifference(f, g) {
  return f.reduce((total, _, i) => total + (f[i] - g[i]) ** 2, 0);
}

// sumOfEvensIsLargerThan42(array): 偶数だけを足した合計が、42 以上かを返す。
// (名前は "Larger than 42" だが、元のコードに合わせて 42 以上で判定している)
//
// 処理の流れ:
//   filter(...) → 偶数だけを残した配列にする
//   reduce(...) → その合計を求める(初期値 0 から、要素を順に足す)
//   >= 42       → 合計が 42 以上かを比較して、true / false を返す
export function sumOfEvensIsLargerThan42(array) {
  return (
    array.filter((a) => a % 2 === 0).reduce((total, a) => total + a, 0) >= 42
  );
}
