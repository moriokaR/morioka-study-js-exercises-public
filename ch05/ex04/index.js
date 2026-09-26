// フィボナッチ数列 (初項1, 第2項1) の最初の10個を配列として返す

export function fibonacciWhile() {
  let result = [1, 1];

  while (result.length < 10) {
    result[result.length] =
      result[result.length - 2] + result[result.length - 1];
  }

  return result;
}

export function fibonacciDoWhile() {
  let result = [1, 1];

  do {
    result[result.length] =
      result[result.length - 2] + result[result.length - 1];
  } while (result.length < 10);

  return result;
}

export function fibonacciFor() {
  let result = [1, 1];

  for (let i = 0; i < 8; i++) {
    result[result.length] =
      result[result.length - 2] + result[result.length - 1];
  }

  return result;
}
