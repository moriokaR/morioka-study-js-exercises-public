// 固定長配列を返す関数 makeFixedSizeArray を使って、動的配列 DynamicSizeArray を作る。
// (makeFixedSizeArray は問題文で与えられたもの。変更しない)
// ヒント: push の中で、固定長配列に空きが無い場合は、倍サイズの固定長配列を作って、要素をコピーする(再配置)。
//
// ■ 全体のイメージ
//   固定長配列 ... 「4マスの棚」のようなもの。マスの数は、作った時点で決まっていて、あとから増やせない。
//   動的配列   ... 棚がいっぱいになったら、「倍の大きさ(8マス)の、新しい棚」に買い替えて、
//                  古い棚の中身を、新しい棚に移してから、続きを入れる。
//   こうすると、使う側からは、「いくつでも push できる配列」に見える。
//   JavaScript の本物の配列(Array)も、内部で似たことをしている。
//
// ■ DynamicSizeArray が持っている2つの値(constructor で作る)
//   this.array ... 今使っている固定長配列(棚)。makeFixedSizeArray が返した、オブジェクト。
//                  普通の配列ではないので、array[i] ではなく、array.get(i) / array.set(i, v) で読み書きする。
//   this.len   ... 実際に入っている要素の数。
//   ※ this.len と、this.array.length()(棚のマスの数)は、別の値。
//     たとえば、4マスの棚に 2つ入っていれば、this.len は 2、this.array.length() は 4。
//     「棚の何番目まで使っているか」が this.len で、「棚の大きさ」が this.array.length()。

// 固定長の配列を返す(問題文で与えられたもの)。
//   size マスの配列を、外から見えない変数 array に作って、
//   それを読み書きする3つのメソッド(get, set, length)を持つオブジェクトを返す。
//   範囲外(0 未満、または size 以上)の get / set は、エラーになる。
//   マスの数 (size) は、あとから変えられない。
function makeFixedSizeArray(size) {
  const array = new Array(size);
  return {
    get(index) {
      if (index < 0 || array.length <= index) {
        throw new Error(`Array index out of range: ${index}`);
      }
      return array[index];
    },
    set(index, value) {
      if (index < 0 || array.length <= index) {
        throw new Error(`Array index out of range: ${index}`);
      }
      array[index] = value;
    },
    length() {
      return array.length;
    },
  };
}

export class DynamicSizeArray {
  static INITIAL_SIZE = 4; // 初期サイズ

  constructor() {
    this.len = 0;
    this.array = makeFixedSizeArray(DynamicSizeArray.INITIAL_SIZE);
  }

  // length(): 実際に入っている要素の数を返す。
  //   棚のマスの数 (this.array.length()) ではなく、this.len を返す。
  //   (4マスの棚に 2つ入っていれば、2 を返す)
  length() {
    return this.len;
  }

  // get(index): index 番目の要素を返す。
  //   範囲外の判定は、this.array.length()(棚の大きさ)ではなく、this.len(入っている数)で行う。
  //   理由: 棚の大きさの範囲内でも、まだ何も入れていないマスは、「要素」ではないから。
  //     例: 4マスの棚に 2つ入っているとき、get(3) は、棚の中だが、要素が無いので、エラーにする。
  //   範囲内なら、棚 (this.array) の get に任せる。
  get(index) {
    if (index < 0 || this.len <= index) {
      throw new Error(`Array index out of range: ${index}`);
    }
    return this.array.get(index);
  }

  // set(index, value): index 番目の要素を、value に書き換える。
  //   範囲外の判定は get と同じ(this.len で行う)。
  //   これは「すでにある要素の書き換え」用。新しく追加するときは、push を使う。
  //   (this.len を超えた位置に set できてしまうと、length() と中身がずれるため、エラーにする)
  set(index, value) {
    if (index < 0 || this.len <= index) {
      throw new Error(`Array index out of range: ${index}`);
    }
    this.array.set(index, value);
  }

  // push(value): 末尾に value を追加する。
  //   やることは2段階。
  //   1. 棚がいっぱいなら、倍の大きさの新しい棚に買い替える(再配置)。
  //   2. 末尾に value を書いて、要素数を 1 増やす。
  //
  //   例: 初期サイズ 4 で、5つ目を push するとき
  //     this.len は 4、this.array.length() も 4 なので、「いっぱい」(this.len >= this.array.length())。
  //     → 8マスの新しい棚を作り、古い棚の 4つの要素を、新しい棚の同じ位置にコピーする。
  //     → 新しい棚の 4番目 (this.len の位置)に、5つ目の value を書く。this.len は 5 になる。
  //     棚の大きさは、4 → 8 → 16 → 32 ... と、倍々に増えていく。
  push(value) {
    // 空きが無いときだけ、再配置する
    if (this.len >= this.array.length()) {
      // 古い棚を、変数 old に取っておく(this.array を新しい棚に差し替えるため)
      const old = this.array;
      // 倍の大きさの新しい棚を作って、this.array に差し替える
      this.array = makeFixedSizeArray(old.length() * 2);
      // 古い棚 (old) の、入っている要素 (this.len 個) を、新しい棚にコピーする。
      //   ・コピーする数は this.len 個。(old.length() ではなく、this.len にする。
      //     棚の大きさ INITIAL_SIZE でもない。2回目以降の再配置では、INITIAL_SIZE より多く入っているため)
      //   ・old は普通の配列ではないので、old[i] ではなく、old.get(i) で読む。
      //   ・この時点では this.len は、まだ増やしていない(今ある要素の数のまま)。
      for (let i = 0; i < this.len; i++) {
        this.array.set(i, old.get(i));
      }
    }

    // 末尾 (this.len の位置) に value を書いて、要素数を 1 増やす。
    //   書く → 増やす の順番にする。(先に増やすと、書く位置が 1 つずれる)
    this.array.set(this.len, value);
    this.len++;
  }
}
