// Object.assign() と等価な関数 assign() を作成する。
// 与えられたテスト(index.test.js、問題側から提供されているものなので変更しない)を全てパスすること。

export function assign(target, ...sources) {
  // targetがnull/undefinedの場合はエラーにする。
  // 実際のObject.assign()もここで例外を投げるため、メッセージも実際の挙動に合わせている。
  if (target === null || target === undefined) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  // targetが数値や真偽値などのプリミティブの場合、Object()でラッパーオブジェクトに変換する。
  // (すでにオブジェクトの場合はそのまま返ってくるので、無条件に呼んでよい)
  target = Object(target);

  for (const obj of sources) {
    // sourceがnull/undefinedの場合は、エラーにはせず単にスキップする
    // (Object.assign()の仕様通り。falsyな値全般ではなく、null/undefinedだけを対象にするため
    //  `!obj`ではなく`obj === null || obj === undefined`で判定している)
    if (obj === null || obj === undefined) {
      continue;
    }

    // 文字列キーの、自分自身(own)かつ列挙可能なプロパティをコピーする
    // (Object.keys()は最初から列挙可能なものだけを返してくれる)
    for (const InsertKey of Object.keys(obj)) {
      target[InsertKey] = obj[InsertKey];
    }

    // Symbolキーの、自分自身(own)かつ列挙可能なプロパティをコピーする。
    // Object.getOwnPropertySymbols()は列挙可能かどうかに関わらず全部返すので、
    // 列挙可能なものだけに絞り込む必要がある。
    for (const InsertSymbolKey of Object.getOwnPropertySymbols(obj)) {
      // obj.propertyIsEnumerable(...)のように書くと、objのプロトタイプチェーンを辿って
      // メソッドを探しに行くため、objがObject.create(null)などでObject.prototypeを
      // 継承していない場合、propertyIsEnumerable自体が見つからずエラーになる。
      //
      // Object.prototype.propertyIsEnumerable.call(obj, ...) は、
      // objのプロトタイプチェーンを辿らず、Object.prototypeから直接その関数を取り出し、
      // .call(obj, ...) で「thisをobjにして実行して」と指定して呼び出している。
      // 関数の中身はthisが持つプロパティの状態を調べるだけなので、
      // objがそのメソッドを継承しているかどうかに関係なく安全に動く。
      if (!Object.prototype.propertyIsEnumerable.call(obj, InsertSymbolKey)) {
        continue;
      }
      target[InsertSymbolKey] = obj[InsertSymbolKey];
    }
  }

  return target;
}
