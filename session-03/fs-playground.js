import { appendFile, copyFile, mkdir, readdir, readFile, rename, rm, stat, writeFile } from "node:fs/promises";

await mkdir("playground\\notes\\2026", { recursive: true });
console.log("1. made a folder three levels deep");

await writeFile("playground\\notes\\todo.txt", "buy milk\n");
await appendFile("playground\\notes\\todo.txt", "learn streams\n");
console.log("2. todo.txt now contains:", JSON.stringify(await readFile("playground\\notes\\todo.txt", "utf-8")));

await copyFile("playground\\notes\\todo.txt", "playground\\notes\\2026\\backup.txt");
await rename("playground\\notes\\todo.txt", "playground\\notes\\done.txt");
console.log("3. copied one file, renamed another");

const entries = await readdir("playground\\notes", { withFileTypes: true });
for (const entry of entries) {
  console.log("  ", entry.isDirectory() ? "[folder]": "[file] ", entry.name)
}

const info = await stat("playground\\notes\\done.txt");
console.log("4. done.txt:", info.size, "bytes, changed at", info.mtime.toISOString());

await rm("playground", { recursive: true });
console.log("5. removed everything again");

try {
  await readFile("playground\\notes\\done.txt", "utf-8")
} catch (err) {
  console.error("6. reading a missing file gives code:", err.code)
}