const values = [Infinity, -Infinity, NaN];
const operators = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

for (const a of values) {
  for (const b of values) {
    for (const [symbol, fn] of Object.entries(operators)) {
      console.log(`${a} ${symbol} ${b} = ${fn(a, b)}`);
    }
  }
}
