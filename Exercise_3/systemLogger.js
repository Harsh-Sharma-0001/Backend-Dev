const os = require("os");
const fs = require("fs");

setInterval(() => {
  const systemInfo = `
Time: ${new Date().toLocaleString()}
Platform: ${os.platform()}
CPU Cores: ${os.cpus().length}
Free Memory: ${(os.freemem() / 1024 / 1024).toFixed(2)} MB
Total Memory: ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB
-----------------------------
`;

  fs.appendFile("system.log", systemInfo, (err) => {
    if (err) console.error("Error writing log:", err);
    else console.log("System info logged");
  });
}, 5000);
