import React, { useState } from "react";
import { createTask } from "../services/taskService";

const TaskForm = ({ handleTaskCreated }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = await createTask(taskData);
    handleTaskCreated(newTask);
    setTaskData({ title: "", description: "", dueDate: "", status: "Pending" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={taskData.title}
        onChange={handleChange}
        placeholder="Task Title"
      />
      <textarea
        name="description"
        value={taskData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="date"
        name="dueDate"
        value={taskData.dueDate}
        onChange={handleChange}
      />
      <select name="status" value={taskData.status} onChange={handleChange}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
