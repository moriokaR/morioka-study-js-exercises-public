# 問題4.7

対象のコード:

```js
// このような関数は絶対に書いてはならない。
function set42(key) {
  eval(`${key} = 42;`);
}

// 例:
set42("hello");
console.log(hello); // 42
```

## 解答

↓のように、コメントを追加することで、 = 42;以降を無視し、負荷を与えるコードを実行する。

key = " while(true){console.log("hacking")} // "
