# 問題5.7

## 出力の予想

false

## 実際の実行結果

PS C:\Users\r23600343\source\repos\morioka-study-js-exercises-public> node ch05/ex07/index.js
false

## 理由

finally内にてreturnがあると、tryやcatchのreturnの結果より優先される為。
