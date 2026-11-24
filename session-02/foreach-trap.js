const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const ids = [1, 2, 3];

console.log("--- forEach with await ---");

ids.forEach(async (id) => {
  await sleep(100);
  console.log(`  forEach finished item ${id}`);
});

console.log("forEach is done (but nothing has finished yet!)");

await sleep(300);

console.log("--- for ... of with await ---");

for (const id of ids) {
  await sleep(100);
  console.log(`  forEach finished item ${id}`);
}

console.log("for ... of is done (everything really finished)");