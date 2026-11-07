// Object.defineProperty() を使って、writable属性/enumerable属性/configurable属性を
// 明示的に設定したプロパティを定義し、
// そのプロパティの変更、削除、hasOwnPropertyとpropertyIsEnumerableの結果に対して
// どのように影響するか確認する

const obj = {};
Object.defineProperty(obj, "x", {
  value: 1,
  writable: false, // false にすると「書き換え禁止」
  enumerable: false, // false にすると「for-inやObject.keysに出てこない」
  configurable: false, // false にすると「削除禁止・設定の再変更も禁止」
});
Object.defineProperty(obj, "y", {
  value: 1,
  writable: true,
  enumerable: true,
  configurable: true,
});

// writable:false の x を書き換えようとする → strict modeなので例外が投げられる(黙って無視されない)
try {
  obj.x = 2;
} catch {
  console.log("xの書き換え失敗"); // => xの書き換え失敗
}

// writable:true の y は普通に書き換えられる
obj.y = 2;

// x は書き換えに失敗しているので、値は1のまま変わっていないことを確認
console.log(obj.x); // => 1
// y は書き換えに成功しているので、値が2になっていることを確認
console.log(obj.y); // => 2

// enumerable:false の x は Object.keys に出てこず、enumerable:true の y だけが出ることを確認
console.log(Object.keys(obj)); // => [ 'y' ]

// propertyIsEnumerable で、enumerable属性そのものを直接確認する。
// ESLintのno-prototype-builtinsルールは「obj.propertyIsEnumerable(...)のような直接呼び出し」に
// 警告を出す(objがObject.create(null)などでObject.prototypeを継承していない場合、
// このメソッド自体が存在せずエラーになるため)。
// ただしここでのobjはオブジェクトリテラルで作った普通のオブジェクトであり、
// この問題の趣旨自体がpropertyIsEnumerableの直接呼び出しの動作を確認することなので、
// 安全性より読みやすさを優先し、あえて警告を無視してこの書き方のままにしている。
// (6.7のassign()のように、objが「呼び出し側から任意の値を受け取りうる」関数の中で使う場合は、
//  Object.prototype.propertyIsEnumerable.call(obj, ...)のような安全な書き方にする価値がある)
console.log(obj.propertyIsEnumerable("x")); // => false
console.log(obj.propertyIsEnumerable("y")); // => true

// configurable:false の x を削除しようとする → こちらもstrict modeなので例外が投げられる
try {
  delete obj.x;
} catch {
  console.log("xの削除失敗"); // => xの削除失敗
}
// configurable:true の y は普通に削除できる
delete obj.y;

// x は削除に失敗しているので、まだ自身のプロパティとして存在していることを確認
console.log(obj.hasOwnProperty("x")); // => true
// y は削除に成功しているので、もう自身のプロパティとして存在しないことを確認
console.log(obj.hasOwnProperty("y")); // => false
