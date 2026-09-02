const arr = ["r", "i", "c", "o", "h"];

delete arr[3];

console.log(arr); // [ 'r', 'i', 'c', <1 empty item>, 'h' ]
console.log(arr.length); // 5

// deleteは指定した位置の要素を「空(empty item)」にするだけで、
// 後ろの要素を詰めたり、配列自体の長さ(length)を減らしたりはしない。
