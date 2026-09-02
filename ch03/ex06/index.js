export function slice(str, indexStart = 0, indexEnd = str.length) {
  // 大きすぎる値(Infinityや文字列長を超える値)は、文字列の長さにクランプする
  indexStart = Math.min(str.length, indexStart);
  indexEnd = Math.min(str.length, indexEnd);

  // 小数が渡された場合は、整数部分だけを使う
  indexStart = Math.trunc(indexStart);
  indexEnd = Math.trunc(indexEnd);

  // NaNは自分自身とも等しくないという性質を持つため、=== NaN はダメ
  if (Number.isNaN(indexStart)) {
    // NaNは0として扱う
    indexStart = 0;
  } else if (indexStart < 0) {
    // 負の数は「末尾から数えた位置」として扱う。それでも負なら0にクランプする
    indexStart = Math.max(0, indexStart + str.length);
  }

  if (Number.isNaN(indexEnd)) {
    // NaNは0として扱う
    indexEnd = 0;
  } else if (indexEnd < 0) {
    // 負の数は「末尾から数えた位置」として扱う。それでも負なら0にクランプする
    indexEnd = Math.max(0, indexEnd + str.length);
  }

  // indexStartからindexEndの手前まで、1文字ずつ取り出して繋げる
  // (indexStart >= indexEndの場合はループが1回も回らず、空文字列になる)
  let result = "";
  for (let i = 0; i < indexEnd - indexStart; i++) {
    result += str[indexStart + i];
  }
  return result;
}
