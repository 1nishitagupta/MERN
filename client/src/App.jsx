import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon, Check as CheckIcon } from "@mui/icons-material";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3001/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const todo = { title, description, status: false };
      await fetch("http://localhost:3001/todos/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      setTitle("");
      setDescription("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:3001/todos/${id}`, {
        method: "DELETE",
      });
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todoToToggle = todos.find((todo) => todo._id === id);
      const updatedTodo = { ...todoToToggle, status: !todoToToggle.status };
      await fetch(`http://localhost:3001/todos/update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      fetchTodos();
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        ToDo List
      </Typography>
      <form onSubmit={addTodo} style={{ marginBottom: 20 }}>
        <TextField
          variant="outlined"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          style={{ marginBottom: 10 }}
        />
        <TextField
          variant="outlined"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          style={{ marginBottom: 10 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add ToDo
        </Button>
      </form>
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo._id}
            style={{ textDecoration: todo.status ? "line-through" : "none" }}
          >
            <ListItemText primary={todo.title} secondary={todo.description} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => toggleTodo(todo._id)}>
                <CheckIcon />
              </IconButton>
              <IconButton onClick={() => deleteTodo(todo._id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default App;
