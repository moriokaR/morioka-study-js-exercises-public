// for 版
/*
export const fizzbuzz = () => {
    let result = ""
    for (let i = 1; i <= 100; i++) {
        // ここでiが3の倍数か、5の倍数か、両方かを判定して
        // result に "Fizz" / "Buzz" / "FizzBuzz" / iの数値、のいずれかと改行を追加していく
        if (i % 3 == 0 && i % 5 == 0) {
            result += "FizzBuzz\n"
        } else if (i % 3 == 0) {
            result += "Fizz\n"
        } else if (i % 5 == 0) {
            result += "Buzz\n"
        } else {
            result += i + "\n"
        }

    }
    return result
}
*/

//一行 版

// Array.from(第1引数, 第2引数) で配列を作る。
// 第1引数 { length: 100 } は「長さ100の配列っぽいもの」を表す (中身は空)。
// 第2引数 (_, i) => i + 1 は、各要素を作るときに呼ばれる関数。
// _ は元の要素の値(今回は使わないので無視)、i は0始まりのインデックス(0,1,2,...,99)。
// インデックスに1を足すことで、結果的に [1, 2, 3, ..., 100] という配列になる。
export const fizzbuzz = () => Array.from({ length: 100 }, (_, i) => i + 1).map(n => n % 3 == 0 && n % 5 == 0 ? "FizzBuzz\n" : n % 3 == 0 ? "Fizz\n" : n % 5 == 0 ? "Buzz\n" : n + "\n").join("");
