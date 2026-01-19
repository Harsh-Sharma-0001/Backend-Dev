const http = require("http");
const url = require("url");

let todos = [];
let idCounter = 1;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const path = parsedUrl.pathname;
  const pathParts = path.split("/").filter(Boolean);

  res.setHeader("Content-Type", "application/json");

  if (method === "GET" && path === "/todos") {
    res.writeHead(200);
    res.end(JSON.stringify(todos));
  }

  else if (method === "POST" && path === "/todos") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const data = JSON.parse(body);
      const todo = { id: idCounter++, task: data.task };
      todos.push(todo);

      res.writeHead(201);
      res.end(JSON.stringify(todo));
    });
  }

  else if (method === "PUT" && pathParts[0] === "todos" && pathParts[1]) {
    const id = parseInt(pathParts[1]);
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const data = JSON.parse(body);
      const todo = todos.find((t) => t.id === id);

      if (!todo) {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "Todo not found" }));
        return;
      }

      todo.task = data.task;
      res.writeHead(200);
      res.end(JSON.stringify(todo));
    });
  }

  else if (method === "DELETE" && pathParts[0] === "todos" && pathParts[1]) {
    const id = parseInt(pathParts[1]);
    const initialLength = todos.length;

    todos = todos.filter((t) => t.id !== id);

    if (todos.length === initialLength) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: "Todo not found" }));
      return;
    }

    res.writeHead(200);
    res.end(JSON.stringify({ message: "Todo deleted" }));
  }

  else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(3000, () => {
  console.log("TODO API using Node.js running on http://localhost:3000");
});
