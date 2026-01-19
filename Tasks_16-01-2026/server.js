const http = require("http");
const fs = require("fs");
const url = require("url");

const PORT = 8000;

const server = http.createServer((req, res) => {

  /*  Task 1  */

  if (req.method === "POST" && req.url === "/complain") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      let data;

      try {
        data = JSON.parse(body);
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Invalid JSON format" }));
      }

      const { name, issue, priority } = data;

      const ticketId = "TKT-" + Math.floor(Math.random() * 1000000);

      const complaintData = `
Ticket ID: ${ticketId}
Name: ${name}
Issue: ${issue}
Priority: ${priority}
----------------------------
`;

      const fileName =
        priority && priority.toLowerCase() === "high"
          ? "URGENT.txt"
          : "normal_complaints.txt";

      fs.appendFile(fileName, complaintData, (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              message: "Error saving complaint",
            }),
          );
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            ticketId: ticketId,
            message: "We will solve your issue soon.",
          }),
        );
      });
    });
  } else if (req.method === "GET") {

    /*  Task 2  */

    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === "/admin") {
      const { user, pass } = parsedUrl.query;

      if (user === "admin" && pass === "1234") {
        fs.readFile("admin_dashboard.html", "utf8", (err, data) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            return res.end("Error loading admin dashboard");
          }

          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        });
      } else {
        res.writeHead(401, { "Content-Type": "text/plain" });
        res.end("Access Denied.");
      }
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Route Not Found");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
