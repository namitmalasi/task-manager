// src/App.js
import React, { useState } from "react";
import "./index.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import io from "socket.io-client";

export const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
  forceNew: true,
});

const App = () => {
  const [tasks, setTasks] = useState([]); // For managing the task list in state

  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };
  return (
    <div>
      <h1>Real-Time Task Manager</h1>
      <TaskForm handleTaskCreated={handleTaskCreated} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default App;
