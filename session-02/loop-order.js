console.log("A. start of the file");

process.nextTick(() => console.log("C. nextTick"));
Promise.resolve().then(() => console.log("D. Promise"));

setImmediate(() => console.log("F. setImmediate"));
setTimeout(() => console.log("E. setTimeout 0"), 0);

console.log("B. end of the file");