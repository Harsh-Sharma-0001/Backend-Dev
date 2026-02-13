const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

const dataPath = path.join(__dirname, "students.json");

// Helper function to read students
function getStudents() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

// Helper function to write students
function saveStudents(students) {
  fs.writeFileSync(dataPath, JSON.stringify(students, null, 2));
}

/* ===========================
   HOME PAGE
=========================== */
app.get("/", (req, res) => {
  res.render("home");
});

/* ===========================
   ADD STUDENT (POST)
=========================== */
app.post("/students/register", (req, res) => {
  const { name, branch } = req.body;

  const students = getStudents();

  const newStudent = {
    id: Date.now().toString(),
    name,
    branch,
  };

  students.push(newStudent);
  saveStudents(students);

  res.redirect("/students");
});

/* ===========================
   SHOW STUDENTS
   + Branch Filter
=========================== */
app.get("/students", (req, res) => {
  let students = getStudents();

  const branchFilter = req.query.branch;

  if (branchFilter) {
    students = students.filter(
      (s) => s.branch.toLowerCase() === branchFilter.toLowerCase()
    );
  }

  res.render("students", {
    students,
    total: students.length,
    selectedBranch: branchFilter || "",
  });
});

/* ===========================
   DELETE STUDENT
=========================== */
app.get("/students/delete/:id", (req, res) => {
  const { id } = req.params;

  let students = getStudents();
  students = students.filter((s) => s.id !== id);

  saveStudents(students);

  res.redirect("/students");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
