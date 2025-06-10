import axios from "axios";

//http://localhost:4000
const http = axios.create({
  baseURL: "https://budget-planner-api-fv87.onrender.com/api/v1",
});

export default http;
