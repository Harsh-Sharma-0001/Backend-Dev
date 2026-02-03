const express = require("express");
const app = express();

const PORT = 8000;

app.use(express.json());

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
      student.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (branch) {
    filteredStudents = filteredStudents.filter(
      (student) => student.branch.toLowerCase() === branch.toLowerCase()
    );
  }

  if (filteredStudents.length === 0) {
    return res.status(404).json({ message: "Student's data not found in database" });
  }

  res.json(filteredStudents);
});


app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student's data not found in database" });
  }

  res.json(student);
});


app.post("/students/register", (req, res) => {
  const { name, branch } = req.body;

  if (!name || !branch) {
    return res.status(400).json({ message: "Please provide name and branch" });
  }

  const newStudent = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    name,
    branch,
  };

  students.push(newStudent);

  res.status(201).json({message: "Student registered successfully", student: newStudent});
});



app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, branch } = req.body;

  const studentIndex = students.findIndex((s) => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student's data not found in database" });
  }

  if (!name && !branch) {
    return res.status(400).json({ message: "Provide at least one field to update" });
  }

  if (name) students[studentIndex].name = name;
  if (branch) students[studentIndex].branch = branch;

  res.status(200).json({message: "Student updated successfully", student: students[studentIndex] });
});


app.listen(PORT, () => {
  console.log(`Server is listening on port : ${PORT}`);
});
