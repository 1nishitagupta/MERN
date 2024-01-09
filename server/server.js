const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, text: "Task 1" },
  { id: 2, text: "Task 2" },
  { id: 3, text: "Task 3" },
];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    text: req.body.text,
  };

  tasks.push(newTask);
  res.json(newTask);
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.json({ message: "Task deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
