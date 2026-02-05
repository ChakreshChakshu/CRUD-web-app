import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "api/users"
});
console.log("API Base URL:", API.defaults.baseURL); // 🔥 DEBUGGING
export const getUsers = (page = 1, limit = 10) =>
  API.get(`/?page=${page}&limit=${limit}`);

export const getUserById = (id) =>
  API.get(`/${id}`); // 🔥 NOW WORKS (route exists)

export const createUser = (data) =>
  API.post("/", data);

export const updateUser = (id, data) =>
  API.put(`/${id}`, data);

export const deleteUser = (id) =>
  API.delete(`/${id}`);

export const searchUsers = (q) =>
  API.get(`/search?q=${q}`);

export const exportCSV = () =>
  API.get("/export/csv", { responseType: "blob" }); // 🔥 FIX
