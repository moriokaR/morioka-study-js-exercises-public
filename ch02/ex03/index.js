// 1問目 パ

console.log("パ".normalize("NFC")); // パ (1文字として保持)
console.log("パ".normalize("NFD")); // パ (見た目は同じだが、内部的には ハ + ゜ 結合文字の2文字)


console.log("NFC:");
for (const ch of "パ".normalize("NFC")) {
    // ch(1文字)と、そのコードポイントを16進数にした文字列を表示する
    console.log(ch, ch.codePointAt(0).toString(16));
}
console.log("NFC: \u30d1");

console.log("NFD:");
for (const ch of "パ".normalize("NFD")) {
    // ch(1文字)と、そのコードポイントを16進数にした文字列を表示する
    console.log(ch, ch.codePointAt(0).toString(16));
}
console.log("NFD: \u30cf\u309a");