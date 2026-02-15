const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});


app.use((req, res) => {
  res.status(404).render("404");
});


app.listen(3000, () => console.log("Server running on port 3000"));
