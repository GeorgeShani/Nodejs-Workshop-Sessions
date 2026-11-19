import { greet } from "./greet.js";

const username = process.argv[2];

if (!username) {
  console.error("error: no name given");
  process.exit(1);
}

console.log(greet(username, process.env.GREETING));
console.log(`Node ${process.version} | ${process.platform} | ${process.arch}`);