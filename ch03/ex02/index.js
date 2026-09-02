console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER);
console.log(Number.MAX_SAFE_INTEGER + 1);
console.log(Number.MAX_SAFE_INTEGER + 2);

// MAX_SAFE_INTEGER を超えると整数の精度が失われ、どちらも同じ値に丸められてしまい、+1と+2の違いを表現できなくなるため。
console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2);
