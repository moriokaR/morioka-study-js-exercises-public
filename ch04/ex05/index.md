# 問題4.5

対象のコード:

```javascript
for (i = 1; i < 101; i++)
  console.log((i % 3 ? "" : "Fizz") + (i % 5 ? "" : "Buzz") || i);
```

## Fizzのケース (3の倍数、5の倍数ではない)

i % 3 ? "" : "Fizz"でfalseとなり、"Fizz"が書かれる。(i % 5 ? "" : "Buzz" はtrueなので空)

## Buzzのケース (5の倍数、3の倍数ではない)

i % 5 ? "" : "Buzz"でfalseとなり、"Buzz"が書かれる。(i % 3 ? "" : "Fizz" はtrueなので空)

## FizzBuzzのケース (15の倍数)

i % 3 ? "" : "Fizz"とi % 5 ? "" : "Buzz"でfalseとなり、それが結合され、"FizzBuzz"と書かれる。

## 数値のケース (3の倍数でも5の倍数でもない)

i % 3 ? "" : "Fizz"とi % 5 ? "" : "Buzz"でtrueとなり、||の左辺が空でfalseとなり、iが書かれる。
