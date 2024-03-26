import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("/todos");
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
      await fetch("/todos/add", {
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
      await fetch(`/todos/${id}`, {
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
      await fetch(`/todos/update/${id}`, {
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
    <div>
      <h1>ToDo List</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add ToDo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo._id}
            style={{ textDecoration: todo.status ? "line-through" : "none" }}
          >
            {todo.title}: {todo.description}
            <button onClick={() => toggleTodo(todo._id)}>Toggle</button>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
