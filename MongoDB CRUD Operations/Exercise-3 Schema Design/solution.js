const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function main() {
  await client.connect();

  const db = client.db("universityDB");

  const courses = db.collection("courses");
  const professors = db.collection("professors");
  const students = db.collection("students");
  const grades = db.collection("grades");

  console.log("Connected to MongoDB");

  const courseResult = await courses.insertOne({
    name: "Database Systems",
    code: "DBMS101",
    credits: 4,
    prerequisites: ["CS101", "CS102"]
  });

  console.log("Course added");

  await professors.insertOne({
    name: "Dr. Sharma",
    email: "sharma@uni.edu",
    departments: ["CSE", "IT"],
    experience: 10
  });

  console.log("Professor added");

  const studentResult = await students.insertOne({
    name: "Harsh",
    email: "harsh@gmail.com"
  });

  await grades.insertOne({
    studentId: studentResult.insertedId,
    courseId: courseResult.insertedId,
    grade: "A",
    semester: "Fall 2024"
  });

  console.log("Grade added with references");

  await client.close();
}

main();