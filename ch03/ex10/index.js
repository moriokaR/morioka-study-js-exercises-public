// 1. 同じ文字列から Symbol() を2回呼び出す
const symbol1 = Symbol("key");
const symbol2 = Symbol("key");

// 2. その2つのSymbolをキーにしたオブジェクトを作る
const obj = { [symbol1]: "1", [symbol2]: "2" };

// 3. 作成したSymbol変数を使って、それぞれの値を取り出してconsole.logする
console.log(obj[symbol1]);
console.log(obj[symbol2]);

// 4. Symbol.for() で同じ文字列から2回呼び出し、=== で比較した結果をconsole.logする
const symbol3 = Symbol.for("globalKey");
const symbol4 = Symbol.for("globalKey");

console.log(symbol3 === symbol4);
