export function bitCount(n) {
  let count = 0;

  // 32ビット分、右端のビットを順番に見ていく
  for (let i = 0; i < 32; i++) {
    // nの一番右のビットが1か0かを取り出して加算する
    count += n & 1;
    // 全体を1ビット右にずらし、次のビットを一番右に持ってくる (符号なしシフトなので左端は0埋め)
    n = n >>> 1;
  }

  return count;
}
