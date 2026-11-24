let last = Date.now();

const meter = setInterval(() => {
  const now = Date.now();
  const lag = now - last - 100;
  console.log(`event loop lag: ${lag} ms`);
  last = now;
}, 100);

setTimeout(() => {
  console.log(">>> blocking the loop for 400 ms now");
  const end = Date.now() + 400;
  while (Date.now() < end) {}
}, 350);

setTimeout(() => clearInterval(meter), 1200);