import axios from "axios";

//http://localhost:4000
const http = axios.create({
  baseURL: "https://relieved-frog-gloves.cyclic.app/api/v1",
});

export default http;
