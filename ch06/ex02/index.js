// オブジェクトリテラルで独自プロパティを持つオブジェクトを定義し、
// Object.create を使用してそのオブジェクトをプロトタイプとして持つ新しいオブジェクトを生成する
// Object.getPrototypeOf() を利用して、生成したオブジェクトのプロトタイプが
// Object.create で渡したオブジェクトになっていることを確認する

// parent: 独自プロパティ(test)を持つ、普通のオブジェクトリテラル
const parent = { test: "hello" };

// Object.create(parent) は、「parentをプロトタイプとして持つ、新しい空のオブジェクト」を作る。
// child自身はプロパティを何も持っていない(独自プロパティは1つもない)。
const child = Object.create(parent);

// childは自分自身ではtestプロパティを持っていないが、
// プロパティを探すときにJSは「自分にないなら、プロトタイプ(親)を見に行く」という動きをするため、
// child.test と書くと、プロトタイプであるparentのtestプロパティ("hello")が見つかって返ってくる。
console.log(child.test); // => hello

// Object.getPrototypeOf(child) は、childのプロトタイプ(親)が何かを取得するメソッド。
// child は Object.create(parent) で作ったので、そのプロトタイプは当然parent自身のはず。
// ===で比較することで、「本当にparentと同一のオブジェクトになっているか」(コピーではないか)を確認できる。
console.log(Object.getPrototypeOf(child) === parent); // => true
