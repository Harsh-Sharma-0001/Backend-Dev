const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));


app.get("/gallery", (req, res) => {
  const imagesPath = path.join(__dirname, "public/images");
  const images = fs.readdirSync(imagesPath);
  res.render("gallery", { images });
});


app.listen(3000, () => console.log("Server running on port 3000"));
