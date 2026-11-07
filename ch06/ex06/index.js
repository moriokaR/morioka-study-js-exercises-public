// 任意のオブジェクトを受け取り、そのオブジェクトの
// - すべての独自プロパティ(列挙不可、プロパティ名がSymbolのものを含む)
// - および列挙可能な継承プロパティ
// のプロパティ名の配列を返す関数を作成する。
// (継承プロパティについては、Symbolのものは含まれていなくてもよい)

export function getAllPropertyNames(obj) {
  let allPropertyNames = [];

  // for/in は「自分自身の列挙可能なプロパティ」と「継承した列挙可能なプロパティ」の
  // 両方をプロトタイプチェーンを辿りながら拾ってくれる。
  // (Object.keysだと自分自身のものしか取れず、継承したプロパティは拾えない)
  for (const key in obj) {
    allPropertyNames = allPropertyNames.concat(key);
  }

  // Object.getOwnPropertyNames() は、自分自身(own)のプロパティ名を
  // 列挙可能かどうかに関わらず全部(文字列キーのみ)返す。
  // これで「独自プロパティのうち列挙不可なもの」も拾えるようになる。
  allPropertyNames = allPropertyNames.concat(Object.getOwnPropertyNames(obj));

  // Object.getOwnPropertySymbols() は、自分自身(own)のSymbolキーのプロパティを全部返す。
  // for/inもgetOwnPropertyNamesもSymbolキーは対象外なので、これがないとSymbolが漏れる。
  allPropertyNames = allPropertyNames.concat(Object.getOwnPropertySymbols(obj));

  // ここまでの3つの情報源は範囲が重なっている
  // (特に「自分自身の列挙可能なプロパティ」はfor/inとgetOwnPropertyNamesの両方に含まれる)ため、
  // 配列の中に同じプロパティ名が複数回入ってしまっている。
  // Setは同じ値を1つしか持てないコレクションなので、配列 → Set → 配列と変換することで
  // 重複を取り除いている。
  allPropertyNames = [...new Set(allPropertyNames)];

  return allPropertyNames;
}
