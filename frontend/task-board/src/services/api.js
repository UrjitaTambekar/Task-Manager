import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // change if your backend runs elsewhere
  withCredentials: true,
});

// Optional: add token automatically (if you use auth)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;