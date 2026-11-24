import { createReadStream, createWriteStream } from "node:fs";
import { stat } from "node:fs/promises";
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

const total = (await stat("lines.txt")).size;
let seen = 0;
let lastPercent = -1;

const counter = new Transform({
  transform(chunk, _encoding, callback) {
    seen += chunk.length;
    const percent = Math.floor((seen / total) * 100);

    if (percent % 10 === 0 && percent !== lastPercent) {
      lastPercent = percent;
      console.log(`copied ${percent}% (${(seen / 1024 / 1024).toFixed(1)} MB)`);
    } 

    callback(null, chunk);
  }
});

await pipeline(createReadStream("lines.txt"), counter, createWriteStream("lines-copy.txt"));
console.log("copy finished");