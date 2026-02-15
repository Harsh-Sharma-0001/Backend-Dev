const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


app.get("/contact", (req, res) => {
  res.render("contact");
});


app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Form Data:", name, email, message);
  res.send("Form submitted successfully!");
});


app.listen(3000, () => console.log("Server running on port 3000"));
