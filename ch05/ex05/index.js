// 値が数値のプロパティを持つオブジェクトを引数に取り、偶数の値を持つプロパティだけを残した新しいオブジェクトを返す
// (元のオブジェクトは変更しない)

export function filterEvenProps(o) {
  // result自体は再代入しない(プロパティを追加・変更するだけ)ので const でよい
  const result = {};

  // Object.keys(o) で o のプロパティ名を文字列の配列として取り出し、1つずつ key に代入して処理する
  for (const key of Object.keys(o)) {
    // o[key] は key に入っている文字列をプロパティ名として使い、o からその値を取り出す(ブラケット記法)
    if (o[key] % 2 === 0) {
      // 偶数のときだけ、result にも同じキー名で値をコピーする
      // (result.key と書くと変数keyの中身ではなく、文字通り"key"という名前のプロパティになってしまうので注意)
      result[key] = o[key];
    }
  }

  return result;
}
