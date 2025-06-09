import axios from "axios";

//define a URL base para as requisições
const api = axios.create({
  baseURL: "http://localhost:3000/api", 
});

export default api;
