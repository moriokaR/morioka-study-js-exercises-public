export const fib = (i) => {
  if (i <= 1) {
    return i;
  } else {
    return fib(i - 1) + fib(i - 2);
  }
};

// 以下、fibFast は AI (Claude) が生成しました。
// 元の fib はそのまま単純な再帰の実装として残しています。
// fibFast は「計算済みの値をキャッシュ (メモ化) する」ことで、
// 同じ引数に対する再計算を防ぎ、fib(75) のような大きな値も高速に計算できるようにしています。
export const fibFast = (i, memo = new Map()) => {
  if (i <= 1) {
    return i;
  }
  if (memo.has(i)) {
    return memo.get(i);
  }
  const result = fibFast(i - 1, memo) + fibFast(i - 2, memo);
  memo.set(i, result);
  return result;
};
