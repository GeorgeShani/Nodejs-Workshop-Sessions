import { createWriteStream } from "node:fs";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

async function* lines() {
  for (let i = 1; i <= 500_000; i++) {
    yield `line ${i}: the quick brown fox jumps over the lazy dog\n`;
  }
}

await pipeline(Readable.from(lines()), createWriteStream("lines.txt"));
console.log("lines.txt written")