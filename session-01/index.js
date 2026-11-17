const username = process.argv[2];
const greeting = process.env.GREETING ?? "Hello";

if (!username) {
  console.error("error: name required");
  process.exit(1);
}

const coloredText = chalk.green(greeting, username);

console.log(coloredText);