const book = {
  title: "Dune",
  published: new Date("1965-08-01"),
  rating: undefined,
  buy() {
    return "sold";
  },
};

console.log("stringify:", JSON.stringify(book));
console.log("back again:", JSON.parse(JSON.stringify(book)));

const a = { name: "loop" };
a.self = a;

try {
  JSON.stringify(a);
} catch (err) {
  console.log("circular:", err.message.split("\n")[0]);
}

for (const bad of ["{ title: 'Dune' }", '{"title": "Dune",}', ""]) {
  try {
    JSON.parse(bad);
  } catch (err) {
    console.log(`parse ${JSON.stringify(bad)} ->`, err.name);
  }
}
