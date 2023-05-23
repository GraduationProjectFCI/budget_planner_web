import axios from "axios";

const http = axios.create({
  baseURL: "https://relieved-frog-gloves.cyclic.app/api/v1",
});

export default http;
