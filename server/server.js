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
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const todosRouter = require("./router/todos");
app.use("/todos", todosRouter);
