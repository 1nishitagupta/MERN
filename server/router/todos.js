const router = require("express").Router();
const Todo = require("../models/todo.model");

// Get all Todos
router.route("/").get(async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Error fetching todos" });
  }
});

// Add a new Todo
router.route("/add").post(async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const newTodo = new Todo({ title, description, status });
    await newTodo.save();
    res.json({ message: "Todo added successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error adding todo" });
  }
});

// Delete a Todo
router.route("/:id").delete(async (req, res) => {
  const id = req.params.id;
  try {
    await Todo.findByIdAndDelete(id);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting todo" });
  }
});

// Update a Todo (Toggle status)
router.route("/update/:id").post(async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findById(id);
    todo.status = !todo.status;
    await todo.save();
    res.json({ message: "Todo updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error updating todo" });
  }
});

module.exports = router;
