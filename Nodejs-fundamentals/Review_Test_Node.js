/*  Question. 3  */

// const http = require("http");
// const url = require("url");

// const server = http.createServer((req, res) => {
//   const parsedUrl = url.parse(req.url, true);
//   const pathname = parsedUrl.pathname;
//   const query = parsedUrl.query;

//   if (pathname === "/secure") {
//     const { user, key } = query;

//     if (user === "admin" && key === "secret") {
//       res.writeHead(200, { "Content-Type": "text/plain" });
//       res.end("Welcome to the Vault");
//     } else {
//       res.writeHead(401, { "Content-Type": "text/plain" });
//       res.end("Access Denied");
//     }
//   } else {
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("Not Found");
//   }
// });

// server.listen(8000, () => {
//   console.log("Server running on port 8000");
// });




/*  Question. 10  */

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;

  const log = `[${timestamp}] | Method: ${method} | URL: ${url}\n`;

  fs.appendFile("access.log", log, (err) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error Logging Request");
      return;
    }

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Request Logged Successfully!");
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
