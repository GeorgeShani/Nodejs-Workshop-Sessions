import path from "node:path";

const file = "C:\\Users\\HP\\Desktop\\books\\data\\books.json";

console.log("basename:", path.basename(file));
console.log("dirname:", path.dirname(file));
console.log("extname:", path.extname(file));
console.log("parse:", path.parse(file));

console.log("join:", path.join("data", "..", "data", "books.json"));
console.log("relative:", path.relative("C:\\Users\\HP\\Desktop\\books", file));

const uploads = path.resolve("uploads");

function safeJoin(name) {
  const full = path.resolve(uploads, name);
  if (!full.startsWith(uploads + path.sep)) {
    throw new Error(`blocked: ${name} escapes the uploads folder`);
  }
  return null;
}

console.log("\nsafe name:  ", safeJoin("photo.jpeg"));
for (const bad of ["..\\..\\secrets.txt", "C:\\Users\\HP\\passwords"]) {
  try {
    safeJoin(bad);
  } catch (err) {
    console.error("attack: ", err.message)
  }
}