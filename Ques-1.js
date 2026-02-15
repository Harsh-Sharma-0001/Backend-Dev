const express = require("express");
const app = express();

const users = [
  { id: 1, name: "Harsh Sharma" },
  { id: 2, name: "Prakhar Patel" },
  { id: 3, name: "Kartikey Verma" },
  { id: 4, name: "Kartik Govil" },
  { id: 5, name: "Kush Gupta" },
  { id: 6, name: "Kush Kumar" },
  { id: 7, name: "Harsh Chaudhary" },
  { id: 8, name: "Prakhar Mishra" },
];


app.get("/users", (req, res) => {
  const { name } = req.query;

  if (name) {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );
    return res.json(filteredUsers);
  }

  res.json(users);
});


app.listen(3000, () => console.log("Server running on port 3000"));
