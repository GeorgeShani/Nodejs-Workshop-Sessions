process.on("unhandledRejection", (reason) => {
  console.log("Safety nedt caught an unhandled rejection:", reason.message);
});

Promise.reject(new Error("nobody caught me"));

setTimeout(() => console.log("The program is still alive after 500 ms"), 500);