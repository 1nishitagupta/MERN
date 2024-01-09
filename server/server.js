const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/register", (req, res) => {
  res.status(200).send("Hello World register");
});

let books = [
  { id: 1, title: "Node.js Basics", author: "John Doe" },
  { id: 2, title: "Express.js Guide", author: "Jane Smith" },
];

app.listen(PORT, () => {
  console.log(`WELCOME TO SERVER PORT ${PORT}`);
});
