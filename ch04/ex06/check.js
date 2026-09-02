import { resize1, resize2 } from "./index.js";

console.log("--- resize1 ---");
resize1(undefined);
resize1({});
resize1({ maxWidth: 800 });
resize1({ maxWidth: 800, maxHeight: 600 });

console.log("--- resize2 ---");
resize2(undefined);
resize2({});
resize2({ maxWidth: 800 });
resize2({ maxWidth: 800, maxHeight: 600 });
