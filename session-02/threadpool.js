import { pbkdf2 } from "node:crypto";

const start = Date.now();

function hashOnce(label) {
  pbkdf2("password", "salt", 400_000, 64, "sha512", () => {
    console.log(`${label} finished after ${Date.now() - start} ms`)
  });
}

const count = Number(process.argv[2] ?? 6);
for (let i = 1; i <= count; i++) hashOnce(`hash ${i}`);