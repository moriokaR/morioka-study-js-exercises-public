import * as acorn from "acorn";

// 書籍 p.22 の2つのプログラム
const program1 = `let a
a
=
3
console.log(a)`;

const program2 = `let a; a = 3; console.log(a);`;

const ast1 = acorn.parse(program1, { ecmaVersion: "latest", sourceType: "script" });
const ast2 = acorn.parse(program2, { ecmaVersion: "latest", sourceType: "script" });

console.log("=== program1 (セミコロン省略) のAST ===");
console.log(JSON.stringify(ast1, null, 2));

console.log("=== program2 (セミコロンあり) のAST ===");
console.log(JSON.stringify(ast2, null, 2));
