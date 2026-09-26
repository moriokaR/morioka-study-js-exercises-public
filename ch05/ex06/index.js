// try-catch-finally の実行順序が確認できるコードを書く

try {
  console.log("try");
  throw new Error("test");
} catch {
  console.log("catch");
} finally {
  console.log("finally");
}
