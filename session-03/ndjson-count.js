import { createReadStream, createWriteStream } from "node:fs";
import { once } from "node:events";
import readline from "node:readline";

const out = createWriteStream("logs.ndjson");
const levels = ["info", "info", "info", "warn", "error"];

for (let i = 0; i < 100_000; i++) {
  out.write(JSON.stringify({ id: i, level: levels[i % levels.length] }) + "\n");

}
out.end();
await once(out, "finish");

const counts = {};
const lines = readline.createInterface({
  input: createReadStream("logs.ndjson"),
  crlfDelay: Infinity,
});

for await (const line of lines) {
  const { level } = JSON.parse(line);
  counts[level] = (counts[level] ?? 0) + 1;
}

console.log(counts);
console.log(
  "memory used (MB):",
  Math.round(process.memoryUsage().rss / 1024 / 1024),
);
