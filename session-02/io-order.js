import { readFile } from "node:fs";

readFile("io-order.js", () => {
  console.log("1. the file has been read (we are inside an I/O callback)");
  setTimeout(() => console.log("3. setTimeout 0"), 0);
  setImmediate(() => console.log("2. setImmediate"));
});