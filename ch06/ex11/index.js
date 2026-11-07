// 極座標 r と theta をプロパティにもち、ゲッターとセッターをもつ読み書き可のアクセサプロパティとして
// デカルト座標 x と y をもつオブジェクトを実装する。
// セッターで x と y それぞれに NaN が設定される場合はエラーにする。
//
// 設計の考え方:
//   - 実際に保存しておくのは r(原点からの距離)と theta(x軸からの角度、ラジアン)の2つだけ。
//   - x と y は値として保存せず、読むたびに r と theta から計算する(ゲッター)。
//   - x や y に書き込まれたら、新しい (x, y) から r と theta を計算し直して保存する(セッター)。
//
// 座標の変換式:
//   極座標 → デカルト座標:  x = r * cos(theta)、 y = r * sin(theta)
//   デカルト座標 → 極座標:  r = √(x² + y²)、 theta = atan2(y, x)

export const point = {
  // 実際に値を保存するデータプロパティ。初期状態は原点 (0, 0) に相当する。
  r: 0,
  theta: 0,

  // x のゲッター: point.x と読んだとき、r と theta から計算して返す。
  // this は、このオブジェクト(point)自身を指す。
  get x() {
    return this.r * Math.cos(this.theta);
  },

  // y のゲッター: point.y と読んだとき、r と theta から計算して返す。
  get y() {
    return this.r * Math.sin(this.theta);
  },

  // x のセッター: point.x = 値 と書いたとき呼ばれ、引数 value に書き込まれた値が入る。
  // 「x だけ変えて、y は今のまま」という操作なので、新しい点は (value, 今の y)。
  set x(value) {
    // NaN は === では判定できない(NaN === NaN も false)ので Number.isNaN を使う。
    if (Number.isNaN(value)) {
      throw new Error("x is NaN");
    }

    // 今の y を、r と theta を書き換える「前」に変数へ保存する。
    // this.y はゲッターで r と theta から計算されるので、this.r を更新した後に読むと、
    // 新しい r と古い theta の組み合わせという中途半端な値になり、正しい y が取れなくなる。
    const y = this.y;

    // 新しい点 (value, y) から、r と theta を計算し直して保存する。
    // Math.hypot(a, b) は √(a² + b²)。引数の順番は結果に影響しない。
    this.r = Math.hypot(value, y);
    // Math.atan2(y, x) は点 (x, y) の角度を返す。引数は (y, x) の順であることに注意。
    // (atan(y / x) と違って象限を区別でき、x が 0 でも使える)
    this.theta = Math.atan2(y, value);
  },

  // y のセッター: x のセッターと対になる処理。「y だけ変えて、x は今のまま」なので新しい点は (今の x, value)。
  set y(value) {
    if (Number.isNaN(value)) {
      throw new Error("y is NaN");
    }

    // 今の x を、r と theta を書き換える前に保存する(理由は x のセッターと同じ)。
    const x = this.x;

    this.r = Math.hypot(x, value);
    // atan2 の引数は (y, x) の順なので、(新しい y = value, 今の x) の順に渡す。
    this.theta = Math.atan2(value, x);
  },
};
