// src/components/TaskList.js
import React from "react";

const TaskList = ({ tasks, updateTask, deleteTask, updateStatus }) => {
  return (
    <ul className="task-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task, index) => (
        <li key={index} className="task-item p-4 border rounded shadow">
          <input
            type="text"
            value={task.name}
            onChange={(e) => updateTask(index, e.target.value)}
            className="task-name w-full mb-2"
          />
          <select
            value={task.status}
            onChange={(e) => updateStatus(index, e.target.value)}
            className="task-status w-full mb-2"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            onClick={() => deleteTask(index)}
            className="delete-btn w-full bg-red-500 text-white py-1 rounded"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
