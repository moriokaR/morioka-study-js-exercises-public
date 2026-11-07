// p.149 冒頭のコードと同じ継承関係とプロパティを持つオブジェクトを用意する。
// o, p, q の関係: p は o を継承し、q は p を継承する(プロトタイプチェーン: q → p → o → Object.prototype)。
const o = {};
o.x = 1; // o の独自プロパティ x
const p = Object.create(o);
p.y = 2; // p の独自プロパティ y(x は o から継承)
const q = Object.create(p);
q.z = 3; // q の独自プロパティ z(x, y は継承)

// ---- p.149 の o, p, q の確認 ----

// o が p のプロトタイプチェーン上に存在することを確認
console.log(
  "o が p のプロトタイプチェーン上に存在する：" +
    Object.prototype.isPrototypeOf.call(o, p),
); // => true
// o が q のプロトタイプチェーン上に存在することを確認
console.log(
  "o が q のプロトタイプチェーン上に存在する：" +
    Object.prototype.isPrototypeOf.call(o, q),
); // => true
// p が q のプロトタイプチェーン上に存在することを確認
console.log(
  "p が q のプロトタイプチェーン上に存在する：" +
    Object.prototype.isPrototypeOf.call(p, q),
); // => true

// ---- Object, Array, Date, Map の継承関係の確認 ----

// Object.prototype, Array.prototype, Date.prototype, Map.prototype の全ての組み合わせ(祖先 → 子孫の向き)を確認する。
// 各 console.log は「祖先.prototype が 子孫.prototype のプロトタイプチェーン上に存在するか」を確認している。

// 祖先が Object.prototype の場合
console.log(
  "Object.prototype が Array.prototype のプロトタイプチェーン上に存在する：" +
    Object.prototype.isPrototypeOf.call(Object.prototype, Array.prototype),
); // => true

console.log(
  "Object.prototype が Date.prototype のプロトタイプチェーン上に存在する：" +
    Object.prototype.isPrototypeOf.call(Object.prototype, Date.prototype),
); // => true

console.log(
  "Object.prototype が Map.prototype のプロトタイプチェーン上に存在する：" +
    Object.prototype.isPrototypeOf.call(Object.prototype, Map.prototype),
); // => true

// 祖先が Array.prototype の場合
console.log(
  "Array.prototype が Object.prototype のプロトタイプチェーン上に存在する：" +
    Object.prototype.isPrototypeOf.call(Array.prototype, Object.prototype),
); // => false

console.log(
  "Array.prototype が Date.prototype のプロトタイプチェーン上に存在する：" +
    Object.prototype.isPrototypeOf.call(Array.prototype, Date.prototype),
); // => false

console.log(
  "Array.prototype が Map.prototype のプロトタイプチェーン上に存在する：" +
    Object.prototype.isPrototypeOf.call(Array.prototype, Map.prototype),
); // => false

// 祖先が Date.prototype の場合
console.log(
  "Date.prototype が Object.prototype のプロトタイプチェーン上に存在する：" +
    Object.prototype.isPrototypeOf.call(Date.prototype, Object.prototype),
); // => false

console.log(
  "Date.prototype が Array.prototype のプロトタイプチェーン上に存在する：" +
    Object.prototype.isPrototypeOf.call(Date.prototype, Array.prototype),
); // => false

console.log(
  "Date.prototype が Map.prototype のプロトタイプチェーン上に存在する：" +
    Object.prototype.isPrototypeOf.call(Date.prototype, Map.prototype),
); // => false

// 祖先が Map.prototype の場合
console.log(
  "Map.prototype が Object.prototype のプロトタイプチェーン上に存在する：" +
    Object.prototype.isPrototypeOf.call(Map.prototype, Object.prototype),
); // => false

console.log(
  "Map.prototype が Array.prototype のプロトタイプチェーン上に存在する：" +
    Object.prototype.isPrototypeOf.call(Map.prototype, Array.prototype),
); // => false

console.log(
  "Map.prototype が Date.prototype のプロトタイプチェーン上に存在する：" +
    Object.prototype.isPrototypeOf.call(Map.prototype, Date.prototype),
); // => false
