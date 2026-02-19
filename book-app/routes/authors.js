const express = require("express");
const router = express.Router();

let authors = [
  { id: 1, name: "Harsh Sharma", country: "USA" },
  { id: 2, name: "Prakhar Patel", country: "UK" },
  { id: 3, name: "Kush Gupta", country: "India" },
];

router.get("/", (req, res) => {
  res.render("authors", { authors });
});

router.get("/:id", (req, res) => {
  const author = authors.find((a) => a.id == req.params.id);

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  res.json(author);
});

router.post("/", (req, res) => {
  const { name, country } = req.body;

  const newAuthor = {
    id: authors.length + 1,
    name,
    country,
  };

  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});

router.put("/:id", (req, res) => {
  const author = authors.find((a) => a.id == req.params.id);

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  author.name = req.body.name || author.name;
  author.country = req.body.country || author.country;

  res.json(author);
});

router.delete("/:id", (req, res) => {
  const index = authors.findIndex((a) => a.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Author not found" });
  }

  authors.splice(index, 1);

  res.json({ message: "Author deleted successfully" });
});

module.exports = router;
