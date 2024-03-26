const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3001;

// app.use(cors({ origin: "http://localhost:5173" })); // Adjust the port based on your Vite setup
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/todoDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// let tasks = [
//   { id: 1, text: "Task 1" },
//   { id: 2, text: "Task 2" },
//   { id: 3, text: "Task 3" },
// ];

// app.get("/tasks", (req, res) => {
//   res.json(tasks);
// });

// app.post("/tasks", (req, res) => {
//   const newTask = {
//     id: tasks.length + 1,
//     text: req.body.text,
//   };

//   tasks.push(newTask);
//   res.json(newTask);
// });

// app.delete("/tasks/:id", (req, res) => {
//   const taskId = parseInt(req.params.id);
//   tasks = tasks.filter((task) => task.id !== taskId);
//   res.json({ message: "Task deleted successfully" });
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const todosRouter = require("./router/todos");
app.use("/todos", todosRouter);
