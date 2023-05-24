import axios from "axios";

//http://localhost:4000
const http = axios.create({
  baseURL: "http://localhost:4000/api/v1",
});

export default http;
