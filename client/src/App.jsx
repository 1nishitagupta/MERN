/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    // Fetch tasks from the server when the component mounts
    fetch("http://localhost:3001/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = () => {
    // Send a POST request to the server to add a new task
    fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newTask }),
    })
      .then((response) => response.json())
      .then((data) => setTasks([...tasks, data]));

    setNewTask("");
  };

  const deleteTask = (taskId) => {
    // Send a DELETE request to the server to delete a task
    fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: "DELETE",
    }).then(() => setTasks(tasks.filter((task) => task.id !== taskId)));
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
