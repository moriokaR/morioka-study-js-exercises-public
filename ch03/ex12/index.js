class Example {
  valueOf() {
    console.log("call valueOf()");
    return 100;
  }

  toString() {
    console.log("call toString()");
    return "toString が呼ばれました";
  }
}

let obj = new Example();
console.log(obj + 1);
console.log(`今、${obj}`);
