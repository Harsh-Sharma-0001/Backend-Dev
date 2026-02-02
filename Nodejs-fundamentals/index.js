// const {areaofcircle} = require("./math");
// console.log(areaofcircle(5));

// require("./math") math.js ke exported functions ko import karta hai
// aur object destructuring se add aur remove ko directly variables me store kiya jata hai.

// Destructuring ka matlab hota hai
//object ya array se values ko direct variables me nikaal lena

/*
1- WITHOUT destructuring (pehle ka tareeka)
const math = require("./math");

const add = math.add;
const remove = math.remove;

2️- WITH destructuring (short & clean)
const { add, remove } = require("./math");

*/

// Node.js ka built-in File System module import kiya
// fs module file create, read, write, delete karne ke kaam aata hai
/*
const fs = require("fs");


// writeFileSync ka matlab: file ko SYNCHRONOUS tarike se write karna
// "./text.txt" → current folder me text.txt naam ki file banayega
// "This is Sync file content" → file ke andar likha jane wala data
// Agar file pehle se exist karti hai → uska data overwrite ho jayega
// Jab tak file write complete nahi hoti, program aage nahi badhega

fs.writeFileSync("./text.txt", "This is Sync file content");

// const file = fs.readFileSync("./text.txt", "utf-8"); // file ko read karna
// "utf-8" → encoding format, jisse text ko sahi tarike se read kiya ja sake

// readFileSync ka matlab: file ko SYNCHRONOUS tarike se read karna
// Jab tak file read complete nahi hoti, program aage nahi badhega
// console.log(file); // file ka content console me print karna

const asyncfile = fs.readFile("./text.txt", "utf-8", (err, data) => {
    // Callback function jo file read hone ke baad chalega
    // err → agar file read karte waqt koi error aata hai to wo yahan milega
    // data → file ka content yahan milega agar read successful hota hai
    if (err) {
        console.log("Error reading file:", err);
    }
    else {       
        console.log("File content:", data);
    }
});
*/
// readFile ka matlab: file ko ASYNCHRONOUS tarike se read karna
// Program file read karte waqt aage badh sakta hai
// Jab file read complete hoti hai, tab callback function call hota hai     


/*
const { logActivity, showLogs } = require("./logger");

logActivity("Server started");
logActivity("User logged in");

showLogs();

*/



/*()
// Node.js ka built-in module import kar rahe hain
// http module se hum server bana sakte hain

const http = require("http");

// Yahan hum ek server create kar rahe hain
// createServer ek function hai jo callback leta hai
// (req, res) => { } ek arrow function hai
// req = client ki request (browser/postman se aayi request)
// res = server ka response (jo hum client ko bhejte hain)

const server = http.createServer((req, res) => {

    // Yahan hum ek user object bana rahe hain
    // Ye normal JavaScript object hai (memory ke andar)
    const user = {
        id: 1,               // user ki unique id
        name: "Harsh",      // user ka naam
        age: 20,             // user ki age
        isPremium: true      // user premium hai ya nahi
    };

    // writeHead ka matlab:
    // client ko batana ki response sahi hai (200 OK)
    // aur hum JSON data bhej rahe hain
    res.writeHead(200, { 
        'Content-Type': 'application/json' 
    });

    // res.end ka matlab:
    // response yahin finish karo aur data bhejo
    // JSON.stringify ka use isliye:
    // kyunki HTTP sirf string/text samajhta hai
    // JS object direct nahi bhej sakte
    res.end(JSON.stringify(user));
});

// server.listen ka matlab:
// – server ko start karo
// 8000 = port number
// arrow function tab chalega jab server successfully start ho jayega
server.listen(8000, () => {
    console.log("Server is listening on port 8000");
});

*/


/*
// Node.js ka built-in http module import kar rahe hain
// Is module ki help se hum web server bana sakte hain
const http = require("http");

// Yahan hum HTTP server create kar rahe hain
// createServer ek function hai jo callback leta hai
// (req, res) => {} ek arrow function hai
// req = client (browser) se aayi request
// res = server ka response jo client ko bhejna hota hai
const server = http.createServer((req, res) => {

    // req.url batata hai ki user ne kaunsa route hit kiya
    // switch-case ka use karke hum different URLs handle kar rahe hain
    switch (req.url) {

        // Agar user home page (/) open kare
        case "/":
            // Status code 200 = sab sahi hai
            // Content-Type text/html batata hai ki HTML response bhej rahe hain
            res.writeHead(200, { 'Content-Type': 'text/html' });

            // res.end se response bhejte hain aur close kar dete hain
            // Browser me HTML render hoga
            res.end("<h1>Welcome to the Home Page</h1>");
            break;

        // Agar user /about page open kare
        case "/about":
            // 200 OK response
            res.writeHead(200, { 'Content-Type': 'text/html' });

            // About page ka HTML response
            res.end("<h1>About Us Page</h1>");
            break;

        // Agar user /contact page open kare
        case "/contact":

            // Yahan hum ek user object bana rahe hain
            // Ye sirf server side ke use ke liye hai
            const user = {
                id: 1,                  // user ki unique id
                name: "Harsh",         // user ka naam
                contact: "7505459909",  // user ka contact number
            };

            // Response header set kar rahe hain
            res.writeHead(200, { 'Content-Type': 'text/html' });

            // Contact page ka response bhej rahe hain
            // user.contact ko HTML ke sath jod rahe hain
            res.end(
                "<h1>Contact Us Page</h1>" +
                "<p>Contact Details:</p>" +
                user.contact
            );
            break;

        // Agar koi galat URL hit kare
        default:
            // 404 ka matlab page nahi mila
            res.writeHead(404, { 'Content-Type': 'text/html' });

            // Error page ka message
            res.end("<h1>404 Page Not Found</h1>");
            break;
    }
});

// Server ko port 8000 pe start kar rahe hain
// Jab server successfully start ho jaye tab ye function chalega
server.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
*/

/*
const http = require("http");
const { logActivity, showLogs } = require("./logger");

const server = http.createServer((req, res) => {

    // Har request pe log append hoga
    logActivity(`Request received on ${req.url}`);

    switch (req.url) {
        case "/":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end("<h1>Welcome to Home Page</h1>");
            break;

        case "/about":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end("<h1>About Us Page</h1>");
            break;

        case "/contact":
            const user = {
                id: 1,
                name: "Harsh",
                contact: "7505459909"
            };

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(
                "<h1>Contact Us</h1>" +
                "<p>Contact: " + user.contact + "</p>"
            );
            break;

        // 🔥 Logs dikhane ke liye special route
        case "/logs":
            showLogs(res);
            break;

        default:
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h1>404 Page Not Found</h1>");
            break;
    }
});

server.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
*/
/*
// jab bhi server pe request ayegi uska log kese generate hoga 
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const timestamp = new Date().toLocaleString();

  const log = `User requested at: ${timestamp} , Request URL: ${req.url}\n`;

  fs.appendFile("./activity.log", log, (err) => {
    if (err) {
      console.log("Fail to write log");
    } else {
      console.log("Log written successfully");
    }
  });
  switch (req.url) {
        case "/":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end("<h1>Welcome to Home Page</h1>");
            break;

        case "/about":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end("<h1>About Us Page</h1>");
            break;

        case "/contact":
            const user = {
                id: 1,
                name: "Harsh",
                contact: "7505459909"
            };

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(
                "<h1>Contact Us</h1>" +
                "<p>Contact: " + user.contact + "</p>"
            );
            break;
            case "/alllogs":
                fs.readFile("./activity.log", "utf-8", (err, data) => {
                    if (err) {
                        res.writeHead(200, { "Content-Type": "text/plain" });
                        res.end("No logs found");
                        return;     
                    }
                    else {
                        res.writeHead(200, { "Content-Type": "text/plain" });
                        res.end(data);
                    }
                });
                break;
        

        default:
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h1>404 Page Not Found</h1>");
            break;
    }

  
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});
*/

/*
const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const { name, email } = parsedUrl.query;

  switch (pathname) {

    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>Welcome to Home Page</h1>");
      break;

    case "/about":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        `<h1>About Us</h1>
         <p>Hello I am ${name || "Guest"}</p>
         <p>Email: ${email || "Not provided"}</p>`
      );
      break;

    case "/contact":
      const user = {
        id: 1,
        name: "Harsh",
        contact: "7505459909"
      };

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        `<h1>Contact Us</h1>
         <p>Contact: ${user.contact}</p>`
      );
      break;

    case "/alllogs":
      fs.readFile("./activity.log", "utf-8", (err, data) => {
        if (err) {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("No logs found");
        } else {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end(data);
        }
      });
      break;

    default:
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 Page Not Found</h1>");
  }
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});
*/
