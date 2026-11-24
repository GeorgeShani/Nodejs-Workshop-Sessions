const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let t0 = Date.now();

async function task(name, ms) {
  const from = Date.now() - t0;
  await sleep(ms);
  const to = Date.now() - t0;
  console.log(`${name}: started at ${String(from).padStart(4)} ms finished at ${String(to).padStart(4)} ms`)
}

console.log("--- one after another ---");
await task("A (300 ms)", 300);
await task("B (500 ms)", 500);
await task("C (200 ms)", 200);
console.log(`total: ${Date.now() - t0} ms\n`);

t0 = Date.now();
console.log("--- all together ---");
await Promise.all([
  task("A (300 ms)", 300), 
  task("B (500 ms)", 500), 
  task("C (200 ms)", 200)
]);
console.log(`total: ${Date.now() - t0} ms\n`);