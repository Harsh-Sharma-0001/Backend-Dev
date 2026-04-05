const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function main() {
  await client.connect();

  const db = client.db("studentDB");
  const students = db.collection("students");

  console.log("Connected to MongoDB");

  await students.insertMany([
    {
      name: "Harsh Sharma",
      email: "harsh123@gmail.com",
      gpa: 3.4,
      city: "Delhi",
      department: "CSE",
      courses: ["DBMS", "OS", "CN"]
    },
    {
      name: "Aman Verma",
      email: "aman456@gmail.com",
      gpa: 3.7,
      city: "Mumbai",
      department: "IT",
      courses: ["DBMS", "AI", "ML", "CN", "OS", "SE"]
    }
  ]);

  console.log("Students added");

  const allStudents = await students.find().toArray();
  console.log("All Students:", allStudents);

  const student = await students.findOne({ email: "harsh123@gmail.com" });
  console.log("Found Student:", student);

  await students.updateOne(
    { email: "harsh123@gmail.com" },
    { $set: { gpa: 3.9 } }
  );

  console.log("GPA Updated");

  const updatedStudent = await students.findOne({ email: "harsh123@gmail.com" });
  console.log("Updated Student:", updatedStudent);

  await students.deleteOne({ email: "aman456@gmail.com" });

  console.log("Student Deleted");

  const remainingStudents = await students.find().toArray();
  console.log("Remaining Students:", remainingStudents);

  await client.close();
}

main();