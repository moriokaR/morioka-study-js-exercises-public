// 以下のデータを使い、下記の各値を求める。
// ただし、配列イテレータメソッドを利用し、ループ文(for, while)を使わないこと。
const data = [
  { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
  { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
  { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
  { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
  { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
  { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
  { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
  { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
  { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

// 1. math の全員の合計点
//   data の要素はオブジェクトなので、「要素そのもの」ではなく a.math を足していく。
//   初期値は 0(空配列のときの結果でもある)。
console.log(data.reduce((total, a) => total + a.math, 0)); // => 530

// 2. クラスAの chemistry の平均点
//   「絞り込む(filter) → 合計する(reduce) → 人数で割る」の3段階。
//   絞り込んだ配列を、合計と人数(length)の2か所で使うので、変数 classA に入れる。
//   (map は「全要素を変換」なので、絞り込みには filter を使う)
const classA = data.filter((s) => s.class === "A");

console.log(
  classA.reduce((total, a) => total + a.chemistry, 0) / classA.length,
); // => 45  ((30 + 50 + 55) / 3)

// 3. クラスCの生徒の3科目合計点の平均点
//   2 と同じ形。reduce の中で、足すものを「3科目の合計」に変えるだけ。
const classC = data.filter((s) => s.class === "C");

console.log(
  classC.reduce((total, a) => total + a.math + a.chemistry + a.geography, 0) /
    classC.length,
); // => 176.66666666666666  ((160 + 150 + 220) / 3)

// 4. 3科目合計点が最も高い人の name
//   reduce で「これまでで一番高い人」を持ち回る。
//   best は { name, total } の形のオブジェクトで、a の合計が best.total より
//   高ければ、{ name, total } を a のものに入れ替える。そうでなければ best のまま。
//   初期値も同じ形にする。total を -1 にしておくと、最初の生徒(合計は 0 以上)が
//   必ず上回る。(初期値を 0 にすると、0.total が undefined になり、
//   a の合計 > undefined は常に false なので、入れ替わらない)
//   最後に .name を取り出す。
console.log(
  data.reduce(
    (best, a) =>
      a.math + a.chemistry + a.geography > best.total
        ? { name: a.name, total: a.math + a.chemistry + a.geography }
        : best,
    { name: "No Name", total: -1 },
  ).name,
); // => Frank  (3科目合計 240)

// 5. 全体の geography の標準偏差
//   標準偏差 = 分散の平方根。分散 = 「各値と平均の差の2乗」の平均。
//   手順を変数に分ける:
//     geography: 全員の geography だけの配列
//     mean:      その平均
//     variance:  分散(差の2乗の平均)
//   人数(9)で割る形(母集団の標準偏差)。人数 - 1 で割ると別の値(不偏標準偏差)になる。
const geography = data.map((g) => g.geography);

const mean = geography.reduce((total, a) => total + a, 0) / geography.length;

const variance =
  geography.reduce((total, a) => total + (a - mean) ** 2, 0) / geography.length;

console.log(Math.sqrt(variance)); // => 22.3330569358242
