const url = new URL(
  "http://localhost:3000/books?limit=2&tag=scifi&tag=classic&q=dune%20messiah",
);

console.log("pathname: ", url.pathname);
console.log("limit: ", url.searchParams.get("limit"));
console.log("missing: ", url.searchParams.get("author"));
console.log("tag (first): ", url.searchParams.get("tag"));
console.log("tag (all): ", url.searchParams.getAll("tag"));
console.log("q (decoded): ", url.searchParams.get("q"));
console.log("has limit: ", url.searchParams.has("limit"));
console.log("all as an object:", Object.fromEntries(url.searchParams));

const params = new URLSearchParams({ q: "dune & messiah", page: "2" });
console.log("\nbuilt query string:", params.toString());
