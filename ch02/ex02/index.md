# 問題2.2: `$` や `_` を変数名として利用するライブラリ

以下はAI (Claude) による調査結果です。

## `$` を使うライブラリ・慣習

| ライブラリ / 慣習 | `$` の使われ方 |
| --- | --- |
| Prototype.js | `$('id')` を `document.getElementById('id')` の短縮形として定義（2005年、この手法の元祖） |
| jQuery | `jQuery` オブジェクト（関数）そのものの別名。`$()` と `jQuery()` は同じもの |
| RxJS / Angular（フィンランド記法） | Observable型の変数名の末尾に `$` を付ける慣習（例: `click$`）。一目でObservableだとわかるようにする目的 |

- jQueryは他ライブラリとの `$` の衝突を避けるため、`jQuery.noConflict()` で割り当てを解除できる機能を持つ。
- 「フィンランド記法」の名付け親はAndre Staltz（本人がフィンランド出身であることに由来する洒落）。RxJSコア開発者のBen Leshが解説記事を書いている。ただし「絶対のルールではなく好みの範囲」という位置づけ。

## `_` を使うライブラリ

| ライブラリ | `_` の使われ方 |
| --- | --- |
| Underscore.js | ライブラリの名前空間オブジェクトそのものが `_`。`_.map(...)` のように使う |
| Lodash | Underscore.jsからフォークされた後継ライブラリ。同じく `_` を名前空間として使用（`_.debounce(...)` など） |

## まとめ（共通する動機）

1. **短く書ける** — 頻繁に使う関数・オブジェクトを1文字でアクセスできるようにする。
2. **衝突しにくい記号を使うことで目立たせる** — 通常の英数字の変数名の中で `$` や `_` は視覚的に浮くため、「ここがライブラリの入口/特別な意味を持つ変数」だと一目でわかる。

## 参考ソース

- [The Javascript Dollar Sign ($) Function](https://osric.com/chris/accidental-developer/2008/04/the-javascript-dollar-sign-function/)（Prototype.jsの歴史）
- [jQuery 公式ドキュメント](https://api.jquery.com/jquery/)（`$` = `jQuery` のエイリアス）
- [Observables and Finnish Notation](https://benlesh.medium.com/observables-and-finnish-notation-df8356ed1c9b)（Ben Lesh、RxJSのフィンランド記法解説）
