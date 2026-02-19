const express = require("express");
const router = express.Router();
const validateYear = require("../middleware/validateYear");

// In-memory database
let books = [
  { id: 1, title: "JS Mastery", author: "Harsh Sharma", year: 2020 },
  { id: 2, title: "Backend Mastery", author: "Prakhar Patel", year: 2022 },
  { id: 3, title: "Node Mastery", author: "Kush Gupta", year: 2021 },
];

router.get("/", (req, res) => {
  let { author, year, page = 1, limit = 5, search } = req.query;

  let filteredBooks = [...books];

  if (author) {
    filteredBooks = filteredBooks.filter(
      (b) => b.author.toLowerCase() === author.toLowerCase(),
    );
  }

  if (year) {
    filteredBooks = filteredBooks.filter((b) => b.year == year);
  }

  if (search) {
    filteredBooks = filteredBooks.filter((b) =>
      b.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  page = parseInt(page);
  limit = parseInt(limit);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

  res.render("books", {
    books: paginatedBooks,
    page,
    limit,
    total: filteredBooks.length,
  });
});

router.post("/", validateYear, (req, res) => {
  const { title, author, year } = req.body;

  const newBook = {
    id: books.length + 1,
    title,
    author,
    year: parseInt(year),
  };

  books.push(newBook);

  res.status(201).json(newBook);
});

module.exports = router;
