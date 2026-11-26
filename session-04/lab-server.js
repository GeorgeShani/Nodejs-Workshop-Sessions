import http from "node:http";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  const [, first, second] = url.pathname.split("/");

  if (first === "echo") {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }

    res.setHeader("Content-Type", "application/json");
    return res.end(
      JSON.stringify(
        {
          method: req.method,
          path: url.pathname,
          query: Object.fromEntries(url.searchParams),
          headers: req.headers,
          body: Buffer.concat(chunks).toString(),
        },
        null,
        2,
      ),
    );
  }

  if (first === "status") {
    res.writeHead(Number(second) || 200, { "Content-Type": "text/plain" });
    return res.end(`you asked for status ${second}\n`);
  }

  if (first === "delay") {
    await sleep(Number(second) || 1000);
    return res.end(`answeres after ${second} ms\n`);
  }

  if (first === "redirect") {
    res.writeHead(302, { "Location": "/status/200" });
    return res.end();
  }

  if (first === "html") {
    res.setHeader("Content-Type", "text/html");
    return res.end("<h1>Hello</h1><p>This is <b>HTML</b>.</p>")
  }

  if (first === "chunks") {
    res.setHeader("Content-Type", "text/plain");
    for (let i = 1; i <= 5; i++) {
      res.write(`chunk ${i} at ${new Date().toISOString()}\n`);
      await sleep(500);
    }
    return res.end("the end\n");
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("try /echo, /status/404, /delay/2000, /redirect, /html, /chunks\n");
});

server.listen(3000, () => {
  console.log("lab server on http://localhost:3000");
});
