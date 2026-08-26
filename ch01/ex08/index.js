/**
 * 標準入力からテキストを読み込み、文字の出現頻度ヒストグラムを表示するプログラム。
 *
 * 実行例:
 *   # Windows PowerShell
 *   # (catはUTF-8として読み込むよう -Encoding UTF8 を指定するのがポイント)
 *   $OutputEncoding = [System.Text.Encoding]::UTF8
 *   cat -Encoding UTF8 ch01/ex08/rashomon_utf8.txt | node ch01/ex08/index.js
 */

// Mapを継承し、存在しないキーを取得したときに undefined ではなく
// 指定したデフォルト値を返すようにしたクラス
class DefaultMap extends Map {
  constructor(defaultValue) {
    super(); // Mapのコンストラクタを呼ぶ
    this.defaultValue = defaultValue; // デフォルト値を覚えておく
  }

  get(key) {
    if (this.has(key)) {
      // すでにキーがあれば、Map本来のgetの結果を返す
      return super.get(key);
    } else {
      // キーが無ければデフォルト値を返す(undefinedにしない)
      return this.defaultValue;
    }
  }
}

class Histogram {
  constructor() {
    this.letterCounts = new DefaultMap(0); // 文字ごとの出現回数(初期値0)
    this.totalLetters = 0; // これまでに数えた文字の総数
  }

  add(text) {
    // 空白を取り除き、大文字・小文字を区別しないよう大文字に揃える
    text = text.replace(/\s/g, "").toUpperCase();
    for (let character of text) {
      let count = this.letterCounts.get(character); // その文字の今までの出現回数
      this.letterCounts.set(character, count + 1); // 1増やして保存
      this.totalLetters++;
    }
  }

  toString() {
    let entries = [...this.letterCounts];

    // [文字, 出現回数]の配列
    // sortは戻り値が正の数で入れ替え、負の数はそのまま
    // 出現回数(a[1], b[1])が同じなら、アルファベット順に並べる
    entries.sort((a, b) => {
      if (a[1] === b[1]) {
        // aの文字がbより前ならaを先に、そうでなければbを先にする
        return a[0] < b[0] ? -1 : 1;
      } else {
        // 出現回数が多い方を先にする(降順)
        return b[1] - a[1];
      }
    });

    // %変換
    for (let entry of entries) {
      entry[1] = (entry[1] / this.totalLetters) * 100;
    }

    // 1%未満を除外
    entries = entries.filter((entry) => entry[1] >= 1);

    //各行を文字列に整形
    let lines = entries.map(
      ([l, n]) => `${l}: ${"#".repeat(Math.round(n))} ${n.toFixed(2)}%`,
    );

    // 各行を改行でつなげて1つの文字列にして返す
    return lines.join("\n");
  }
}

// 標準入力を最後まで読み込み、Histogramを組み立てて返す非同期関数
async function histogramFromStdin() {
  // バイト列ではなくUTF-8の文字列として読み込む設定
  process.stdin.setEncoding("utf-8");
  let histogram = new Histogram();
  // 標準入力は一度に全部届くとは限らないので、
  // 届いたかたまり(chunk)ごとに繰り返しhistogramへ追加していく
  for await (let chunk of process.stdin) {
    histogram.add(chunk);
  }
  return histogram; // 入力が終わったら完成したhistogramを返す
}

// プログラムの起点: 標準入力を読み終えたら、結果を文字列にして表示する
histogramFromStdin().then((histogram) => {
  console.log(histogram.toString());
});
