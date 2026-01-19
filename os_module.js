const os = require("os");

const totalMemory = os.totalmem()/(1024*1024*1024);
const freeMemory = os.freemem()/(1024*1024*1024);

const platform = os.platform();
const cpu = os.cpus()[0].model;

//console.log("Total Memory: ", totalMemory, freeMemory);
//console.log(cpu);

const uptime = os.uptime();
console.log(uptime);

const userInfo = os.userInfo();
console.log(userInfo);



// Create a log file, that updates after every 5 seconds and it will consist of all these information in that log file (that we find above).

const fs = require("fs");
const timeStamp = new Date().toLocaleString();

const log = `
Time: ${timeStamp}
Total Memory: ${totalMemory} GB
Free Memory: ${freeMemory} GB
Platform: ${platform}
CPU: ${cpu}
Uptime: ${uptime} seconds
User Info: ${JSON.stringify(userInfo)}
`;

setInterval(() => {
    fs.appendFile("./system_info.txt", log, (err) => {
        if (err) {
            console.log(err);
        }
    })
}, 5000);