import axios from "axios";

// Base URL: use env var if set, else fallback to relative "/api"
const API = import.meta.env.VITE_API_URL || "/api";

export const getTodos = async () => {
  const res = await axios.get(`${API}/api/todos`);
  return res.data;
};

export const addTodo = async (todo) => {
  const res = await axios.post(`${API}/api/todos`, todo);
  return res.data;
};

export const updateTodo = async (id, todo) => {
  const res = await axios.put(`${API}/api/todos/${id}`, todo);
  return res.data;
};

export const deleteTodo = async (id) => {
  const res = await axios.delete(`${API}/api/todos/${id}`);
  return res.data;
};
