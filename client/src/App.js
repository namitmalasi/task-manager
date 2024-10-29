// src/App.js
import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import socket from "./socket";
import "./index.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    socket.on("task-update", (updatedTasks) => {
      setTasks(updatedTasks);
    });
  }, []);

  const filteredTasks = tasks.filter((task) =>
    filterStatus === "All" ? true : task.status === filterStatus
  );

  const addTask = (taskName) => {
    const newTasks = [...tasks, { name: taskName, status: "Pending" }];
    setTasks(newTasks);
    socket.emit("add-task", newTasks);
  };

  const updateTask = (index, newName) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, name: newName } : task
    );
    setTasks(updatedTasks);
    socket.emit("update-task", updatedTasks);
  };

  const updateStatus = (index, newStatus) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    socket.emit("update-task", updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    socket.emit("delete-task", updatedTasks);
  };

  return (
    <div className="App p-4">
      <TaskForm addTask={addTask} />
      <TaskFilter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
      <TaskList
        tasks={filteredTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        updateStatus={updateStatus}
      />
    </div>
  );
};

export default App;
