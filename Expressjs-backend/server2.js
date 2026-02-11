const express = require("express");
const path = require("path");
const fs = require("fs").promises; 

const app = express();
const PORT = 5500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const FILE_PATH = "./formData.json";

const readFormDataFromFile = async () => {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    return []; // if file not found, return empty array
  }
};

const writeFormDataToFile = async (records) => {
  await fs.writeFile(FILE_PATH, JSON.stringify(records, null, 2));
};


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "form.html"));
});


app.post("/students/register", async (req, res) => {
  try {
    const { name, email, branch } = req.body;

    if (!name || !email || !branch) {
      return res.status(400).send("All fields are required");
    }

    const existingData = await readFormDataFromFile();

    const newStudent = {
      id: existingData.length > 0 ? existingData[existingData.length - 1].id + 1 : 1,
      name,
      email,
      branch,
    };

    existingData.push(newStudent);

    await writeFormDataToFile(existingData);

    console.log("Saved Data:", newStudent);

    res.send("Student Registered Successfully");
  }
  catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
