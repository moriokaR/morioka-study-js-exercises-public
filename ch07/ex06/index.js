// 問題7.4 のデータを math の点数が高い順にソートする。
// ただし、math が同点数の場合は chemistry の点数が高い順に、
// さらに同点数の場合は geography の点数が高い順にソートされること。
const data = [
  { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
  { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
  { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
  { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
  { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
  { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
  { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
  { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
  { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

// data を、math の高い順に並べ替える(同点なら chemistry、さらに同点なら geography の高い順)。
//
// sort の compare 関数は、2つの要素 a, b を受け取り、数を返す。
//   負の数: a を b の前に置く / 正の数: a を b の後ろに置く / 0: 同順(同点)
// 「高い順」にするには、b - a の形(b が大きいほど正の数になり、a が後ろに行く)。
//
// 同点のときだけ次の項目で比べるために、差を || でつなぐ。
//   b.math - a.math               ... math の差。同点なら 0
//   || b.chemistry - a.chemistry  ... 左が 0(偽)のときだけ、chemistry の差を使う
//   || b.geography - a.geography  ... それも 0 のときだけ、geography の差を使う
// (a.math > b.math のような比較は true / false を返すだけで、負の数が出ないので、
// compare としては使えない。差(数)を返すこと)
//
// sort は、元の配列(data)を書き換える。ここでは data を並べ替えた形でしか
// 使わないので問題ないが、元の順番を残したいときは [...data].sort(...) にする。
data.sort(
  (a, b) =>
    b.math - a.math || b.chemistry - a.chemistry || b.geography - a.geography,
);

// 並べ替えた順に、name を表示する。
for (let i = 0; i < data.length; i++) {
  console.log(data[i].name);
}
// => Frank, Justin, Carol, Isaac, Mallet, Ellen, Bob, Dave, Alice
//    (1行ずつ表示される。Carol と Isaac は math が同点で chemistry の高い Carol が前、
//     Mallet と Ellen は math と chemistry が同点で geography の高い Mallet が前)
