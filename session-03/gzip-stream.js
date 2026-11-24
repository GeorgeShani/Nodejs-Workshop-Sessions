import { createReadStream, createWriteStream } from "node:fs";
import { stat } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { createGzip } from "node:zlib";

await pipeline(createReadStream("lines.txt"), createGzip(), createWriteStream("lines.txt.gz"));

const before = (await stat("lines.txt")).size;
const after = (await stat("lines.txt.gz")).size;

console.log(`before: ${(before / 1024 / 1024).toFixed(1)} MB`);
console.log(`after: ${(after / 1024 / 1024).toFixed(1)} MB`);
console.log(`the compressed file is ${Math.round((after / before) * 100)}% of the original`);