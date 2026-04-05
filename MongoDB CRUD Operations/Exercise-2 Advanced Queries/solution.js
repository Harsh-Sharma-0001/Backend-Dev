const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function main() {
  await client.connect();

  const db = client.db("studentDB");
  const students = db.collection("students");

  console.log("Connected to MongoDB");

  const gpaRange = await students.find({
    gpa: { $gte: 3.0, $lte: 3.5 }
  }).toArray();

  console.log("GPA between 3.0 and 3.5:", gpaRange);

  const manyCourses = await students.find({
    $expr: { $gt: [{ $size: "$courses" }, 5] }
  }).toArray();

  console.log("Students with >5 courses:", manyCourses);

  const topStudents = await students.find()
    .sort({ gpa: -1 })
    .limit(10)
    .toArray();

  console.log("Top 10 Students:", topStudents);

  const countByCity = await students.aggregate([
    {
      $group: {
        _id: "$city",
        totalStudents: { $sum: 1 }
      }
    }
  ]).toArray();

  console.log("Students count by city:", countByCity);

  await client.close();
}

main();