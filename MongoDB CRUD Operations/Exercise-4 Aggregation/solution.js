const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function main() {
  await client.connect();

  const db = client.db("studentDB");
  const students = db.collection("students");

  console.log("Connected to MongoDB");

  const avgGPA = await students.aggregate([
    {
      $group: {
        _id: "$department",
        averageGPA: { $avg: "$gpa" }
      }
    }
  ]).toArray();

  console.log("Average GPA by department:", avgGPA);

  const popularCourses = await students.aggregate([
    { $unwind: "$courses" },
    {
      $group: {
        _id: "$courses",
        totalStudents: { $sum: 1 }
      }
    },
    { $sort: { totalStudents: -1 } }
  ]).toArray();

  console.log("Most popular courses:", popularCourses);

  const performance = await students.aggregate([
    {
      $project: {
        name: 1,
        gpa: 1,
        performance: {
          $cond: {
            if: { $gte: ["$gpa", 3.5] },
            then: "Excellent",
            else: "Average"
          }
        }
      }
    }
  ]).toArray();

  console.log("Student Performance Report:", performance);

  await client.close();
}

main();