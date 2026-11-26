const base = "http://localhost:3000";

async function look(path, options) {
  const started = Date.now();
  const res = await fetch(base + path, options);
  const text = await res.text();
  console.log(`${options?.method ?? "GET"} ${path} -> ${res.status} ${res.statusText} in ${Date.now() - started} ms`);
  console.log(" content-type:", res.headers.get("content-type"));
  console.log(" body:", JSON.stringify(text.slice(0, 40)));
}

await look("/status/404");
await look("/html");
await look("/echo", { method: "POST", body: "hi" });

try {
  await fetch(base + "/delay/3000", { signal: AbortSignal.timeout(500) });
} catch (err) {
  console.log("gave up after 500 ms:", err.name);
}

try {
  await fetch("http://localhost:3999/nothing-here");
} catch (err) {
  console.log("nobody is listening:", err.cause?.code);
}
