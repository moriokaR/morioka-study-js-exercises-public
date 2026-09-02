# 問題4.8

```js
if (foo === undefined) { ... }
```

```js
if (foo === void 0) { ... }
```

## 解答

以下はAI (Claude) による調査結果です。

かつて(ES5より前)のJavaScriptでは、`undefined`はグローバルオブジェクトの単なる**書き換え可能なプロパティ**として実装されていた。そのため、以下のように誰か(自分のコードでも、読み込んだ別のスクリプトでも)が`undefined`に別の値を代入してしまうと、`undefined`という名前そのものの意味が壊れてしまうという問題があった。

```js
// 昔の非strictな環境ではこれが可能だった
undefined = "壊れた";
if (foo === undefined) { ... } // fooが本当にundefinedでも一致しなくなる
```

一方`void`演算子は、どんな式に対して使っても必ず本物の`undefined`値を返す、という仕様になっている。そのため`void 0`は、`undefined`という名前がたとえ書き換えられていたとしても影響を受けない、「本物のundefined」を安全に得る手段として使われていた。また、圧縮(minify)後のコードで`void 0`(6文字)が`undefined`(9文字)よりわずかに短い、という副次的な理由もあったようである。

現在このような書き方をしない理由は、ES5以降、グローバルの`undefined`プロパティが `non-writable`(書き換え不可)・`non-configurable`(再定義不可) と規定され、モダンなブラウザ・実行環境では`undefined`を書き換えることが原則できなくなったためである。これにより、`=== undefined`は`=== void 0`と同じくらい安全になり、わざわざ`void 0`を使う実用上のメリットがほぼなくなった。

Sources:

- [undefined - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)
- [Why void 0 Beats undefined in JavaScript Libraries](https://javascript.plainenglish.io/why-void-0-beats-undefined-in-javascript-libraries-cd2885a751a9)
