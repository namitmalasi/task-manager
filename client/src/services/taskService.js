import axios from "axios";

export const fetchTasks = async () => {
  const response = await axios.get(process.env.REACT_APP_API_URL);
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await axios.post(process.env.REACT_APP_API_URL, taskData);
  return response.data;
};

export const updateTask = async (taskId, taskData) => {
  const response = await axios.put(
    `${process.env.REACT_APP_API_URL}/${taskId}`,
    taskData
  );
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_API_URL}/${taskId}`
  );
  return response.data;
};
