// src/components/TaskFilter.js
import React from "react";

const TaskFilter = ({ filterStatus, setFilterStatus }) => {
  return (
    <div className="filter-container">
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="filter-select w-full mb-2"
      >
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default TaskFilter;
