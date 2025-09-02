import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333", // troque se sua API estiver em outra porta
});

export default api;