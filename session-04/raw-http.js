import http from "node:http";
import net from "node:net";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.end("hello from the server\n");
});

server.listen(3000, () => {
  const socket = net.connect(3000, "localhost");

  socket.write("GET /hello HTTP/1.1\r\n");
  socket.write("Host: localhost\r\n");
  socket.write("Connection: close\r\n");
  socket.write("\r\n");

  let raw = "";

  socket.on("data", (chunk) => (raw += chunk));
  socket.on("end", () => {
    console.log(raw.replaceAll("\r\n", "<CRLF>\n"));
    server.close();
  });
});