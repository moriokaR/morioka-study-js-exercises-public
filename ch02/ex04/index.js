// 文字コード調べる

const str = "Hello,World";
for (const ch of str) {
  console.log(ch, ch.charCodeAt(0).toString(16).padStart(4, "0"));
}

// 出力

console.log(
  "\u0048\u0065\u006c\u006c\u006f\u002c\u0057\u006f\u0072\u006c\u0064",
);
