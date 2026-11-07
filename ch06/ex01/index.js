// 文字列をハッシュ値(数値)に変換するハッシュ関数
export function hash(str) {
  let hashStr = 0;

  // 1文字ずつ、文字コード(charCodeAt)に「何文字目か(i + 1)」を掛けてから合計する。
  // 単純に文字コードを足すだけだと、文字の並び順が違っても合計は同じになってしまう
  // (例: "ab"と"ba"が同じハッシュ値になる)。
  // 文字ごとに違う重み(i + 1)を掛けることで、同じ文字の組み合わせでも並び順が違えば
  // 別のハッシュ値になるようにしている。
  // 重みを i そのものではなく (i + 1) にしているのは、i(=0始まりの配列インデックス)を
  // そのまま掛けると、1文字目(i = 0)のときに必ず0倍されて消えてしまい、
  // 先頭の文字がハッシュ値に反映されなくなってしまうため。
  for (let i = 0; i < str.length; i++) {
    hashStr += str[i].charCodeAt(0) * (i + 1);
  }

  return hashStr;
}

// ハッシュ関数を用いて文字列から値へのマッピングを行うハッシュテーブル
export function newHashTable(capacity) {
  return {
    size: 0,
    entries: new Array(capacity),
    get(key) {
      // keyのハッシュ値を配列のサイズ(capacity)で剰余演算し、格納先のインデックスを求める
      // (putで格納したときと同じ計算をすることで、同じ位置にたどり着ける)
      const num = hash(key) % capacity;

      if (this.entries[num] === undefined) {
        // その位置に何も格納されていなければ、マッピングは存在しない
        return;
      }

      return findInChain(this.entries[num]);

      function findInChain(node) {
        if (node.key === key) {
          // keyが一致するノードが見つかったら、そのvalueを返す
          return node.value;
        }
        if (!node.next) {
          // next が undefined ならリストの末尾まで探しても見つからなかった、ということ
          return;
        }
        // 一致もせず末尾でもなければ、次のノード(node.next)に対して同じ処理をもう一度試す(再帰)
        // findInChainの戻り値をそのままreturnして、再帰の奥で見つかったvalueを呼び出し元まで伝える
        return findInChain(node.next);
      }
    },
    put(key, value) {
      // アロー関数にしている理由:
      // 通常の function だと、addSize() のように「オブジェクトのメソッドとしてではなく、
      // ただの関数として」呼び出したとき、内部の this が put の呼び出し元(このハッシュテーブル自身)を
      // 指してくれず、undefined になってしまう(strict modeのため)。
      // アロー関数は自分自身の this を持たず、定義された場所(put の中)の this をそのまま引き継ぐので、
      // addSize がどこでどう呼ばれても this.size が正しくこのオブジェクトを指す。
      const addSize = () => {
        this.size++;
      };

      // keyのハッシュ値を配列のサイズ(capacity)で剰余演算し、格納先のインデックスを求める
      const num = hash(key) % capacity;

      if (this.entries[num] === undefined) {
        // その位置にまだ何もなければ、新しいノードを作ってそのまま格納する
        this.entries[num] = { key: key, value: value };
        addSize();
        return;
      }

      // 既に何か入っている場合(衝突)は、連結リストを末尾まで辿って
      // 同じkeyがあれば上書き、なければ末尾に新しいノードを追加する
      addToChain(this.entries[num]);

      function addToChain(node) {
        if (node.key === key) {
          // 同じkeyのノードが見つかったら、新しいノードは作らずvalueだけ上書きする(sizeは増やさない)
          node.value = value;
          return;
        }
        if (!node.next) {
          // next が undefined ならリストの末尾。ここに新しいノードを繋げる
          node.next = { key: key, value: value };
          addSize();
          return;
        }
        // 一致もせず末尾でもなければ、次のノード(node.next)に対して同じ処理をもう一度試す(再帰)
        addToChain(node.next);
      }
    },
    remove(key) {
      // put の addSize と同じ理由(this の束縛)で、size を減らす処理もアロー関数にしておく
      const removeSize = () => {
        this.size--;
      };

      // keyのハッシュ値を配列のサイズ(capacity)で剰余演算し、格納先のインデックスを求める
      const num = hash(key) % capacity;

      if (this.entries[num] === undefined) {
        // その位置に何も格納されていなければ、削除するものがない
        return;
      }

      // get/put と違い、削除するノードを見つけたときは「そのノードを指している側」を
      // 書き換える必要がある(自分を飛ばして繋ぎ直す)。でも再帰関数に渡せるのは
      // 「今見ているノード」だけで、「誰が自分を指しているか」は分からない。
      // そこで、ノードと一緒に「削除するときにどこを書き換えればいいか」を表す関数(コールバック)も渡す。
      // 先頭(entries[num])を渡すときは、「見つかったらentries[num]を書き換える関数」を渡す。
      removeFromChain(this.entries[num], (replacement) => {
        this.entries[num] = replacement;
      });

      function removeFromChain(node, replace) {
        if (node.key === key) {
          // keyが一致するノードが見つかった → 自分(node)を飛ばして、
          // 自分を指していた場所に自分のnextを繋ぎ直す(replaceを呼ぶ)
          // node.nextがundefined(自分が末尾)なら、そのままundefinedで置き換わる
          replace(node.next);
          removeSize();
          return;
        }
        if (!node.next) {
          // next が undefined ならリストの末尾まで探しても見つからなかった、ということ。何もしない
          return;
        }
        // 一致もせず末尾でもなければ、次のノード(node.next)に対して同じ処理をもう一度試す(再帰)。
        // このとき、「もしnode.nextが削除対象だったら、node.nextを書き換える関数」を一緒に渡す
        removeFromChain(node.next, (replacement) => {
          node.next = replacement;
        });
      }
    },
  };
}
