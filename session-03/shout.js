import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

const shout = new Transform({
  transform(chunk, _encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  },
});

await pipeline(process.stdin, shout, process.stdout);