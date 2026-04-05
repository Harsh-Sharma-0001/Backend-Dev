use("libraryDB")

db.books.insertOne({
  title: "The Alchemist",
  author: "Paulo Coelho",
  available: true
})

db.books.find({ author: "Paulo Coelho" })

db.books.updateOne(
  { title: "The Alchemist" },
  { $set: { available: false } }
)

db.users.insertOne({
  name: "Rahul",
  borrowedBooks: ["The Alchemist"]
})