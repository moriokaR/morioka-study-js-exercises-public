# 問題5.10

## with文とは

`with`文は、指定したオブジェクトのプロパティを、そのブロック内のスコープに追加する構文。
ブロック内で変数名を参照・代入すると、まず「そのオブジェクトが同名のプロパティを持っているか」が優先的に調べられ、
持っていればそのプロパティへのアクセスになり、持っていなければ通常のスコープの変数が使われる。

```js
const obj = { x: 1, y: 2 };
with (obj) {
  console.log(x, y); // obj.x, obj.y と書かなくても x, y だけで参照できる
}
```

この「オブジェクトにプロパティがあるかないかで、変数扱いかプロパティ扱いかが変わる」という挙動が、
コードを読むだけでは判断しづらく、最適化も難しくなる(書いた本人以外にはどちらの意味で使われているか分かりにくい)ため、
`with`文は使うべきではないとされている。

## 実行方法について

`package.json`に`"type": "module"`が指定されているため、`index.js`はES Modules(strict mode)として扱われ、
strict modeでは`with`文が構文エラーになる(`node ch05/ex10/index.js`では実行できない)。
そのため、実行確認には拡張子`.cjs`の一時コピーを作って実行する。

```powershell
Copy-Item ch05\ex10\index.js ch05\ex10\index.cjs; node ch05\ex10\index.cjs; Remove-Item ch05\ex10\index.cjs
```

## ブロック1 (問題文に記載済み)

- console.log の出力: `{ a: 1, b: 2, obj: { a: 4, b: 4 }}`
- with文を使わない場合: `obj.a = obj.b`

## ブロック2 (obj = { b: 4 })

- console.log の出力: `{ a: 4, b: 2, obj: { b: 4 } }`
- with文を使わない場合: `a = obj.b`

## ブロック3 (obj = { a: 3 })

- console.log の出力: `{ a: 1, b: 2, obj: { a: 2 } }`
- with文を使わない場合: `obj.a = b`

## ブロック4 (obj = {})

- console.log の出力: `{ a: 2, b: 2, obj: {} }`
- with文を使わない場合: `a = b`
