import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:7001/api",
});

export default instance;
