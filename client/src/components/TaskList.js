import React, { useEffect } from "react";
import { fetchTasks, deleteTask } from "../services/taskService";
import TaskForm from "./TaskForm";
import { socket } from "../App";

const TaskList = ({ tasks, setTasks }) => {
  useEffect(() => {
    const getTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };
    getTasks();
    // Listen for real-time events
    socket.on("task_created", (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });

    socket.on("task_updated", (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.off("task_created");
      socket.off("task_updated");
    };
  }, []);

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
