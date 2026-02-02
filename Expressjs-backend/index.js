const express = require("express");
const app = express();

const PORT = 8000;

const students = [
  { id: 1, name: "Harsh", branch: "CSE" },
  { id: 2, name: "Shrey", branch: "ECE" },
  { id: 3, name: "Halwai", branch: "Majdoor" },
];

app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

app.get("/students", (req, res) => {
  res.json(students);
});


app.get("/students/search", (req, res) => {
  const { name, branch } = req.query;

  let filteredStudents = students;

  if (name) {
    filteredStudents = filteredStudents.filter((student) =>
      student.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  if (branch) {
    filteredStudents = filteredStudents.filter(
      (student) => student.branch.toLowerCase() === branch.toLowerCase(),
    );
  }

  res.json(filteredStudents);
});


app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});


app.use(express.json());

app.post("/students", (req, res) => {
  const { name, branch } = req.body;

  const newStudent = {
    id: students.length + 1,
    name,
    branch,
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});


app.listen(PORT, () => {
  console.log(`Server is listening on port : ${PORT}`);
});
