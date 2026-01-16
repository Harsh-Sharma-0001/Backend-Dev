const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((req, res) => {

  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === "/product") {

    const { name, price, discount } = parsedUrl.query;

    const p = Number(price);
    const d = Number(discount);

    const finalPrice = p - (p * d) / 100;

    const log = `Product: ${name} | Price: ${p} | Discount: ${d}% | Final Price: ${finalPrice}\n`;

    fs.appendFile("searches.txt", log, (err) => {
      if (err) console.log("Log write failed");
    });

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <html>
        <head>
          <title>Product Search</title>
        </head>
        <body style="font-family: Arial; background:#f4f4f4; padding:20px;">
          <h1> Product Details</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Original Price:</strong> ₹${p}</p>
          <p><strong>Discount:</strong> ${d}%</p>
          <p><strong>Final Price:</strong> ₹${finalPrice}</p>
        </body>
      </html>
    `);

  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 Page Not Found</h1>");
  }
});

server.listen(8000, () => {
  console.log("Server running on port 8000");
});
