import axios from "axios";

const api = axios.create({
  baseURL: "http://10.10.28.146:5000",
});

export default api;
