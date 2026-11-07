// p.157下部のテンプレートオブジェクトに存在しないプロパティをあるオブジェクトから削除する restrict()、
// あるオブジェクトのプロパティを別のオブジェクトから削除する substract() を実装する。
// Symbolと継承プロパティは考慮しなくてよい。
// 与えられたテスト(index.test.js、問題側から提供されているものなので変更しない)を全てパスすること。

// target: 削除先オブジェクト。テンプレートオブジェクトに存在しない独自プロパティを削除する。
// template: テンプレートオブジェクト。独自プロパティのみが存在判定の対象。
// 返値: targetそのもの(削除後)
//
// 例:
//   const target = { a: 1, b: 2, c: 3 };
//   const template = { a: "何でもいい", c: "何でもいい" }; // 名前だけが重要、値は関係ない
//   restrict(target, template);
//   // targetは { a: 1, c: 3 } になる(bはtemplateに無いので削除される)
export function restrict(target, template) {
  // target のプロパティ名を1つずつ targetKey に入れて調べる。
  // (for...in は継承プロパティも列挙するが、継承プロパティは target 自身の物ではないので、
  //  delete しても何も起きず、問題文の「継承プロパティは削除対象外」を満たす)
  // 列挙しながら delete しても、まだ見ていないプロパティが飛ばされることはない。
  for (const targetKey in target) {
    // template が targetKey を「自分自身のプロパティ(独自プロパティ)」として持っているかを調べる。
    // - in 演算子や template[targetKey] で調べると継承プロパティまで「ある」扱いになってしまうため、
    //   「独自プロパティのみを存在判定の対象にする」という問題文の指定に合わない。
    // - template.hasOwnProperty(...) と直接書かず .call を使うのは、Object.create(null) で作った
    //   オブジェクトには hasOwnProperty が継承されておらず呼べないため(ESLint no-prototype-builtins の指摘)。
    if (!Object.prototype.hasOwnProperty.call(template, targetKey)) {
      // template に無いプロパティなので target から削除する。
      // targetKey は変数に入った名前なので、ドット記法ではなくブラケット記法 [ ] を使う。
      delete target[targetKey];
    }
  }

  // 新しいオブジェクトではなく、削除後の target そのものを返す(問題文の指定)。
  return target;
}

// target: 削除先オブジェクト
// sources: 削除対象指定オブジェクト(単数または複数)。ここにある独自プロパティをtargetから削除する。
// 返値: targetそのもの(削除後)
//
// 例:
//   const target = { a: 1, b: 2, c: 3 };
//   const source = { a: "何でもいい" }; // 名前だけが重要、値は関係ない
//   substract(target, source);
//   // targetは { b: 2, c: 3 } になる(aはsourceにあるので削除される)
//
//   複数sourcesの場合は、どちらかに存在すれば削除される:
//   substract({ a: 1, b: 2, c: 3 }, { a: "x" }, { b: "x" });
//   // => { c: 3 }
export function substract(target, ...sources) {
  // ...sources は「2つ目以降の引数」が配列にまとまったもの(例: substract(t, {a:1}, {b:2}) なら [{a:1}, {b:2}])。
  // 配列の「中身(オブジェクト)」を取り出したいので for...of を使う。
  // (for...in を配列に使うと "0", "1" というインデックス文字列が取れてしまい、オブジェクトにならない)
  for (const source of sources) {
    // Object.keys は、そのオブジェクト自身の独自プロパティ名だけを配列で返す。
    // for...in と違って継承プロパティを含まないので、「sources の継承プロパティは削除対象にならない」を
    // 判定の if を書かなくても満たせる。(Symbol も返さないので、Symbol は削除対象外という指定にも合う)
    for (const key of Object.keys(source)) {
      // restrict と違って「消すか残すか」の分岐は無い。source に書かれた名前は全部消す。
      // delete は target にそのキーが無くてもエラーにならず何も起きない(継承プロパティも同様)ので、
      // 「target に存在するか」を先に調べる必要もない。
      delete target[key];
    }
  }

  // 新しいオブジェクトではなく、削除後の target そのものを返す(問題文の指定)。
  return target;
}
