// push/pop/shift/unshift/sort の非破壊的版関数を書く。
// 各関数は、元の配列を変更せず、変更後の新しい配列を返す。
//
// 標準の push/pop/shift/unshift/sort は、元の配列を書き換える(破壊的)。
// ここでは、次の2つの方法で、元の配列に触らずに、新しい配列を作る。
//   - スプレッド構文 [...array]: array の要素を並べた、新しい配列を作る
//   - slice(開始, 終了): array の一部を取り出した、新しい配列を返す(元は変更しない)
// ([a, b] のように書くと、array が入れ子の1つの要素になるので、
// 「要素を並べる」ときは ...array と書く)

// pop(array): 末尾を取り除いた、新しい配列を返す。
//   slice(0, array.length - 1) は、「0番目から、最後の1つ手前まで」。
//   例: [1, 2, 3, 4, 5] なら slice(0, 4) で [1, 2, 3, 4]。
//   空配列や要素が1つの配列でも、空配列が返る。
export function pop(array) {
  return array.slice(0, array.length - 1);
}

// push(array, value): 末尾に value を追加した、新しい配列を返す。
//   [...array, value] は、array の要素を並べて、その後ろに value を置く。
export function push(array, value) {
  return [...array, value];
}

// shift(array): 先頭を取り除いた、新しい配列を返す。
//   slice(1, array.length) は、「1番目から、最後まで」。
//   (終了位置は省略できるので、slice(1) と書いても同じ)
export function shift(array) {
  return array.slice(1, array.length);
}

// unshift(array, value): 先頭に value を追加した、新しい配列を返す。
//   [value, ...array] は、value を先頭に置いて、その後ろに array の要素を並べる。
//   push とは、value と ...array の順番が逆になっているだけ。
export function unshift(array, value) {
  return [value, ...array];
}

// sort(array, compare): 並べ替えた、新しい配列を返す。
//   標準の array.sort(...) は、元の配列を書き換えてしまう。
//   そこで、先に [...array] でコピーを作り、そのコピーを sort する。
//   compare は「2つの要素 a, b を受け取り、どちらを先にするかを数で返す関数」。
//     負の数: a を b の前に置く / 正の数: a を b の後ろに置く / 0: そのまま
//     例: (a, b) => b - a なら、大きい順になる。
//   この関数の中では compare を自分で呼ばず、受け取ったものを、そのまま
//   標準の sort に渡す。sort が、必要なだけ compare を呼んで、並べ替える。
export function sort(array, compare) {
  return [...array].sort(compare);
}
