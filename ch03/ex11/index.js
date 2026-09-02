export const obj1 = { x: 1 };
obj1.y = 2;
console.log(obj1);

const obj2 = { x: 1, y: 2 };
// 予想：false。オブジェクトは参照で比較されるため
console.log(obj1 === obj2);

export const equals = (o1, o2) => {
  if (o1 === o2) {
    return true;
  } else if (
    o1 === null ||
    o2 === null ||
    typeof o1 !== "object" ||
    typeof o2 !== "object"
  ) {
    return false;
  } else if (Object.keys(o1).length !== Object.keys(o2).length) {
    return false;
  } else if (
    // every(): 配列の全要素が条件を満たせばtrue、1つでも満たさなければfalseを返す
    // ここでは「o1の各プロパティ名(key)が、o2にも存在するか(key in o2)」を全部チェックしている
    !Object.keys(o1).every((key) => key in o2)
  ) {
    return false;
  } else if (Object.keys(o1).every((key) => equals(o1[key], o2[key]))) {
    return true;
  } else {
    return false;
  }
};
