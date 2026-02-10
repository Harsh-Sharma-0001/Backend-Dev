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

const fileAuthMiddleware = (req, res, next) => {
    console.log("I am checking file access");
    return res.send("Auth Failed");
};

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
  console.log(`Server is listening on ${PORT}`);
});