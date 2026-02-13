const express = require("express");
const app = express();
const PORT = 4000;

app.set("view engine", "ejs");
//ejs - server site rendering

app.use(express.urlencoded({ extended: true }));

const students = [
  { id: 1, name: "rahul", branch: "CSE" },
  { id: 2, name: "rishu", branch: "ECE" },
  { id: 3, name: "ram", branch: "IT" },
];

app.get("/", (req, res) => {
  res.render("form", { allStudents: students });
});

app.post("/students/register", (req, res) => {
  const { name, branch } = req.body;

  const newStudent = {
    id: students.length + 1,
    name,
    branch,
  };

  students.push(newStudent);

  res.render("form", { allStudents: students });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
