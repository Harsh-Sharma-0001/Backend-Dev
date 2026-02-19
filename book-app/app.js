const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const bookRoutes = require("./routes/books");
const authorRoutes = require("./routes/authors");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
