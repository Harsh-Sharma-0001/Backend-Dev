const fs = require("fs");
const readline = require("readline");

const logFile = process.argv[2];

let totalLines = 0;
let errorCount = 0;
let warnCount = 0;

const stream = fs.createReadStream(logFile);

const rl = readline.createInterface({
  input: stream,
  crlfDelay: Infinity,
});

rl.on("line", (line) => {
  totalLines++;

  if (line.includes("ERROR")) errorCount++;
  if (line.includes("WARN")) warnCount++;
});

rl.on("close", () => {
  console.log("Log File Summary");
  console.log("----------------");
  console.log(`Total Lines: ${totalLines}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Warnings: ${warnCount}`);
});
