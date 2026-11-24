const start = Date.now();

const ticker = setInterval(() => {
  console.log(`  tick at ${Date.now() - start}ms`);
}, 100);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

console.log("1. WAITING for 500ms (the loop is free)");
await sleep(500);

console.log("2. WORKING for 500ms (the loop is stuck)")
const end = Date.now() + 500;
while (Date.now() < end) {}

console.log("3. back to waiting for 300ms");
await sleep(300);

clearInterval(ticker);
console.log("done");