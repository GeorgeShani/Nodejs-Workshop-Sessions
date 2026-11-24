import { Writable } from "node:stream";

let chunksWritten = 0;

const slowWriter = new Writable({
  highWaterMark: 32,
  write(chunk, _encoding, callback) {
    chunksWritten++;
    setTimeout(callback, 50);
  }
});

let drains = 0;
slowWriter.on("drain", () => {
  drains++;
  console.log(`  >>> drain event #${drains}: the buffer is empty again, keep writing`);
});

const chunk = "x".repeat(20);
for (let i = 1; i <= 8; i++) {
  const hasRoom = slowWriter.write(chunk);
  console.log(`write ${i}: returned ${hasRoom} ${hasRoom ? "" : "(buffer full: STOP writing)"}`);

  if (!hasRoom) {
    await new Promise((resolve) => slowWriter.once("drain", resolve));
  }
}

slowWriter.end();
console.log(`\ntotal drains: ${drains}`);