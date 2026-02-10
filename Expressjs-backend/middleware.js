// const fs = require("fs").promises;
// const express = require("express");
// const app = express();

// app.use(express.json());

// const PORT= 8000;

// app.listen(PORT, () => {
//   console.log("Server is listening on port:8000");
// });


// app.use((req, res, next) => {
//     console.log("I am a middleware 1");
//     next();
// });

// app.use((req, res, next) => {
//     console.log("I am a middleware 2");
//     next();
// });

// app.use((req, res, next) => {
//   const log = `${new Date().toLocaleString()}`
//   fs.appendFile("log.txt", (err) => {
//     if (err) {
//       console.log(err);
//     }
//     next();
//   })
// });

// const fileAuthMiddleware = (req, res, next) => {
//   console.log("I am checking file access");
//   return res.send("auth filed");
//   // next();
// }


// const authMiddleware = (req, res, next) => {
//   const user = req.user;
//   const token = req.headers["authorization"];
//   if (!token) {
//     return res.status(400).json({ message: "Please provide Auth Token" });
//   }
//   if(token === "secrettoken") {
//     next();
//   }
//   else {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
// }

// const readStudentsFromFile = async () => {
//   const data = await fs.readFile("./students.json", "utf-8");
//   return JSON.parse(data || "[]");
// };

// const writeStudentsToFile = async (records) => {
//   await fs.writeFile("./students.json", JSON.stringify(records, null, 2));
// };


// app.get("/students", authMiddleware, async(req, res) => {
//     const students= await readStudentsFromFile();
//     return res.status(200).json(students);
// });





const express = require("express");
const fs = require("fs").promises;

const app = express();
const PORT = 8000;

app.use(express.json());


app.use(async (req, res, next) => {
  try {
    const log = `${new Date().toString()} - ${req.method} - ${req.url}\n`;
    await fs.appendFile("log.txt", log);
    next();
  } catch (err) {
    console.log("Logging error:", err);
    next(); 
  }
});


app.use((req, res, next) => {
  console.log("I am middleware 1");
  next();
});


app.use((req,res,next)=>{
    console.log("I am middleware 2");
    next();
});

// const fileAuthMiddleware = (req, res, next) => {
//     console.log("I am checking file access");
//     return res.send("Auth Failed");
// };

const auth_Middleware = ((req, res, next) => {
    const token = req.header("Authorization"); 
    if (token === "123") {
        next();
    }
    else {
      res.status(401).send("Unauthorized");
    }
});


const readStudentsFromFile = async () => {
  try {
    const data = await fs.readFile("users.json", "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    await fs.writeFile("users.json", "[]");
    return [];
  }
};

const writeStudentsToFile = async (records) => {
  await fs.writeFile("users.json", JSON.stringify(records, null, 2));
};


app.get("/students",auth_Middleware, async (req, res) => {
  try {
    const students = await readStudentsFromFile();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({message: "Error reading students"});
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server is listening on ${PORT}`);
});