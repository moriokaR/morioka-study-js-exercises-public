// typeof undefined ⇒ 予想 undefined
console.log(typeof undefined);
// typeof null ⇒ 予想 object
console.log(typeof null);
// typeof オブジェクト ⇒ 予想 object
const obj = { a: 1 };
console.log(typeof obj);
// typeof NaN ⇒ 予想 number
console.log(typeof NaN);
// typeof 数値 ⇒ 予想 number
console.log(typeof 1);
// typeof 関数 ⇒ 予想 function
const func = () => {
  return 1;
};
console.log(typeof func);
