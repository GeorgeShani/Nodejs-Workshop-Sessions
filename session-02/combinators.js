const wait = (ms, value, fail = false) => 
  new Promise((resolve, reject) => setTimeout(() => fail ? reject(new Error(value)) : resolve(value), ms));

const makeJobs = () => [wait(100, "fast"), wait(300, "slow"), wait(200, "broken", true)]

console.log("all:         ", await Promise.all(makeJobs()).catch((e) => "REJECTED:" + e.message));
console.log("allSettled:  ", (await Promise.allSettled(makeJobs())).map((r) => r.status));
console.log("race:        ", await Promise.race(makeJobs()).catch((e) => "REJECTED:" + e.message));
console.log("any:         ", await Promise.any(makeJobs()).catch((e) => "REJECTED:" + e.message));