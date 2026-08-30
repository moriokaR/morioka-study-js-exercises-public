結果
PS C:\Users\r23600343\source\repos\morioka-study-js-exercises-public> node ch02/ex07/index.js
0 1 0
1 1 0
PS C:\Users\r23600343\source\repos\morioka-study-js-exercises-public>

理由

後置演算子(++)に改行が入った場合、後置ではないと判断され、その手前で自動的にセミコロンを挿入される為。

一つ目の解釈

const c = a;
++b;

// a: 0, b: 1, c: 0

二つ目の解釈

const e = a++; // 後置なので、代入された後にaに+1
b;

// a: 1, b: 1, e: 0